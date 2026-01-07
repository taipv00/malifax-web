'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LogoGrid from '@/app/components/solutions/LogoGrid';
import { API_URLS } from '@/lib/api-config';
import { authFetch, getAuthHeaders } from '@/lib/auth-fetch';

// Types
interface LogoIcon {
  position: number;
  src: string;
  alt: string;
  size: number;
  imgWidth?: number;
  imgHeight?: number;
  bgClassName?: string;
  website_url?: string;
}

interface LogoGridConfig {
  pageKey: string;
  pageName: string;
  desktopLayout: LogoIcon[];
  totalSlots: number;
}

// Define available pages
const availablePages: { pageKey: string; pageName: string }[] = [
  { pageKey: 'business-continuity', pageName: 'Business Continuity' },
  { pageKey: 'cctv-door-access', pageName: 'CCTV Door Access' },
  { pageKey: 'equipment-rental', pageName: 'Equipment Rental' },
  { pageKey: 'enterprise-cloud', pageName: 'Enterprise Cloud' },
  { pageKey: 'networking-wifi', pageName: 'Networking WiFi' }
];

export default function LogoGridsAdmin() {
  const [logoGrids, setLogoGrids] = useState<LogoGridConfig[]>([]);
  const [selectedGrid, setSelectedGrid] = useState<LogoGridConfig | null>(null);
  const [draggedIcon, setDraggedIcon] = useState<LogoIcon | null>(null);
  const [draggedFromPosition, setDraggedFromPosition] = useState<number | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<number | null>(null);
  const [editIconModal, setEditIconModal] = useState<{ icon: LogoIcon; position: number } | null>(null);
  const [addIconModal, setAddIconModal] = useState<{ position: number } | null>(null);
  const [editFormData, setEditFormData] = useState({
    src: '',
    alt: '',
    size: 1,
    website_url: ''
  });
  const [logoInputType, setLogoInputType] = useState<'upload' | 'url'>('upload');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add modal states
  const [addFormData, setAddFormData] = useState({
    src: '',
    alt: '',
    size: 1,
    website_url: ''
  });
  const [addLogoInputType, setAddLogoInputType] = useState<'upload' | 'url'>('upload');
  const [addSelectedFile, setAddSelectedFile] = useState<string | null>(null);
  const [addIsDragOver, setAddIsDragOver] = useState(false);
  const addFileInputRef = useRef<HTMLInputElement>(null);
  
  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [manualRows, setManualRows] = useState<number | null>(null);

  // Load data for a specific pageKey
  const loadGridData = async (pageKey: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URLS.LOGO_GRIDS}?pageKey=${pageKey}`);
      const result = await response.json();
      console.log('API response:', result);
      console.log('Response type:', typeof result);
      console.log('Has pageKey:', result?.pageKey);
      
      if (result && result.pageKey) {
        // Set manual rows based on totalSlots from API
        if (result.totalSlots) {
          const rows = Math.floor(result.totalSlots / 12);
          setManualRows(rows);
        } else {
          setManualRows(null);
        }
        
        // Update the specific grid in the list with data from API
        const updatedGrid = result;
        
        // Update in the list
        setLogoGrids(prev => {
          const exists = prev.find(g => g.pageKey === pageKey);
          if (exists) {
            return prev.map(grid => 
              grid.pageKey === pageKey ? updatedGrid : grid
            );
          } else {
            return [...prev, updatedGrid];
          }
        });
        
        // Update selected grid
        setSelectedGrid(updatedGrid);
      } else {
        // Create empty grid structure if no data exists
        const emptyGrid: LogoGridConfig = {
          pageKey,
          pageName: availablePages.find(p => p.pageKey === pageKey)?.pageName || pageKey,
          desktopLayout: [],
          totalSlots: 36
        };
        
        setLogoGrids(prev => {
          const exists = prev.find(g => g.pageKey === pageKey);
          if (!exists) {
            return [...prev, emptyGrid];
          }
          return prev;
        });
        
        // Set empty grid as selected
        setSelectedGrid(emptyGrid);
      }
    } catch (error) {
      console.error('Error loading grid data:', error);
      // Keep using existing data on error
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-select first page on mount
  useEffect(() => {
    if (availablePages.length > 0 && !selectedGrid) {
      const firstPage = availablePages[0];
      loadGridData(firstPage.pageKey);
    }
  }, []); // Only run once on mount

  // File upload functions
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const base64 = await fileToBase64(file);
      setSelectedFile(base64);
      setEditFormData({ ...editFormData, src: base64 });
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const base64 = await fileToBase64(file);
      setSelectedFile(base64);
      setEditFormData({ ...editFormData, src: base64 });
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setEditFormData({ ...editFormData, src: '' });
  };

  // Update form data when modal opens
  useEffect(() => {
    if (editIconModal) {
      const { icon } = editIconModal;
      setEditFormData({
        src: icon.src || '',
        alt: icon.alt || '',
        size: icon.size || 1,
        website_url: icon.website_url || ''
      });
      setSelectedFile(null);
    }
  }, [editIconModal]);

  // Update add form data when modal opens
  useEffect(() => {
    if (addIconModal) {
      setAddFormData({
        src: '',
        alt: '',
        size: 1,
        website_url: ''
      });
      setAddSelectedFile(null);
    }
  }, [addIconModal]);

  // Save function
  const handleSave = async () => {
    if (!selectedGrid) return;
    
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      // Calculate current total slots based on manual rows or auto-calculated
      const currentLayout = selectedGrid.desktopLayout;
      const maxPosition = Math.max(...currentLayout.map(icon => icon.position), 0);
      const wideIcons = currentLayout.filter(icon => icon.size === 2);
      const adjustedMaxPosition = Math.max(maxPosition, ...wideIcons.map(icon => icon.position + 1));
      const autoRequiredRows = Math.max(1, Math.min(8, Math.ceil((adjustedMaxPosition + 1) / 12)));
      const requiredRows = manualRows !== null ? manualRows : autoRequiredRows;
      const currentTotalSlots = requiredRows * 12;
      
      const response = await authFetch(API_URLS.LOGO_GRIDS, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageKey: selectedGrid.pageKey,
          desktopLayout: selectedGrid.desktopLayout,
          totalSlots: currentTotalSlots
        }),
      });
      
      if (response.ok) {
        setSaveMessage({ type: 'success', text: 'Logo grid saved successfully!' });
        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        throw new Error('Failed to save logo grid');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage({ type: 'error', text: 'Failed to save logo grid. Please try again.' });
      // Clear message after 5 seconds
      setTimeout(() => setSaveMessage(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, icon: LogoIcon, fromPosition: number) => {
    setDraggedIcon(icon);
    setDraggedFromPosition(fromPosition);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverPosition(position);
  };

  const handleDrop = (e: React.DragEvent, targetPosition: number) => {
    e.preventDefault();
    if (!draggedIcon || !selectedGrid) return;

    // Check if target position is blocked by a wide icon
    const isBlocked = selectedGrid.desktopLayout.some(icon => 
      icon.size === 2 && icon.position === targetPosition - 1
    );
    
    if (isBlocked) return; // Don't allow drop on blocked position

    const updatedLayout = [...selectedGrid.desktopLayout];

    // Remove icon from old position
    const oldIndex = updatedLayout.findIndex(icon => icon.position === draggedFromPosition);
    if (oldIndex !== -1) {
      updatedLayout.splice(oldIndex, 1);
    }

    // Add icon to new position
    const newIcon = { ...draggedIcon, position: targetPosition };
    updatedLayout.push(newIcon);

    // Update selected grid
    const updatedGrid = {
      ...selectedGrid,
      desktopLayout: updatedLayout
    };

    // Update in the main array
    setLogoGrids(prev => prev.map(grid => 
      grid.pageKey === selectedGrid.pageKey ? updatedGrid : grid
    ));
    setSelectedGrid(updatedGrid);

    setDraggedIcon(null);
    setDraggedFromPosition(null);
    setDragOverPosition(null);
  };


  const removeIcon = (position: number) => {
    if (!selectedGrid) return;

    const updatedLayout = selectedGrid.desktopLayout.filter(icon => icon.position !== position);
    
    const updatedGrid = {
      ...selectedGrid,
      desktopLayout: updatedLayout
    };

    setLogoGrids(prev => prev.map(grid => 
      grid.pageKey === selectedGrid.pageKey ? updatedGrid : grid
    ));
    setSelectedGrid(updatedGrid);
  };

  const updateIconSize = (position: number, newSize: number) => {
    if (!selectedGrid) return;

    const updatedLayout = selectedGrid.desktopLayout.map(icon => 
      icon.position === position ? { ...icon, size: newSize } : icon
    );

    const updatedGrid = {
      ...selectedGrid,
      desktopLayout: updatedLayout
    };

    setLogoGrids(prev => prev.map(grid => 
      grid.pageKey === selectedGrid.pageKey ? updatedGrid : grid
    ));
    setSelectedGrid(updatedGrid);
  };

  const updateIconProperties = (position: number, updates: Partial<LogoIcon>) => {
    if (!selectedGrid) return;

    const updatedLayout = selectedGrid.desktopLayout.map(icon => 
      icon.position === position ? { ...icon, ...updates } : icon
    );

    const updatedGrid = {
      ...selectedGrid,
      desktopLayout: updatedLayout
    };

    setLogoGrids(prev => prev.map(grid => 
      grid.pageKey === selectedGrid.pageKey ? updatedGrid : grid
    ));
    setSelectedGrid(updatedGrid);
    setEditIconModal(null);
  };


  const clearLayout = () => {
    if (!selectedGrid) return;

    const updatedGrid = {
      ...selectedGrid,
      desktopLayout: []
    };

    setLogoGrids(prev => prev.map(grid => 
      grid.pageKey === selectedGrid.pageKey ? updatedGrid : grid
    ));
    setSelectedGrid(updatedGrid);
  };


  const renderGridEditor = () => {
    if (!selectedGrid) return null;

    const currentLayout = selectedGrid.desktopLayout;
    
    // Calculate required rows based on max position, accounting for wide icons
    const maxPosition = Math.max(...currentLayout.map(icon => icon.position), 0);
    const wideIcons = currentLayout.filter(icon => icon.size === 2);
    const adjustedMaxPosition = Math.max(maxPosition, ...wideIcons.map(icon => icon.position + 1));
    const autoRequiredRows = Math.max(1, Math.min(8, Math.ceil((adjustedMaxPosition + 1) / 12)));
    
    // Use manual rows if set, otherwise use auto-calculated
    const requiredRows = manualRows !== null ? manualRows : autoRequiredRows;
    const totalSlots = requiredRows * 12;

    return (
      <div className="space-y-6">
        {/* Controls */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold">Edit {selectedGrid.pageName} - Desktop Layout</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              {saveMessage && (
                <div className={`px-3 py-1 rounded text-sm ${
                  saveMessage.type === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {saveMessage.text}
                </div>
              )}
            </div>
          </div>
          
          {/* Layout Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={clearLayout}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Clear All Icons
              </button>
              <div className="text-sm text-gray-600">
                Icons: {currentLayout.length} • Rows: {requiredRows}/8 • Total slots: {totalSlots}
              </div>
            </div>
            
            {/* Row controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Rows:</span>
              <button
                onClick={() => {
                  if (manualRows === null) {
                    setManualRows(autoRequiredRows > 1 ? autoRequiredRows - 1 : 1);
                  } else {
                    setManualRows(Math.max(1, manualRows - 1));
                  }
                }}
                className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                disabled={requiredRows <= 1}
              >
                −
              </button>
              <span className="text-sm font-medium w-8 text-center">{requiredRows}</span>
              <button
                onClick={() => {
                  if (manualRows === null) {
                    setManualRows(autoRequiredRows < 8 ? autoRequiredRows + 1 : 8);
                  } else {
                    setManualRows(Math.min(8, manualRows + 1));
                  }
                }}
                className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                disabled={requiredRows >= 8}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Grid Editor */}
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-md font-semibold">Grid Editor - Drag & Drop to Reorder</h4>
            <div className="text-xs text-gray-500">
              Drag icons to move • Click icon to edit
            </div>
          </div>
          
          {/* 12 columns grid */}
          <div className="grid grid-cols-12 gap-2 max-w-4xl">
            {Array.from({ length: totalSlots }, (_, index) => {
              const icon = currentLayout.find(icon => icon.position === index);
              const isOccupied = Boolean(icon);
              const isWide = icon?.size === 2;
              
              // Check if this position is blocked by a wide icon
              const isBlocked = currentLayout.some(icon => 
                icon.size === 2 && icon.position === index - 1
              );

              // Skip rendering if blocked by wide icon
              if (isBlocked) return null;

              return (
                <div
                  key={index}
                  className={`relative border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                    isOccupied 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  } ${
                    isWide ? 'col-span-2' : ''
                  } ${
                    draggedFromPosition === index ? 'opacity-30 scale-95' : ''
                  } ${
                    dragOverPosition === index ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  } h-12`}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragLeave={() => setDragOverPosition(null)}
                  onClick={() => {
                    if (isOccupied) {
                      const icon = currentLayout.find(icon => icon.position === index);
                      if (icon) {
                        setEditIconModal({ icon, position: index });
                      }
                    } else {
                      setAddIconModal({ position: index });
                    }
                  }}
                >
                  {isOccupied && (
                    <>
                      <img 
                        src={icon!.src} 
                        alt={icon!.alt} 
                        className={`object-contain ${
                          isWide ? 'w-24 h-8' : 'w-8 h-8'
                        }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, icon!, index)}
                      />
                      <div className="absolute -top-1 -right-1">
                        <div className="w-3 h-3 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center text-[8px] font-bold">
                          {icon!.size}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold mb-3">Preview - Desktop Layout</h4>
          <div className="bg-white p-4 rounded border">
            {/* Custom preview with 12-column grid like editor */}
            <div className="grid grid-cols-12 gap-2 max-w-4xl mx-auto">
              {Array.from({ length: totalSlots }, (_, index) => {
                const icon = currentLayout.find(icon => icon.position === index);
                const isOccupied = Boolean(icon);
                const isWide = icon?.size === 2;
                
                // Check if this position is blocked by a wide icon
                const isBlocked = currentLayout.some(icon => 
                  icon.size === 2 && icon.position === index - 1
                );

                // Skip rendering if blocked by wide icon
                if (isBlocked) return null;

                return (
                  <div
                    key={index}
                    className={`relative rounded-lg flex items-center justify-center ${
                      isOccupied 
                        ? 'bg-[rgb(4,82,216)]' 
                        : 'bg-[#F5F5F5]'
                    } ${
                      isWide ? 'col-span-2' : ''
                    } h-12`}
                    onClick={() => {
                      if (isOccupied) {
                        const icon = currentLayout.find(icon => icon.position === index);
                        if (icon) {
                          setEditIconModal({ icon, position: index });
                        }
                      }
                    }}
                  >
                    {isOccupied && (
                      <img 
                        src={icon!.src} 
                        alt={icon!.alt} 
                        className={`object-contain ${
                          isWide ? 'w-24 h-8' : 'w-8 h-8'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEditIconModal = () => {
    if (!editIconModal) return null;

    const { icon, position } = editIconModal;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <h3 className="text-xl font-semibold mb-4">Edit Icon Properties</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon Source</label>
              
              {/* Input Type Toggle */}
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => {
                    setLogoInputType('upload');
                    setEditFormData(prev => ({ ...prev, src: '' }));
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    logoInputType === 'upload'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Upload Image
                </button>
                <button
                  onClick={() => {
                    setLogoInputType('url');
                    setEditFormData(prev => ({ ...prev, src: '' }));
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    logoInputType === 'url'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Paste URL
                </button>
              </div>
              
              {logoInputType === 'upload' ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragOver={handleFileDragOver}
                  onDragLeave={handleFileDragLeave}
                  onDrop={handleFileDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  {editFormData.src && editFormData.src.startsWith('data:') ? (
                    <div className="space-y-2">
                      <img 
                        src={editFormData.src} 
                        alt="Preview" 
                        className="max-w-20 max-h-20 mx-auto object-contain"
                      />
                      <button
                        onClick={clearSelectedFile}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-2">Drag & drop an image here or</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    key={`edit-url-${logoInputType}`}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={editFormData.src || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, src: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                  {editFormData.src && !editFormData.src.startsWith('data:') && (
                    <div className="text-center">
                      <img 
                        src={editFormData.src} 
                        alt="Preview" 
                        className="max-w-20 max-h-20 mx-auto object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditFormData({ ...editFormData, size: 1 })}
                  className={`px-3 py-1 rounded text-sm ${
                    editFormData.size === 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  1x1
                </button>
                <button
                  onClick={() => setEditFormData({ ...editFormData, size: 2 })}
                  className={`px-3 py-1 rounded text-sm ${
                    editFormData.size === 2 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  2x1
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (Optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={editFormData.alt || ''}
                onChange={(e) => setEditFormData({ ...editFormData, alt: e.target.value })}
                placeholder="Logo description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL (Optional)</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={editFormData.website_url || ''}
                onChange={(e) => setEditFormData({ ...editFormData, website_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              onClick={() => {
                if (selectedGrid) {
                  removeIcon(position);
                  setEditIconModal(null);
                }
              }}
            >
              Remove Logo
            </button>
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => setEditIconModal(null)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => updateIconProperties(position, editFormData)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAddIconModal = () => {
    if (!addIconModal) return null;

    const { position } = addIconModal;

    const handleAddFileDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setAddIsDragOver(true);
    };

    const handleAddFileDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setAddIsDragOver(false);
    };

    const handleAddFileDrop = async (e: React.DragEvent) => {
      e.preventDefault();
      setAddIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const base64 = await fileToBase64(file);
        setAddSelectedFile(base64);
        setAddFormData({ ...addFormData, src: base64 });
      }
    };

    const handleAddFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const base64 = await fileToBase64(file);
        setAddSelectedFile(base64);
        setAddFormData({ ...addFormData, src: base64 });
      }
    };

    const clearAddSelectedFile = () => {
      setAddSelectedFile(null);
      setAddFormData({ ...addFormData, src: '' });
    };

    const handleAddIcon = () => {
      if (!selectedGrid || !addFormData.src) return;

      const newIcon: LogoIcon = {
        position,
        src: addFormData.src,
        alt: addFormData.alt,
        size: addFormData.size,
        website_url: addFormData.website_url
      };

      const updatedLayout = [...selectedGrid.desktopLayout, newIcon];
      
      setLogoGrids(prev => prev.map(grid => 
        grid.pageKey === selectedGrid.pageKey 
          ? { ...grid, desktopLayout: updatedLayout }
          : grid
      ));
      
      setSelectedGrid(prev => prev ? { ...prev, desktopLayout: updatedLayout } : null);
      setAddIconModal(null);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <h3 className="text-xl font-semibold mb-4">Add New Icon</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon Source</label>
              
              {/* Input Type Toggle */}
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => {
                    setAddLogoInputType('upload');
                    setAddFormData(prev => ({ ...prev, src: '' }));
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    addLogoInputType === 'upload'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Upload Image
                </button>
                <button
                  onClick={() => {
                    setAddLogoInputType('url');
                    setAddFormData(prev => ({ ...prev, src: '' }));
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    addLogoInputType === 'url'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Paste URL
                </button>
              </div>
              
              {addLogoInputType === 'upload' ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    addIsDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragOver={handleAddFileDragOver}
                  onDragLeave={handleAddFileDragLeave}
                  onDrop={handleAddFileDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddFileSelect}
                    ref={addFileInputRef}
                    className="hidden"
                  />
                  {addFormData.src && addFormData.src.startsWith('data:') ? (
                    <div className="space-y-2">
                      <img 
                        src={addFormData.src} 
                        alt="Preview" 
                        className="max-w-20 max-h-20 mx-auto object-contain"
                      />
                      <button
                        onClick={clearAddSelectedFile}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-2">Drag & drop an image here or</p>
                      <button
                        onClick={() => addFileInputRef.current?.click()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    key={`add-url-${addLogoInputType}`}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={addFormData.src || ''}
                    onChange={(e) => setAddFormData({ ...addFormData, src: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                  {addFormData.src && !addFormData.src.startsWith('data:') && (
                    <div className="text-center">
                      <img 
                        src={addFormData.src} 
                        alt="Preview" 
                        className="max-w-20 max-h-20 mx-auto object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setAddFormData({ ...addFormData, size: 1 })}
                  className={`px-3 py-1 rounded text-sm ${
                    addFormData.size === 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  1x1
                </button>
                <button
                  onClick={() => setAddFormData({ ...addFormData, size: 2 })}
                  className={`px-3 py-1 rounded text-sm ${
                    addFormData.size === 2 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  2x1
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (Optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={addFormData.alt || ''}
                onChange={(e) => setAddFormData({ ...addFormData, alt: e.target.value })}
                placeholder="Logo description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL (Optional)</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={addFormData.website_url || ''}
                onChange={(e) => setAddFormData({ ...addFormData, website_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => setAddIconModal(null)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              onClick={handleAddIcon}
              disabled={!addFormData.src}
            >
              Add Icon
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="text-purple-500 hover:text-purple-600 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Logo Grids Management</h1>
              <p className="text-gray-600 mt-2">Manage logo grids for all solution and service pages</p>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="text-gray-600 mt-4">Loading logo grids...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Pages List */}
              <div className="lg:col-span-1">
                <h2 className="text-xl font-semibold mb-4">Pages</h2>
                <div className="space-y-2">
                  {availablePages.map((page) => {
                    const grid = logoGrids.find(g => g.pageKey === page.pageKey);
                    return (
                      <div
                        key={page.pageKey}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedGrid?.pageKey === page.pageKey
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={async () => {
                          console.log('Clicked page:', page.pageKey);
                          console.log('Existing grid:', grid);
                          
                          // If grid data exists, select it
                          if (grid) {
                            setSelectedGrid(grid);
                          } else {
                            // Otherwise, load data from API
                            await loadGridData(page.pageKey);
                          }
                        }}
                      >
                        <h3 className="font-semibold text-gray-900">{page.pageName}</h3>
                        <p className="text-sm text-gray-600">
                          Desktop: {grid?.desktopLayout.length || 0} icons
                        </p>
                        <p className="text-xs text-gray-500">
                          Total slots: {grid?.totalSlots || 36}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Editor */}
            <div className="lg:col-span-2">
              {selectedGrid ? (
                renderGridEditor()
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Select a page to start editing its logo grid</p>
                </div>
              )}
            </div>
          </div>
          )}
        </motion.div>
      </div>
      
      {/* Modals */}
      {renderEditIconModal()}
      {renderAddIconModal()}
    </div>
  );
}
