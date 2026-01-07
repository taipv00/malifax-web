"use client";
import HeroBackground from "../components/HeroBackground";
import Tag from "../components/Tag";
import Title from "../components/Title";
import Image from "next/image";
import AccessSystemItem from "../components/AccessSystemItem";
import ServicesList from "../components/about/ServicesList";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <>
      <HeroBackground>
        {/* Hero Section */}
        <section className="relative min-h-screen xl:min-h-[1024px]">
          {/* Tag and Title - Responsive positioning and sizing */}
          <div className="flex flex-col absolute w-full top-[223px] xl:top-[274px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex flex-col justify-center items-center gap-4"
            >
              <Tag text="TECHNOLOGY AND SOFTWARE" />
              <Title>About Us</Title>
            </motion.div>
          </div>
          
          {/* About Center Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.3 }}
              className="absolute   w-[287.66px] bottom-[-13px]  lg:w-[691.266px] lg:bottom-[-29px] left-1/2 transform -translate-x-1/2 z-50"
            >
              <Image
                src="/imgs/about-center-img.png"
                alt="About Center Image"
                width={691.266}
                height={471}
                className="w-full h-auto object-contain"
              />
            </motion.div>
        </section>
      </HeroBackground>

      {/* Welcome Section */}
      <section className="bg-white pt-20 mt-[14px] xl:mt-7 ">
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col items-center gap-9 w-full max-w-[1439px] mx-auto px-6">
          {/* Text Block 1 - Two lines of text */}
          <div className="flex flex-col items-start self-stretch">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="self-stretch text-center text-[#181D27] font-['Plus_Jakarta_Sans'] text-[60px] font-semibold leading-[72px] tracking-[-1.2px]"
            >
              Welcom to
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="self-stretch text-center text-[#0452D8] font-['Plus_Jakarta_Sans'] text-[60px] font-semibold leading-[72px] tracking-[-1.2px]"
            >
              Maxlifax Technologies!
            </motion.div>
          </div>
          
          {/* Description Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[1194px] text-center text-[#181D27] font-['Plus_Jakarta_Sans'] text-lg font-normal leading-7"
          >
            Since 1985, we've been at the forefront of innovation, transforming from a system integrator into a leader in mobility, data communication, and networking solutions. Our mission is to empower businesses with cutting-edge technology that drives efficiency, enhances security, fosters growth, and promotes sustainability.
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center gap-9 w-full max-w-[375px] mx-auto px-4">
          {/* Text Block 1 - Two lines of text */}
          <div className="flex flex-col items-center self-stretch w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="self-stretch text-center text-[#181D27] font-['Plus_Jakarta_Sans'] text-[30px] font-semibold leading-[38px]"
            >
              Welcom to
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="self-stretch text-center text-[#0452D8] font-['Plus_Jakarta_Sans'] text-[30px] font-semibold leading-[38px]"
            >
              Maxlifax Technologies!
            </motion.div>
          </div>
          
          {/* Description Block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="self-stretch text-center text-[#181D27] font-['Plus_Jakarta_Sans'] text-sm font-normal leading-5"
          >
            Since 1985, we've been at the forefront of innovation, transforming from a system integrator into a leader in mobility, data communication, and networking solutions. Our mission is to empower businesses with cutting-edge technology that drives efficiency, enhances security, fosters growth, and promotes sustainability.
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white pt-20 relative">
        {/* Striped Backgrounds - left and right */}
        <div
          className="hidden xl:block absolute left-0 top-48 bottom-0 w-[50vw] z-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage: 'url(/imgs/service-card-bg.png)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '529.548px 529px',
            backgroundPosition: 'left center',
          }}
        />
        <div
          className="hidden xl:block absolute right-0 top-48 bottom-0 w-[50vw] z-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage: 'url(/imgs/service-card-bg.png)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '529.548px 529px',
            backgroundPosition: 'right center',
          }}
        />
        <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-[1440px] mx-auto px-4 xl:px-6">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center font-['Plus_Jakarta_Sans'] text-[30px] font-semibold leading-[38px] xl:text-[60px] xl:leading-[72px] xl:tracking-[-2%]"
          >
            Our <span className="text-[#0452D8]">Core Values</span>
          </motion.div>
          
          {/* Core Values Cards */}
          <div className="mt-10 grid grid-cols-1 xl:grid-cols-2  gap-4 xl:gap-8 max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.0 }}>
              <AccessSystemItem
              title="Innovation"
              description="Always ahead of the curve, embracing the latest technological advancements."
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>
              <AccessSystemItem
              title="Reliability"
              description="Dependable solutions that ensure your business runs smoothly."
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <AccessSystemItem
              title="Customer Focus"
              description="Tailored solutions that exceed expectations."
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <AccessSystemItem
              title="Integrity"
              description="Transparent and honest in all our dealings."
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <AccessSystemItem
              title="Excellence"
              description="Committed to delivering top-notch products and services."
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}>
              <AccessSystemItem
              title="Sustainability"
              description="Dedicated to implementing eco-friendly practices and solutions that reduce environmental impact."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="bg-white pt-20">
        <div className="flex flex-col justify-center items-center w-full max-w-[1440px] mx-auto px-4 xl:px-6">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center font-['Plus_Jakarta_Sans'] text-[30px] font-semibold leading-[38px] text-[#181D27] xl:text-[60px] xl:leading-[72px] xl:tracking-[-2%]"
          >
            What We Offer
          </motion.div>
          
          {/* Services List */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className=" mt-6 xl:mt-[54px]">
            <ServicesList items={[
              {
                image: "/imgs/about/cloud-solutions.png",
                title: "Cloud Solutions",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/business-continuity.png",
                title: "IT Business Continuity & Disaster Recovery",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/cctv-security.png",
                title: "CCTV & Door Access Systems",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/it-infrastructure.png",
                title: "IT Infrastructure Services",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/networking-wifi.png",
                title: "Networking & Enterprise Wi-Fi",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/voice-solutions.png",
                title: "Voice Solutions (Cloud & On-Premise)",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/data-center.png",
                title: "Data Centre Setup & Relocation",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/hardware-maintenance.png",
                title: "Hardware Maintenance",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/laptop-repair.png",
                title: "Laptop Repair",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/equipment-rental.png",
                title: "Equipment Rental",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              },
              {
                image: "/imgs/about/structured-cabling.png",
                title: "Structured Cabling",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              }
            ]              } />
          </motion.div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="bg-white mt-20 relative">
          {/* Mobile Layout */}
          <div className="xl:hidden">
            {/* Top Image */}
            <div className="flex justify-start -mb-[22px]">
              <Image
                src="/imgs/about/left-commitment.png"
                alt="Top Commitment"
                width={196}
                height={356}
                className="w-[196px] h-[356px] object-contain"
              />
            </div>
            
            {/* Content */}
            <div className="flex flex-col w-full max-w-[861px] mx-auto items-center gap-9 px-4">
              {/* Title */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center font-['Plus_Jakarta_Sans'] text-[30px] font-semibold leading-[38px] text-[#181D27]">
                Our <span className="text-[#0452D8]">Commitment</span>
              </motion.div>
              
              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="self-stretch text-center text-[#181D27] font-['Plus_Jakarta_Sans'] text-sm font-normal leading-5">
                We are dedicated to providing business solutions that ensure the highest level of reliability, compatibility, and performance. Always at the forefront of technology, we enable the convergence of data, voice, and video through integrated wireless technology and cloud platforms. We are also committed to sustainability, implementing eco-friendly practices and solutions to reduce our environmental footprint.
              </motion.div>
            </div>
            
            {/* Bottom Image */}
            <div className="flex justify-end mt-8">
              <Image
                src="/imgs/about/right-commitment.png"
                alt="Bottom Commitment"
                width={196}
                height={356}
                className="w-[196px] h-[356px] object-contain"
              />
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden xl:block">
            {/* Left Image */}
            <div className="absolute left-0 top-0">
              <Image
                src="/imgs/about/left-commitment.png"
                alt="Left Commitment"
                width={392}
                height={712}
                className="w-[392px] h-[712px] object-contain"
              />
            </div>
            
            {/* Right Image */}
            <div className="absolute right-0 top-0">
              <Image
                src="/imgs/about/right-commitment.png"
                alt="Right Commitment"
                width={392}
                height={712}
                className="w-[392px] h-[712px] object-contain"
              />
            </div>
            
            {/* Content */}
            <div className="flex flex-col w-full max-w-[861px] pt-[196px] mx-auto items-center gap-9 relative z-10">
              {/* Title */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center font-['Plus_Jakarta_Sans'] text-[60px] font-semibold leading-[72px] tracking-[-2%] text-[#181D27]">
                Our <span className="text-[#0452D8]">Commitment</span>
              </motion.div>
              
              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="self-stretch text-center text-[#181D27] font-['Plus_Jakarta_Sans'] text-lg font-normal leading-7">
                We are dedicated to providing business solutions that ensure the highest level of reliability, compatibility, and performance. Always at the forefront of technology, we enable the convergence of data, voice, and video through integrated wireless technology and cloud platforms. We are also committed to sustainability, implementing eco-friendly practices and solutions to reduce our environmental footprint.
              </motion.div>
            </div>
          </div>
        </section>

        {/* Regional Presence Section */}
        <section className="pt-20 xl:mt-[192px]">
          <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 items-center gap-9">
            {/* Section Heading */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center font-['Plus_Jakarta_Sans'] text-[30px] font-semibold leading-[38px] text-[#181D27] xl:text-[60px] xl:leading-[72px] xl:tracking-[-2%]">
            Regional Presence
          </motion.div>
            
            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="self-stretch text-center text-[#181D27] font-['Plus_Jakarta_Sans'] text-sm font-normal leading-5 xl:text-lg xl:leading-7">
              With operations in Singapore and Indonesia, we support regional data communication needs, backed by strong partnerships with leading telecommunication service providers.
            </motion.div>

            {/* Indonesia Office Address */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center text-[#181D27] font-['Plus_Jakarta_Sans'] text-sm leading-6 xl:text-base">
              <div className="font-semibold">PT. Malifax Indonesia</div>
              <div>Graha Prima Building</div>
              <div>Jl. Cideng Barat No. 79</div>
              <div>Jakarta Pusat 10150</div>
              <div>+62 21 385 9668 - 9</div>
            </motion.div>
          </div>
        </section>

        {/* Regional Image Section */}
        <section>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex justify-center">
            <Image
              src="/imgs/about/regional.png"
              alt="Regional Presence"
              width={1200}
              height={600}
              className="w-full max-w-[1200px] h-auto object-contain"
            />
          </motion.div>
        </section>

        {/* CTA Banner */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <CTABanner
          title="Connect with Us"
          description={[
            "Explore our website to learn more about our services. Contact us today to discuss your technology needs and discover how Malifax Technologies can be your trusted technology partner."
          ]}
          buttonText="Contact us now!"
          buttonLink="/contact"
          />
        </motion.div>

        {/* Footer */}
        <Footer />
      </>
    );
  } 