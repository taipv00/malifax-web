'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const DROPDOWN_ITEMS = [
  {
    label: 'Solution',
    items: [
      { icon: <Image src="/svgs/solution-business-continuity.svg" alt="Business Continuity" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Business Continuity', href: '/solutions/business-continuity' },
      { icon: <Image src="/svgs/solution-cctv-door-access.svg" alt="CCTV & Door Access" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'CCTV & Door Access', href: '/solutions/cctv-door-access' },
      { icon: <Image src="/svgs/solution-cyber-security.svg" alt="Cyber Security" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Cyber Security', href: '/solutions/cyber-security' },
      { icon: <Image src="/svgs/solution-enterprise-cloud.svg" alt="Enterprise Cloud" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Enterprise Cloud', href: '/solutions/enterprise-cloud' },
      { icon: <Image src="/svgs/solution-it-infrastructure.svg" alt="IT Infrastructure Services" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'IT Infrastructure Services', href: '/solutions/it-infrastructure' },
      { icon: <Image src="/svgs/solution-managed-services.svg" alt="Managed Services" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Managed Services', href: '/solutions/managed-services' },
      { icon: <Image src="/svgs/solution-networking-wifi.svg" alt="Networking & Enterprise Wi-Fi" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Networking & Enterprise Wi-Fi', href: '/solutions/networking-wifi' },
      { icon: <Image src="/svgs/solution-voice-solutions.svg" alt="Voice Solutions" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Voice Solutions', href: '/solutions/voice-solutions' },
    ],
  },
  {
    label: 'Services',
    items: [
      { icon: <Image src="/svgs/service-datacentre-setup.svg" alt="Datacentre Setup" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Datacentre Setup / Relocation', href: '/services/datacentre-setup' },
      { icon: <Image src="/svgs/service-hardware-maintenance.svg" alt="Hardware Maintenance" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Hardware Maintenance', href: '/services/hardware-maintenance' },
      { icon: <Image src="/svgs/service-laptop-repairs.svg" alt="Laptop Repairs" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Laptop Repairs', href: '/services/laptop-repairs' },
      { icon: <Image src="/svgs/service-equipment-rental.svg" alt="Equipment Rental" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Equipment Rental', href: '/services/equipment-rental' },
      { icon: <Image src="/svgs/service-structured-cabling.svg" alt="Structured Cabling" width={34} height={24} className="w-5 h-5 lg:w-[34px] lg:h-6" />, text: 'Structured Cablings', href: '/services/structured-cabling' },
    ],
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = currentScrollY + windowHeight >= documentHeight - 10;
      
      
      if (currentScrollY < lastScrollY || isAtBottom) {
        setIsVisible(true);
      } 
      
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  // Hide navigation for admin section - placed AFTER all hooks
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About us' },
    ...DROPDOWN_ITEMS.map(d => ({ href: '#', label: d.label, dropdown: true })),
    { href: pathname === '/' ? '#shop' : '/#shop', label: 'Shop' },
    { href: '/contact', label: 'Contact us' },
  ];

  return (
    <>
      <nav 
        className={`fixed inset-x-0 top-0 px-2 lg:px-[24px] lg:pr-[24px] mt-2 lg:mt-6 w-screen max-w-none z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className={`flex px-4 lg:px-6 py-4 justify-between items-center self-stretch rounded-2xl transition-all duration-300 outline outline-1 outline-white ${
            isVisible ? 'bg-white/40 backdrop-blur-[20px] border-white' : 'bg-white/0 backdrop-blur-0 border-white/0'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* Desktop Logo */}
            <Image
              src="/imgs/logo.png"
              alt="Malifax Logo"
              width={137}
              height={60}
              className="hidden lg:block"
            />
            {/* Mobile Logo */}
            <Image
              src="/svgs/mobile-logo.svg"
              alt="Malifax Mini Logo"
              width={30}
              height={30}
              className="lg:hidden"
            />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-9">
            {navItems.map((item, idx) => {
              const dropdown = DROPDOWN_ITEMS.find(d => d.label === item.label);
              return (
                <div key={item.label} className="relative group">
                  {dropdown ? (
                    <>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-[#181D27] font-semibold text-sm leading-5 transition-all duration-150 px-2 py-1 hover:text-blue-500 group-hover:text-blue-600 relative"
                        style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '20px',
                          background: 'none',
                          border: 'none',
                          outline: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {item.label}
                        <svg className="transition-transform duration-200 group-hover:rotate-180" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {/* Underline effect */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-blue-500 group-hover:w-[72px] transition-all duration-200"></div>
                      </button>
                      {/* Dropdown menu */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="bg-white shadow-xl rounded-xl flex flex-col w-[336px] p-5 gap-2 border border-gray-100">
                          {dropdown.items.map((sub, subIdx) => (
                            <Link
                              key={sub.text}
                              href={sub.href}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 w-full"
                              style={{ alignSelf: 'stretch' }}
                            >
                              {sub.icon}
                              <span className="text-[#181D27] text-sm font-semibold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '14px', lineHeight: '20px' }}>{sub.text}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-[#181D27] font-semibold text-sm leading-5 transition-all duration-150
                        ${pathname === item.href ? 'text-blue-600' : 'hover:text-blue-500'}
                      `}
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: '20px',
                      }}
                      onClick={(e) => {
                        if (item.label === 'Shop' && pathname === '/') {
                          e.preventDefault();
                          const el = document.getElementById('shop');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          {/* Hamburger for mobile */}
          <button
            className="lg:hidden flex items-center justify-center  rounded-lg hover:bg-white/60 transition z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            <Image
              src="/svgs/mobile-menu.svg"
              alt="Mobile Menu"
              width={24}
              height={24}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay - only visible on small screens */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu off-canvas - only visible on small screens */}
      <aside
        className={`lg:hidden fixed inset-0 transform transition-transform duration-300 ease-in-out z-50 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col p-2 bg-white h-full">
          <div className="flex flex-col p-4 items-center gap-8 flex-1 self-stretch rounded-2xl border border-white bg-[rgb(151,190,238)] backdrop-blur-[40px] h-full overflow-y-auto">
                                  {/* Logo and Close Button */}
            <div className="flex justify-between items-center self-stretch">
              {/* Logo Section */}
              <div className="w-[137px] h-[60px] aspect-[137/60]">
                <Image
                  src="/imgs/logo.png"
                  alt="Malifax Logo"
                  width={137}
                  height={60}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setMobileOpen(false)} 
                aria-label="Close menu"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M6 18L18 6" stroke="#181D27" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          
          {/* Navigation */}
          <nav className="flex flex-col gap-8 w-full">
            {navItems.map((item, idx) => {
              const dropdown = DROPDOWN_ITEMS.find(d => d.label === item.label);
              return dropdown ? (
                <div key={item.label} className="w-full">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full text-[#181D27] font-semibold text-sm leading-5"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}
                    onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <svg className={`transition-transform duration-200 ${mobileDropdown === item.label ? 'rotate-180' : ''}`} width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#181D27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  {/* Dropdown mobile */}
                  <div className={`flex flex-col w-full pl-4 mt-2 transition-all duration-200 overflow-hidden ${mobileDropdown === item.label ? 'max-h-[1000px] gap-2' : 'max-h-0'}`}>
                    {dropdown.items.map((sub, subIdx) => (
                      <Link
                        key={sub.text}
                        href={sub.href}
                        className="flex items-center gap-3 py-2 flex-1 text-[#181D27] text-xs font-semibold leading-[18px]"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '12px', fontWeight: 600, lineHeight: '18px' }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.icon}
                        <span>{sub.text}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block text-[#181D27] font-semibold text-sm leading-5 transition-all duration-150 ${pathname === item.href ? 'text-blue-400' : ''}`}
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}
                  onClick={(e) => {
                    if (item.label === 'Shop' && pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('shop');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setMobileOpen(false);
                      return;
                    }
                    setMobileOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          </div>
        </div>
      </aside>
    </>
  );
} 