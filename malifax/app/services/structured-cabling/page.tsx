"use client";
import React from 'react';
import { motion } from 'framer-motion';
import SolutionHero from '../../components/solutions/SolutionHero';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import WhyChoose from '../../components/solutions/WhyChoose';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';
import AccessSystemItem from '../../components/AccessSystemItem';
import GridSection from '@/app/components/solutions/GridSection';
import ServiceTag from '../../components/ServiceTag';
import HeroBackground from '@/app/components/HeroBackground';
import Tag from '@/app/components/Tag';
import Title from '@/app/components/Title';

export default function StructuredCablingPage() {
  const whyChooseItems = [
    { 
      title: "Expert Installation", 
      description: "Our team of certified technicians ensures precise and professional installation, adhering to industry standards and best practices." 
    },
    { 
      title: "Comprehensive Support", 
      description: "We provide full support from initial design to ongoing maintenance, ensuring your network runs smoothly and efficiently." 
    }
  ];

  const services = [
    { 
      title: "Network Design and Planning", 
      description: "We develop customized cabling plans tailored to your specific business requirements and future growth." 
    },
    { 
      title: "Installation and Implementation", 
      description: "Professional installation of copper and fiber-optic cabling systems with attention to detail and quality." 
    },
    { 
      title: "Cable Management", 
      description: "Professional organization and management of your cabling infrastructure for maximum efficiency and aesthetics." 
    },
    { 
      title: "Testing and Certification", 
      description: "Thorough testing and certification of all cabling infrastructure to meet industry performance standards." 
    },
    { 
      title: "Design Consultation & Project Management", 
      description: "Expert guidance and project management to ensure successful delivery of your structured cabling project." 
    },
    { 
      title: "Containment Systems", 
      description: "Complete solutions for protecting and organizing your cabling infrastructure with proper containment systems." 
    }
  ];

  const fiberOpticsServices = [
    "Fiber Optics",
    "Multimode OM3, OM4", 
    "Singlemode, FTTx",
    "Custom MTP"
  ];

  const copperServices = [
    "CAT6, CAT6A, CAT7, CAT8",
    "UTP, FTP, STP, S/UTP, F/UTP",
    "Coax for ELV applications"
  ];

  return (
    <div className="min-h-screen bg-white">
    <HeroBackground>
      <div className="min-h-screen">
        <div className="flex flex-col items-center justify-center xl:flex-row xl:items-center justify-center gap-8 xl:gap-16 max-w-7xl mx-auto">
          
          <div className="absolute top-2 left-2 lg:top-6 lg:left-6 z-0">
            <img 
              src={"/imgs/solution/structured-cabling.png"} 
              alt="Structured Cabling"
              className="block w-full max-w-[40vw] h-auto object-contain"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex  flex-col items-start gap-4 order-1 lg:order-1 xl:pl-20 mt-[300px] xl:mt-[436px]"
          >
            <Tag text="Services" />
            <Title className="text-4xl lg:text-5xl xl:text-7xl">
              Structured Cabling
            </Title>
          </motion.div>
        </div>
      </div>
    </HeroBackground>
      <ContentHeaderSection
        title="Structured Cabling"
        description="At Malifax Technologies, we provide top-notch structured cabling solutions designed to support your business's communication and data needs. Our services ensure a reliable and scalable infrastructure that can adapt to your growing requirements."
        maxWidthClassName="max-w-[1157px]"
      />

      <section className="bg-white">
        <div className="mt-9 xl:mt-18 px-4 xl:px-0 max-w-[1194px] mx-auto">
          <WhyChoose title="Our Structured Cabling Services?" />
        </div>
      </section>

      <section className="mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GridSection items={whyChooseItems} />
        </motion.div>
      </section>

      {/* Our Structured Cabling Services Section */}
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
          {/* Main Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] lg:text-[60px] font-semibold text-center font-plus-jakarta text-[#0452D8] leading-[38px] lg:leading-[72px] tracking-[-1.2px]">
              Our Structured Cabling Services
            </h2>
          </motion.div>

          {/* Service Cards Grid */}
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

      {/* Cabling Infrastructure Services Section */}
      <section className="bg-white mb-[35px]">
        <div className="flex flex-col xl:flex-row w-full max-w-[1194px] pt-20 items-start gap-8 mx-auto px-4 xl:px-0">
          {/* Left Side - Title */}
          <div className="max-w-[434px]">
            <h2 className="text-[30px] xl:text-[60px] font-semibold text-left font-plus-jakarta leading-[38px] xl:leading-[72px] tracking-[-1.2px]">
              <span className="text-[#0452D8]">Cabling Infrastructure Services</span>
            </h2>
          </div>
          
          {/* Right Side - Services Grid */}
          <div className="w-full xl:flex-1">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8">
              {fiberOpticsServices.map((service, index) => (
                <ServiceTag key={index} title={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Copper Services Section */}
      <section className="bg-white mb-[35px]">
        <div className="flex flex-col xl:flex-row w-full max-w-[1194px]  pt-20 items-start gap-8 mx-auto px-4 xl:px-0">
          {/* Left Side - Services Grid */}
          <div className="w-full xl:flex-1 order-2 xl:order-1">
            <div className="w-full grid grid-cols-1 gap-4">
              {copperServices.map((service, index) => (
                <ServiceTag key={index} title={service} />
              ))}
            </div>
          </div>
          
          {/* Right Side - Title */}
          <div className="w-full xl:max-w-[434px] order-1 xl:order-2">
            <h2 className="text-[30px] xl:text-[60px] font-semibold text-right font-plus-jakarta leading-[38px] xl:leading-[72px] tracking-[-1.2px]">
              <span className="text-[#0452D8]">Copper</span>
            </h2>
          </div>
        </div>
      </section>

      <CTABanner
        title="Get Started with Malifax Structured Cabling Services"
        description="Optimize your communication and data infrastructure with our professional structured cabling solutions. Contact us today to learn more about how we can help you build a reliable and scalable network infrastructure."
        buttonText="Contact us now!"
        buttonLink="/contact"
      />
      
      <Footer />
    </div>
  );
}
