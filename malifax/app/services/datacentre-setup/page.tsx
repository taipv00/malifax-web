'use client';
import React from 'react';
import { motion } from 'framer-motion';
import SolutionHero from '../../components/solutions/SolutionHero';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import WhyChoose from '../../components/solutions/WhyChoose';
import GridSection from '../../components/solutions/GridSection';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';
import AccessSystemItem from '../../components/AccessSystemItem';

export default function DatacentreSetupPage() {
  const whyChooseItems = [
    { 
      title: "Expertise", 
      description: "Our team has extensive experience in data centre design, setup, and relocation, ensuring your project is handled with the utmost professionalism." 
    },
    { 
      title: "Customized Solutions", 
      description: "We tailor our services to meet the specific needs of your business, ensuring optimal performance and scalability." 
    },
    { 
      title: "Minimal Downtime", 
      description: "Our meticulous planning and execution minimize downtime, ensuring your business remains operational throughout the transition." 
    },
    { 
      title: "Security", 
      description: "We prioritize the security of your data and infrastructure, implementing robust measures to protect against potential threats." 
    },
    { 
      title: "End-to-End Service", 
      description: "From initial planning to final implementation, we provide comprehensive support at every stage of the process." 
    }
  ];

  const benefitsItems = [
    { 
      title: "Seamless Transition", 
      description: "Ensure a smooth and efficient transition with minimal impact on your business operations." 
    },
    { 
      title: "Enhanced Performance", 
      description: "Optimize your data centre infrastructure for improved performance and scalability." 
    },
    { 
      title: "Increased Security", 
      description: "Protect your data and infrastructure with advanced security measures." 
    },
    { 
      title: "Cost Savings", 
      description: "Reduce costs associated with downtime and inefficient data centre operations." 
    },
    { 
      title: "Peace of Mind", 
      description: "Enjoy peace of mind knowing that your data centre setup or relocation is handled by experts." 
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SolutionHero
        imageSrc="/imgs/solution/data-center.png"
        title="Data Centre Setup and Relocation"
        tagText="Services"
      />

      <ContentHeaderSection
        title="Data Centre Setup and Relocation"
        description="At Malifax Technologies, we specialize in providing comprehensive data centre setup and relocation services. Whether you’re establishing a new data centre or relocating an existing one, our expert team ensures a seamless and efficient transition with minimal disruption to your business operations."
      />

      <section className="bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-9 xl:mt-20 px-4 xl:px-0 max-w-[900px] mx-auto"
        >
          <WhyChoose title="Our Data Centre Setup and Relocation Services?" />
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
              Our Data Centre Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
            {[
              {
                title: 'Data Centre Design and Setup',
                description:
                  'Design and implement a data centre that meets your business requirements, including power, cooling, and network infrastructure.',
              },
              {
                title: 'Data Centre Relocation',
                description:
                  'Plan and execute the relocation of your data centre with minimal disruption, ensuring all equipment and data are securely transferred.',
              },
              {
                title: 'Migration Services',
                description:
                  'Seamlessly migrate your data and applications to the new data centre, ensuring continuity and integrity.',
              },
              {
                title: 'Asset Management',
                description:
                  'Manage and track all data centre assets, ensuring they are properly accounted for and securely relocated.',
              },
              {
                title: 'Testing and Validation',
                description:
                  'Conduct thorough testing and validation to ensure all systems are operational and meet performance standards.',
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
              <span className="text-[#0452D8]">Our Data Centre Setup and Relocation Services</span>
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
        title="Get Started with Malifax Data Centre Services"
        description="Transform your data centre with our comprehensive setup and relocation services. Contact us today to learn more about how we can help you achieve a seamless and efficient data centre transition."
        buttonText="Contact us now!"
        buttonLink="/contact"
        />
      </motion.div>
      
      <Footer />
    </div>
  );
}
