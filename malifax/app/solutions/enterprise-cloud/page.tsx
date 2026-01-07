"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SolutionHero from '../../components/solutions/SolutionHero';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import WhyChoose from '../../components/solutions/WhyChoose';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';
import LogoGrid from '@/app/components/solutions/LogoGrid';

export default function EnterpriseCloudPage() {
  return (
    <div className="min-h-screen">
      <SolutionHero 
        imageSrc="/imgs/solution/enterprise-cloud.png"
        title="Enterprise Cloud"
      />

      <ContentHeaderSection
        title="Cloud Solutions"
        description="At Malifax Technologies, we partner with major cloud service providers to provide a comprehensive cloud solutions designed to meet the diverse needs of modern businesses. Our cloud solutions provide flexibility, scalability, and security, ensuring your business can adapt and thrive in today's fast-paced digital landscape."
      />

      {/* Why Choose Section */}
      <section className="bg-white">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-9 xl:mt-20 px-4 xl:px-0 max-w-[1194px] mx-auto">
          <WhyChoose title="Our Cloud Solutions?" />

          {/* 2 Items Container */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col items-start gap-4 md:flex-row md:gap-8 w-full mt-4 xl:mt-8">
            {/* Item 1 - Access Control System */}
            <div className="flex flex-col w-full items-end gap-3 p-3 flex-1 rounded-[22px] outline outline-1 outline-[#E9EAEB] bg-[#FDFDFD]">
              <div className="flex p-4 items-center gap-4 w-full rounded-2xl outline outline-1 outline-[#E9EAEB] bg-gradient-to-tr from-[#ECF9FF] to-white">
                <Image
                  src="/svgs/tag36_36.svg"
                  alt="Cloud Security Icon"
                  width={36}
                  height={36}
                />
                <span className="text-[16px] lg:text-[20px] font-semibold font-plus-jakarta text-[#181D27] leading-[24px] lg:leading-[30px]">
                  Cloud Security
                </span>
              </div>
            </div>

            {/* Item 2 - CCTV */}
            <div className="flex flex-col w-full items-end gap-3 p-3 flex-1 rounded-[22px] border border-[#E9EAEB] bg-[#FDFDFD]">
              <div className="flex p-4 items-center gap-4 w-full rounded-2xl border border-[#E9EAEB] bg-gradient-to-tr from-[#ECF9FF] to-white">
                <Image
                  src="/svgs/tag36_36.svg"
                  alt="Scalability Icon"
                  width={36}
                  height={36}
                />
                <span className="text-[16px] lg:text-[20px] font-semibold font-plus-jakarta text-[#181D27] leading-[24px] lg:leading-[30px]">
                  Scalability
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {(() => {
          const iconsDesktop = [
            { position: 3, src: '/svgs/solution/cloud-i1.svg', alt: 'Logo 1', size: 2 },
            { position: 10, src: '/svgs/solution/cloud-i2.svg', alt: 'Logo 2', size: 1 },
            { position: 13, src: '/svgs/solution/cloud-i3.svg', alt: 'Logo 3', size: 1 },
            { position: 19, src: '/svgs/solution/cloud-i4.svg', alt: 'Logo 4', size: 2 },
            { position: 28, src: '/svgs/solution/cloud-i5.svg', alt: 'Logo 5', size: 2 },
            { position: 33, src: '/svgs/solution/cloud-i6.svg', alt: 'Logo 6', size: 1 },
          ];
          const iconsMobile = [
            { position: 0, src: '/svgs/solution/cloud-i1.svg', alt: 'Logo 1', size: 2 },
            { position: 5, src: '/svgs/solution/cloud-i2.svg', alt: 'Logo 2', size: 1 },
            { position: 9, src: '/svgs/solution/cloud-i3.svg', alt: 'Logo 3', size: 1 },
            { position: 18, src: '/svgs/solution/cloud-i4.svg', alt: 'Logo 4', size: 2 },
            { position: 13, src: '/svgs/solution/cloud-i5.svg', alt: 'Logo 5', size: 2 },
            { position: 25, src: '/svgs/solution/cloud-i6.svg', alt: 'Logo 6', size: 1 },
          ];
          return (
            <>
              <div className="hidden xl:block">
                <LogoGrid
                  icons={iconsDesktop}
                  containerClassName="mt-[47px] mb-14"
                />
              </div>
              <div className="block xl:hidden">
                <LogoGrid
                  icons={iconsMobile}
                  totalSlots={27}
                  containerClassName="mt-[47px] mb-14"
                />
              </div>
            </>
            
          );
        })()}
      </section>

      <CTABanner 
        description="Transform your business with our cutting-edge cloud solutions. Contact us today to learn more about how we can help you leverage the power of the cloud to achieve your business goals."
        buttonText="Contact us now!"
        buttonLink="/contact"
      />

      <Footer />
    </div>
  );
}
