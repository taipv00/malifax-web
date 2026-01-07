"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LogoGridLoader from '../../components/solutions/LogoGridLoader';
import SolutionHero from '../../components/solutions/SolutionHero';
import CTABanner from '../../components/CTABanner';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import Footer from '../../components/Footer';
import ServiceCard from '../../components/solutions/ServiceCard';

export default function BusinessContinuityPage() {
  return (
    <div className="min-h-screen">
      <SolutionHero
        imageSrc="/imgs/solution/business-conti.png"
        title="Business Continuity"
        rightMaxWidth="max-w-[351px]"
        rightMinWidth="min-w-[180px]"
      />

      <ContentHeaderSection
        title="IT Business Continuity and Disaster"
        title2="Recovery Solutions"
        description="In today’s digital age, ensuring the continuity of your business operations and the swift recovery from any disruptions is crucial. At Malifax Technologies, we provide robust IT Business Continuity and Disaster Recovery (BCDR) solutions to safeguard your business against unforeseen events."
      />

      <section className="mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-8  max-w-[1194px] mx-auto px-4 xl:px-0">
          <div className="w-full xl:w-[458px] flex flex-col items-start">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col items-start">
              <div className="text-[#0452D8] font-['Plus_Jakarta_Sans'] max-w-[191px] xl:max-w-none text-3xl  xl:text-4xl lg:text-6xl xl:text-[60px] font-semibold leading-[38px] lg:leading-[60px] xl:leading-[72px] lg:tracking-[-1.08px] xl:tracking-[-1.2px]">
                Malifax Technologies
                <p className='text-[#181D27]'>Offerings</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="self-stretch text-[#181D27] font-['Plus_Jakarta_Sans'] text-[14px] lg:text-[18px] font-normal leading-[20px] lg:leading-[28px] mt-9">
              Malifax Technologies offers the following solutions and services in helping businesses protect against data loss.
            </motion.div>
          </div>

          <div className="w-full xl:w-[704px] flex flex-col gap-4">
            {(() => {
              const services = [
                { title: "Backup software", iconSrc: "/svgs/tag36_36.svg" },
                { title: "Network access storage (NAS)", iconSrc: "/svgs/tag36_36.svg" },
                { title: "Co-location services", iconSrc: "/svgs/tag36_36.svg" },
                { title: "Storage area network (SAN)", iconSrc: "/svgs/tag36_36.svg" },
                { title: "Cloud storage", iconSrc: "/svgs/tag36_36.svg" },
                { title: "Tape storage", iconSrc: "/svgs/tag36_36.svg" }
              ];

              const rows = [];
              for (let i = 0; i < services.length; i += 2) {
                const rowServices = services.slice(i, i + 2);
                rows.push(
                  <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 * i }} className="flex flex-col lg:flex-row gap-4">
                    {rowServices.map((service, index) => (
                      <ServiceCard
                        key={i + index}
                        title={service.title}
                        iconSrc={service.iconSrc}
                      />
                    ))}
                  </motion.div>
                );
              }

              return rows;
            })()}
          </div>
        </motion.div>

        {/* Load logo grid from API */}
        <LogoGridLoader 
          pageKey="business-continuity" 
          containerClassName="mt-[47px] mb-14"
        />
        
        {/* Mobile layout - commented out as per request */}
        {/* <div className="block xl:hidden">
          <LogoGrid
            icons={iconsMobile}
            totalSlots={36}
            containerClassName="mt-[47px] mb-14"
          />
        </div> */}
      </section>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <CTABanner
          description="Protect your business with our comprehensive IT Business Continuity and Disaster Recovery solutions. Contact us today to learn more about how we can help you ensure the continuity and resilience of your business operations."
          buttonText="Contact us now!"
          buttonLink="/contact"
        />
      </motion.div>

      <Footer />
    </div>
  );
}
