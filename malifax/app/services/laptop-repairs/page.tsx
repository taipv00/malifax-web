"use client";
import React from 'react';
import { motion } from 'framer-motion';
import SolutionHero from '../../components/solutions/SolutionHero';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import WhyChoose from '../../components/solutions/WhyChoose';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';
import AccessSystemItem from '../../components/AccessSystemItem';
import RepairServicesGrid, { RepairServiceItem } from '../../components/solutions/RepairServicesGrid';
import GridSection from '@/app/components/solutions/GridSection';

export default function LaptopRepairsPage() {
  const whyChooseItems = [
    { 
      title: "Expert Technicians", 
      description: "Our team of skilled technicians has extensive experience diagnosing and repairing a wide range of laptop issues." 
    },
    { 
      title: "Quick Turnaround", 
      description: "We prioritize fast and efficient service to minimize downtime and get your laptop back to you as soon as possible." 
    },
    { 
      title: "Comprehensive Repairs", 
      description: "From hardware malfunctions to software issues, we handle all types of laptop repairs." 
    },
    { 
      title: "Transparent Pricing", 
      description: "Our competitive pricing ensures you receive high-quality service without breaking the bank." 
    }
  ];

  const services = [
    { 
      title: "Screen Replacement", 
      description: "Fix cracked or malfunctioning screens with our professional screen replacement services." 
    },
    { 
      title: "Battery Replacement", 
      description: "Replace old or faulty batteries to restore your laptop's battery life and performance." 
    },
    { 
      title: "Keyboard Repair", 
      description: "Repair or replace damaged or unresponsive keyboards to ensure smooth typing." 
    },
    { 
      title: "Hardware Upgrades", 
      description: "Upgrade your laptop's hardware components, such as RAM and storage, to improve performance." 
    }
  ];

  const benefitsItems = [
    { 
      title: "Reliable Repairs", 
      description: "Trust our experienced technicians to provide reliable and effective repairs." 
    },
    { 
      title: "Enhanced Performance", 
      description: "Improve your laptop's performance with our comprehensive repair and upgrade solutions." 
    },
    { 
      title: "Cost Savings", 
      description: "Save money by repairing your laptop instead of replacing it." 
    },
    { 
      title: "Peace of Mind", 
      description: "Enjoy peace of mind knowing your laptop is in capable hands." 
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SolutionHero
        imageSrc="/imgs/solution/laptop-repair.png"
        title="Laptop Repair"
        tagText="Services"
      />

      <ContentHeaderSection
        title="Laptop Repair"
        description="At Malifax Technologies, we understand how essential your laptop is to your daily operations. Our professional laptop repair services are designed to get you back up and running quickly, with minimal disruption to your workflow."
      />

      <section className="bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-9 xl:mt-20 px-4 xl:px-0 max-w-[900px] mx-auto"
        >
          <WhyChoose title="Our Laptop Repair Services?" />
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
              Our Laptop Repair Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
            {services.map((item, index) => (
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
              <span className="text-[#0452D8]">Our Laptop Repair Services</span>
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

      {/* Repairs showcase grid (desktop 3x3, mobile stacked) */}
      <section className="bg-white py-10">
        <div className="max-w-[1194px] mx-auto px-4 xl:px-0">
          {(() => {
            const items: RepairServiceItem[] = [
              { title: 'Screen repair', imageSrc: '/imgs/laptop/screen.png' },
              { title: 'Keyboard repair', imageSrc: '/imgs/laptop/keyboard.png' },
              { title: 'Power Adapter', imageSrc: '/imgs/laptop/adapter.png' },
              { title: 'Battery replacement', imageSrc: '/imgs/laptop/battery.png' },
              { title: 'Motherboard repair', imageSrc: '/imgs/laptop/motherboard.png' },
              { title: 'Hinge repair', imageSrc: '/imgs/laptop/hinge.png' },
              { title: 'SSD Storage replacement / upgrade', imageSrc: '/imgs/laptop/ssd.png' },
              { title: 'Ram replacement / upgrade', imageSrc: '/imgs/laptop/ram.png' },
              { title: 'Speaker Replacement', imageSrc: '/imgs/laptop/speaker.png' },
            ];
            return <RepairServicesGrid items={items} />;
          })()}
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <CTABanner
        title="Get Started with Malifax Laptop Repair Services"
        description="Restore your laptop to optimal performance with our professional repair services. Contact us today to learn more about how we can help you with all your laptop repair needs."
        buttonText="Contact us now!"
        buttonLink="/contact"
        />
      </motion.div>
      
      <Footer />
    </div>
  );
}
