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
import LogoGrid from '@/app/components/solutions/LogoGrid';

export default function EquipmentRentalPage() {
  const whyChooseItems = [
    { 
      title: "Wide Selection", 
      description: "Access a broad range of high-quality equipment to support your business operations." 
    },
    { 
      title: "Flexibility", 
      description: "Choose from short-term or long-term rental options to suit your project requirements." 
    },
    { 
      title: "Cost-Effective", 
      description: "Save on capital expenditure by renting equipment instead of purchasing it outright." 
    },
    { 
      title: "Expert Support", 
      description: "Benefit from our knowledgeable team who can help you select the right equipment and provide ongoing support." 
    },
    { 
      title: "Reliable Equipment", 
      description: "Our equipment is regularly maintained and inspected to ensure optimal performance and safety." 
    }
  ];

  const benefitsItems = [
    { 
      title: "Operational Efficiency", 
      description: "Ensure your projects run smoothly with access to the right equipment." 
    },
    { 
      title: "Scalability", 
      description: "Easily scale your equipment needs up or down based on project demands." 
    },
    { 
      title: "Maintenance-Free", 
      description: "Enjoy the convenience of equipment that is regularly maintained and serviced by our team." 
    },
    { 
      title: "Quick Availability", 
      description: "Get the equipment you need quickly, with fast delivery and setup options." 
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SolutionHero
        imageSrc="/imgs/solution/equipment-rental.png"
        title="Equipment Rental"
        tagText="Services"
      />

      <ContentHeaderSection
        title="Equipment Rental"
        description="At Malifax Technologies, we offer a wide range of equipment rental services to meet the diverse needs of your business. Whether you need short-term rentals for a specific project or long-term solutions, our flexible rental options ensure you have the right equipment when you need it."
        maxWidthClassName="max-w-[1125px]"
      />

      <section className="bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-9 xl:mt-20 px-4 xl:px-0 max-w-[900px] mx-auto"
        >
          <WhyChoose title="Our Equipment Rental Services?" />
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

      {/* Our Equipment Rental Services Section */}
      <section className="mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] lg:text-[60px] font-semibold text-center font-plus-jakarta text-[#0452D8] leading-[38px] lg:leading-[72px] tracking-[-1.2px]">
              Our Equipment Rental Services
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <AccessSystemItem
              title="IT Equipment"
              description="Rent laptops, desktops, servers, and networking equipment to support your IT needs."
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white mb-[35px]">
        <div className="flex flex-col xl:flex-row w-full max-w-[1194px] mx-auto pt-20 xl:pt-[80px] items-start gap-4 xl:gap-8 px-4 xl:px-0">
          {/* Left Side - Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full xl:w-auto xl:max-w-[366px] mb-8 xl:mb-0"
          >
            <h2 className="text-[30px] xl:text-[60px] font-semibold text-center xl:text-left font-plus-jakarta leading-[38px] xl:leading-[72px] tracking-[-1.2px]">
              <span className="text-[#181D27]">Benefits of</span>{" "}
              <span className="text-[#0452D8]">Our Equipment Rental Services</span>
            </h2>
          </motion.div>
          
          {/* Right Side - Benefits Cards Grid */}
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
      <section className="bg-white">
        {(() => {
          const iconsDesktop = [
            { position: 3, src: '/svgs/solution/rental-i1.svg', alt: 'Logo 1', size: 1 },
            { position: 10, src: '/svgs/solution/rental-i2.svg', alt: 'Logo 2', size: 1 },
            { position: 16, src: '/svgs/solution/rental-i3.svg', alt: 'Logo 3', size: 1 },
            { position: 32, src: '/svgs/solution/rental-i4.svg', alt: 'Logo 4', size: 1 },
          
          ];
          const iconsMobile = [
            { position: 0, src: '/svgs/solution/rental-i1.svg', alt: 'Logo 1', size: 1 },
            { position: 5, src: '/svgs/solution/rental-i2.svg', alt: 'Logo 2', size: 1 },
            { position: 9, src: '/svgs/solution/rental-i3.svg', alt: 'Logo 3', size: 1 },
            { position: 18, src: '/svgs/solution/rental-i4.svg', alt: 'Logo 4', size: 1 },
          ];
          return (
            <>
              <div className="hidden xl:block">
                <LogoGrid
                  icons={iconsDesktop}
                  containerClassName="mt-[48px] mb-14 xl:mt-[200px]"
                />
              </div>
              <div className="block xl:hidden">
                <LogoGrid
                  icons={iconsMobile}
                  totalSlots={27}
                  containerClassName="mt-[48px] mb-14 xl:mt-[200px]"
                />
              </div>
            </>
          );
        })()}
      </section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <CTABanner
        title="Get Started with Malifax Equipment Rental Services"
        description="Equip your business with our reliable and cost-effective rental solutions. Contact us today to learn more about how we can support your equipment rental needs and help you achieve your business goals."
        buttonText="Contact us now!"
        buttonLink="/contact"
        />
      </motion.div>
      
      <Footer />
    </div>
  );
}
