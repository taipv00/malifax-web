"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LogoGrid from '../../components/solutions/LogoGrid';
import SolutionHero from '../../components/solutions/SolutionHero';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';
import SolutionFeatureCard from '../../components/solutions/SolutionFeatureCard';
import ServiceCard from '../../components/solutions/ServiceCard';
import AccessSystemItem from '../../components/AccessSystemItem';
import WhyChoose from '@/app/components/solutions/WhyChoose';

export default function CCTVDoorAccessPage() {
  return (
    <div className="">
      <SolutionHero
        imageSrc="/imgs/solution/cctv-door-access.png"
        title="CCTV & Door Access"
        rightMinWidth="min-w-[239px]"
        rightMaxWidth="max-w-[426px]"
      />

      <ContentHeaderSection
        title="CCTV & Door Access System"
        description="At Malifax Technologies, we understand the importance of securing your premises. Our advanced CCTV and Door Access Systems provide comprehensive security solutions to protect your business, employees, and assets."
      />

      {/* Why Choose Section */}
      <section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-9 xl:mt-20 px-4 xl:px-0 max-w-[1194px] mx-auto"
        >
          <WhyChoose title="Our CCTV & Door Access Systems?" className="mr-[10px]" />
          {/* 2 Items Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-start gap-4 md:flex-row md:gap-8 w-full mt-4 xl:mt-8"
          >
            {/* Item 1 - Access Control System */}
            <div className="flex flex-col w-full items-end gap-3 p-3 flex-1 rounded-[22px] outline outline-1 outline-[#E9EAEB] bg-[#FDFDFD]">
              <div className="flex p-4 items-center gap-4 w-full rounded-2xl outline outline-1 outline-[#E9EAEB] bg-gradient-to-tr from-[#ECF9FF] to-white">
                <Image
                  src="/svgs/tag36_36.svg"
                  alt="Access Control Icon"
                  width={36}
                  height={36}
                />
                <span className="text-[16px] lg:text-[20px] font-semibold font-plus-jakarta text-[#181D27] leading-[24px] lg:leading-[30px]">
                  Access control system
                </span>
              </div>
            </div>

            {/* Item 2 - CCTV */}
            <div className="flex flex-col w-full items-end gap-3 p-3 flex-1 rounded-[22px] border border-[#E9EAEB] bg-[#FDFDFD]">
              <div className="flex p-4 items-center gap-4 w-full rounded-2xl border border-[#E9EAEB] bg-gradient-to-tr from-[#ECF9FF] to-white">
                <Image
                  src="/svgs/tag36_36.svg"
                  alt="CCTV Icon"
                  width={36}
                  height={36}
                />
                <span className="text-[16px] lg:text-[20px] font-semibold font-plus-jakarta text-[#181D27] leading-[24px] lg:leading-[30px]">
                  CCTV
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="mt-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[46px] flex justify-center"
        >
          {/* 3 Columns Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center md:place-items-stretch">
            {/* Column 1 - 2 items */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }} className="flex flex-col gap-6 xl:mt-[90px]">
              <SolutionFeatureCard
                imageSrc="/svgs/access-control-system.svg"
                title="Enhanced"
                span="Security"
                description="Monitor and control access to your premises with our integrated CCTV and door access systems, ensuring a secure environment."
              />
              <SolutionFeatureCard
                imageSrc="/svgs/cctv-surveillance.svg"
                title="Ease of"
                span="Use"
                description="Our systems are user-friendly, with intuitive interfaces that make monitoring and managing security simple and efficient."
              />
            </motion.div>

            {/* Column 2 - 2 items */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col gap-6">
              <SolutionFeatureCard
                imageSrc="/svgs/remote-monitoring.svg"
                title="Real-Time"
                span="Monitoring"
                description="Our CCTV systems offer real-time surveillance, allowing you to keep an eye on your property at all times."
              />
              <SolutionFeatureCard
                imageSrc="/svgs/security-analytics.svg"
                title="Scalability"
                description="Our solutions are scalable, making them suitable for businesses of all sizes, from small offices to large enterprises."
              />
            </motion.div>

            {/* Column 3 - 1 item */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex flex-col gap-6 xl:mt-[250px]">
              <SolutionFeatureCard
                imageSrc="/svgs/24-7-support.svg"
                title="Access"
                span="Control"
                description="Manage who enters your premises with our sophisticated door access systems, which can be customized to meet your specific security needs."
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our CCTV & Door Access Systems Section */}
      <section className="mt-20 relative">
        {/* Striped Backgrounds - left and right */}
        <div
          className="hidden xl:block absolute left-0 top-24 bottom-0 w-[50vw] z-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage: 'url(/imgs/service-card-bg.png)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '529.548px 529px',
            backgroundPosition: 'left center',
          }}
        />
        <div
          className="hidden xl:block absolute right-0 top-24 bottom-0 w-[50vw] z-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage: 'url(/imgs/service-card-bg.png)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '529.548px 529px',
            backgroundPosition: 'right center',
          }}
        />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-10 max-w-[1194px] mx-auto px-4 xl:px-0">
          {/* Main Title */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-[30px] lg:text-[60px] font-semibold text-center font-plus-jakarta text-[#0452D8] leading-[38px] lg:leading-[72px] tracking-[-1.2px]">
              Our CCTV & Door Access Systems
            </h2>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
            <AccessSystemItem
              title="CCTV Installation"
              description="Professional installation of high-definition CCTV cameras to cover all critical areas of your premises."
            />
            <AccessSystemItem
              title="Access Control Systems"
              description="Implementation of advanced door access systems, including keycard, biometric, and PIN-based entry solutions."
            />
            <AccessSystemItem
              title="System Integration"
              description="Seamlessly integrate CCTV and access control systems for a comprehensive security solution."
            />
            <AccessSystemItem
              title="Remote Monitoring"
              description="Access live and recorded footage from anywhere using our secure remote monitoring solutions."
            />
            <AccessSystemItem
              title="Maintenance and Support"
              description="Ongoing maintenance and support to ensure your security systems are always operational and up-to-date."
            />
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col xl:flex-row w-full max-w-[1194px] mx-auto pt-20 xl:pt-[80px] items-start gap-9 xl:gap-[135px] px-4 xl:px-0">
          {/* Left Side - Title */}
          <div className="w-full xl:w-auto xl:max-w-[355px] mb-8 xl:mb-0">
            <h2 className="text-[30px] xl:text-[60px] font-semibold text-center xl:text-left font-plus-jakarta leading-[38px] xl:leading-[72px] tracking-[-1.2px]">
              <span className="text-[#0452D8]">Benefits of</span>{" "}
              <span className="text-[#181D27]">Our CCTV & Door Access Systems</span>
            </h2>
          </div>

          {/* Right Side - Benefits Cards Grid */}
          <div className="w-full xl:w-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
              <AccessSystemItem
                title="Deterrence"
                description="Visible CCTV cameras and controlled access points act as a deterrent to potential intruders."
              />
              <AccessSystemItem
                title="Incident Response"
                description="Quickly respond to security incidents with real-time alerts and access to live footage."
              />
              <AccessSystemItem
                title="Audit Trails"
                description="Maintain detailed records of access events and surveillance footage for audit and investigation purposes."
              />
              <AccessSystemItem
                title="Peace of Mind"
                description="Ensure the safety and security of your employees and assets, providing peace of mind for business owners and managers."
              />
            </div>
          </div>
        </motion.div>

        {(() => {
          const iconsDesktop = [
            { position: 3, src: '/svgs/solution/cctv-i1.svg', alt: 'Logo 1', size: 1 },
            { position: 8, src: '/svgs/solution/cctv-i2.svg', alt: 'Logo 2', size: 2 },
            { position: 17, src: '/svgs/solution/cctv-i3.svg', alt: 'Logo 3', size: 2 },
          ];
          const iconsMobile = [
            { position: 9, src: '/svgs/solution/cctv-i1.svg', alt: 'Logo 1', size: 1 },
            { position: 4, src: '/svgs/solution/cctv-i2.svg', alt: 'Logo 2', size: 2 },
            { position: 13, src: '/svgs/solution/cctv-i3.svg', alt: 'Logo 3', size: 2 },
          ];
          return (
            <>
              <div className="hidden xl:block">
                <LogoGrid
                  icons={iconsDesktop}
                  totalSlots={24}
                  containerClassName="mt-[47px] mb-14"
                />
              </div>
              <div className="block xl:hidden">
                <LogoGrid
                  icons={iconsMobile}
                  totalSlots={21}
                  containerClassName="mt-[47px] mb-14"
                />
              </div>
            </>


          );
        })()}
      </section>

      <CTABanner
        title="Get Started with Malifax Technologies CCTV & Door Access Systems"
        description="Secure your business with our state-of-the-art CCTV and Door Access Systems. Contact us today to learn more about how we can help you enhance the security of your premises."
        buttonText="Contact us now!"
        buttonLink="/contact"
      />

      <Footer />
    </div>
  );
}
