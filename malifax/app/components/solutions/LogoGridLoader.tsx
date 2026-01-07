'use client';
import { useEffect, useState } from 'react';
import LogoGrid from './LogoGrid';
import { API_URLS } from '@/lib/api-config';

interface LogoGridLoaderProps {
  pageKey: string;
  containerClassName?: string;
}

export default function LogoGridLoader({ pageKey, containerClassName = '' }: LogoGridLoaderProps) {
  const [data, setData] = useState<{ icons: any[]; totalSlots: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_URLS.LOGO_GRIDS}?pageKey=${pageKey}`);
        const result = await response.json();
        
        if (result && result.pageKey) {
          // Transform API data to LogoGrid format
          const icons = result.desktopLayout.map((icon: any) => ({
            position: icon.position,
            src: icon.src,
            alt: icon.alt || '',
            size: icon.size || 1,
            imgWidth: icon.imgWidth,
            imgHeight: icon.imgHeight,
            bgClassName: icon.bgClassName
          }));
          
          setData({
            icons,
            totalSlots: result.totalSlots || 36
          });
        } else {
          // No data, use empty grid
          setData({
            icons: [],
            totalSlots: 36
          });
        }
      } catch (error) {
        console.error('Error loading logo grid:', error);
        // Use empty grid on error
        setData({
          icons: [],
          totalSlots: 36
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [pageKey]);

  if (loading) {
    return (
      <div className={`flex justify-center items-center ${containerClassName}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <LogoGrid
      icons={data.icons}
      totalSlots={data.totalSlots}
      containerClassName={containerClassName}
    />
  );
}

