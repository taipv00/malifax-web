import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-[#181D27] py-9 pb-15  px-6">
      <div className="max-w-[1258px] mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-0">
          {/* Column 1: Logo + Contact (order swaps between mobile and desktop) */}
          <div className="flex flex-col gap-8 max-w-[336px]">
            <div className="order-1 lg:order-2">
              <Image
                src="/imgs/logo.png"
                alt="Malifax Logo"
                width={213}
                height={94}
                className="w-[213px] h-[94px]"
              />
            </div>
            <div className="space-y-2 order-2 lg:order-1">
              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#717680]">
                76 Playfair Road, #06-03 LHK2 Building, Singapore 367996
              </p>
              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#717680]">
                Email: <a href="mailto:enquiry@malifax.com.sg" className="hover:underline text-[#717680]">enquiry@malifax.com.sg</a>
              </p>
              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#717680]">
                Phone: (65) 6383 3833
              </p>
              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#717680]">
                Fax: (65) 6383 2022
              </p>
            </div>
          </div>

          {/* Column 2: Menu */}
          <div className="grid grid-cols-2 gap-8 lg:gap-48">
            <div className="space-y-9">
              <Link href="/" className="block font-['Plus_Jakarta_Sans'] font-medium text-[20px] leading-[30px] tracking-[0%] hover:underline text-[#181D27]">
                Home
              </Link>
              <Link href="/about" className="block font-['Plus_Jakarta_Sans'] font-medium text-[20px] leading-[30px] tracking-[0%] hover:underline text-[#181D27]">
                About us
              </Link>
              <Link href="/solution" className="block font-['Plus_Jakarta_Sans'] font-medium text-[20px] leading-[30px] tracking-[0%] hover:underline text-[#181D27]">
                Solution
              </Link>
              <Link href="/services" className="block font-['Plus_Jakarta_Sans'] font-medium text-[20px] leading-[30px] tracking-[0%] hover:underline text-[#181D27]">
                Services
              </Link>
            </div>
            <div className="space-y-9">
              <Link href="/partners" className="block font-['Plus_Jakarta_Sans'] font-medium text-[20px] leading-[30px] tracking-[0%] hover:underline text-[#181D27]">
                Partners
              </Link>
              <Link href="/shop" className="block font-['Plus_Jakarta_Sans'] font-medium text-[20px] leading-[30px] tracking-[0%] hover:underline text-[#181D27]">
                Shop
              </Link>
              <Link href="/contact" className="block font-['Plus_Jakarta_Sans'] font-medium text-[20px] leading-[30px] tracking-[0%] hover:underline text-[#181D27]">
                Contact
              </Link>
              <Link href="/career" className="block font-['Plus_Jakarta_Sans'] font-medium text-[20px] leading-[30px] tracking-[0%] hover:underline text-[#181D27]">
                Career
              </Link>
            </div>
          </div>

          {/* Column 3: Social Media */}
          <div className="space-y-4">
            <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] leading-[30px] tracking-[0%] text-[#181D27]">
              Social media
            </h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 hover:opacity-80 transition-opacity">
                <Image
                  src="/svgs/fb-icon.svg"
                  alt="Facebook"
                  width={48}
                  height={48}
                  className="w-[48px] h-[48px]"
                />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 hover:opacity-80 transition-opacity">
                <Image
                  src="/svgs/linkin-icon.svg"
                  alt="LinkedIn"
                  width={48}
                  height={48}
                  className="w-[48px] h-[48px]"
                />
              </a>
              <a href="https://skype.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 hover:opacity-80 transition-opacity">
                <Image
                  src="/svgs/s-social-icon.svg"
                  alt="Skype"
                  width={48}
                  height={48}
                  className="w-[48px] h-[48px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
