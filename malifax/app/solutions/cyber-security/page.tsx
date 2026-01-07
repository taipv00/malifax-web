"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SolutionHero from '../../components/solutions/SolutionHero';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import CyberSecurityCard from '../../components/CyberSecurityCard';
import PartnershipNetwork from '../../components/PartnershipNetwork';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';

export default function CyberSecurityPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="">
      <SolutionHero 
        imageSrc="/imgs/solution/cyber-security.png"
        title="Cyber Security"
      />

      <ContentHeaderSection 
        title="Cyber Security"
        description="In an era where cyber threats are constantly evolving, safeguarding your business's digital assets is more critical than ever. At Malifax Technologies, we offer comprehensive cyber security solutions designed to protect your organization from a wide range of cyber threats."
        descriptionColor="text-[#717680]"
      />

      {/* Why Choose Section */}
      <section className="relative" suppressHydrationWarning>
        {/* Right-only striped background anchored to viewport edge (client-only to avoid hydration mismatch) */}
        {mounted ? (
          <div
            className="hidden xl:block absolute right-0 top-16 bottom-0 w-[50vw] z-0 opacity-60 pointer-events-none"
            style={{
              backgroundImage: 'url(/imgs/service-card-bg.png)',
              backgroundRepeat: 'repeat-y',
              backgroundSize: '529.548px 529px',
              backgroundPosition: 'right center',
            }}
            aria-hidden="true"
          />
        ) : null}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-10 flex flex-col xl:flex-row w-full max-w-[1194px] mx-auto pt-20 xl:pt-[80px] items-start gap-8 xl:gap-5 px-4 xl:px-0">
          {/* Left Side - Title and Description */}
          <div className="w-full xl:w-auto xl:max-w-[472px] mb-8 xl:mb-0">
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-[30px] xl:text-[60px] font-semibold text-center xl:text-left font-plus-jakarta leading-[38px] xl:leading-[72px] tracking-[-1.2px] mb-9 xl:mb-0">
              <span className="text-[#181D27]">Why Choose Our</span>{" "}
              <span className="text-[#0452D8]">Cyber Security Solutions?</span>
            </motion.h2>
            
            {/* Description - Hidden on mobile, visible on xl */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="hidden xl:block mt-9">
              <p className="self-stretch text-[#181D27] font-plus-jakarta text-lg font-normal leading-7">
                Malifax Technologies offers solutions and services in assessment, consulting, design, architecting, implementation and deployment. We also provide maintenance and optimisation services in the following areas:
              </p>
            </motion.div>
          </div>
          
          {/* Right Side - Cyber Security Cards Grid */}
          <div className="w-full xl:w-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <CyberSecurityCard title="Access control" />
              <CyberSecurityCard title="Antivirus and antimalware software" />
              <CyberSecurityCard title="Data loss prevention" />
              <CyberSecurityCard title="Endpoint/Managed detection and response (EDR/MDR)" />
              <CyberSecurityCard title="Email security" />
              <CyberSecurityCard title="Incident response service" />
              <CyberSecurityCard title="Network access control" />
              <CyberSecurityCard title="Next-generation firewall" />
              <CyberSecurityCard title="Intrusion prevention system" />
              <CyberSecurityCard title="Network segmentation" />
              <CyberSecurityCard title="Secure access service edge (SASE)" />
              <CyberSecurityCard title="VPN" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Partnership Network Section */}
      <section className="bg-white py-11 ">
         
          
          {/* Partnership Network Diagram */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex justify-center">
            <PartnershipNetwork />
          </motion.div>
      </section>

      <CTABanner 
        description="Protect your business from cyber threats with our comprehensive cyber security solutions. Contact us today to learn more about how we can help you secure your digital assets and ensure the safety of your IT environment."
        buttonText="Contact us now!"
        buttonLink="/contact"
      />
      
      <Footer />
    </div>
  );
}
