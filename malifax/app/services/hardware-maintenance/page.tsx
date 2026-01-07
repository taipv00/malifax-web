"use client";
import React from 'react';
import { motion } from 'framer-motion';
import SolutionHero from '../../components/solutions/SolutionHero';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import WhyChoose from '../../components/solutions/WhyChoose';
import GridSection from '../../components/solutions/GridSection';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';
import AccessSystemItem from '../../components/AccessSystemItem';

export default function HardwareMaintenancePage() {
  const whyChooseItems = [
    { 
      title: "Proactive Care", 
      description: "We provide regular maintenance to prevent issues before they occur, ensuring your hardware remains in optimal condition." 
    },
    { 
      title: "Expert Technicians", 
      description: "Our team of experienced technicians is skilled in diagnosing and resolving hardware issues quickly and effectively." 
    },
    { 
      title: "Cost-Effective Solutions", 
      description: "Reduce the cost of unexpected repairs and replacements with our affordable maintenance plans." 
    },
    { 
      title: "Minimized Downtime", 
      description: "Our proactive approach helps minimize downtime, keeping your business operations running smoothly." 
    },
    { 
      title: "Comprehensive Support", 
      description: "From routine maintenance to emergency repairs, we offer a full range of hardware support services." 
    }
  ];

  const benefitsItems = [
    { 
      title: "Improved Reliability", 
      description: "Ensure your IT systems are always available and performing optimally." 
    },
    { 
      title: "Extended Lifespan", 
      description: "Prolong the life of your hardware with regular maintenance and timely upgrades." 
    },
    { 
      title: "Enhanced Security", 
      description: "Protect your hardware from potential threats with our comprehensive maintenance services." 
    },
    { 
      title: "Operational Efficiency", 
      description: "Keep your business operations running smoothly with minimal interruptions." 
    },
    { 
      title: "Peace of Mind", 
      description: "Enjoy peace of mind knowing that your hardware is in good hands and any issues will be promptly addressed." 
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SolutionHero
        imageSrc="/imgs/solution/hardware-maintenance.png"
        title="Hardware Maintenance"
        tagText="Services"
      />

      <ContentHeaderSection
        title="Hardware Maintenance"
        description="At Malifax Technologies, we specialize in providing comprehensive hardware maintenance services. Our expert team ensures your IT hardware remains in optimal condition, preventing issues before they occur and minimizing downtime for your business operations."
      />

      <section className="bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-9 xl:mt-20 px-4 xl:px-0 max-w-[1194px] mx-auto"
        >
          <WhyChoose title="Our Hardware Maintenance Services?" />
        </motion.div>
      </section>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GridSection items={whyChooseItems} />
      </motion.div>

      <section className="mt-20 relative">
        {/* Striped Backgrounds - both sides */}
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] lg:text-[60px] font-semibold text-center font-plus-jakarta text-[#0452D8] leading-[38px] lg:leading-[72px] tracking-[-1.2px]">
              Our Hardware Maintenance Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
            {[
              {
                title: 'Preventive Maintenance',
                description:
                  'Regularly scheduled maintenance to identify and address potential issues before they become major problems.',
              },
              {
                title: 'Hardware Repairs',
                description:
                  'Fast and reliable repair services for all types of IT hardware, including servers, desktops, laptops, and peripherals.',
              },
              {
                title: 'Component Replacement',
                description:
                  'Replacement of faulty or aging components to ensure your hardware continues to perform at its best.',
              },
              {
                title: 'System Upgrades',
                description:
                  'Upgrade your existing hardware to improve performance and extend its lifespan.',
              },
              {
                title: 'Emergency Support',
                description:
                  'Rapid response to hardware failures and emergencies to minimize disruption to your business.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="w-full"
              >
                <AccessSystemItem title={item.title} description={item.description} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white mb-[35px]">
        <div className="flex flex-col xl:flex-row w-full max-w-[1194px] mx-auto pt-20 xl:pt-[80px] items-start gap-4 xl:gap-8 px-4 xl:px-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full xl:w-auto xl:max-w-[366px] mb-8 xl:mb-0"
          >
            <h2 className="text-[30px] xl:text-[60px] font-semibold text-center xl:text-left font-plus-jakarta leading-[38px] xl:leading-[72px] tracking-[-1.2px]">
              <span className="text-[#181D27]">Benefits of</span>{" "}
              <span className="text-[#0452D8]">Our Hardware Maintenance Services</span>
            </h2>
          </motion.div>
          
          <div className="w-full xl:w-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
              {benefitsItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  className="w-full"
                >
                  <AccessSystemItem title={item.title} description={item.description} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <CTABanner
        title="Get Started with Malifax Hardware Maintenance Services"
        description="Ensure the reliability and longevity of your IT hardware with our comprehensive maintenance services. Contact us today to learn more about how we can help you maintain your digital infrastructure and keep your business running smoothly."
        buttonText="Contact us now!"
        buttonLink="/contact"
        />
      </motion.div>
      
      <Footer />
    </div>
  );
}
