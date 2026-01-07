import React from 'react';
import Image from 'next/image';
import SolutionHero from '../../components/solutions/SolutionHero';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import WhyChoose from '../../components/solutions/WhyChoose';
import GridSection from '../../components/solutions/GridSection';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';
import AccessSystemItem from '../../components/AccessSystemItem';
import LogoGrid from '@/app/components/solutions/LogoGrid';

export default function VoiceSolutionsPage() {
  const gridItems = [
    { title: "Flexibility", description: "Choose between cloud-based and on-premise solutions to best fit your business requirements." },
    { title: "Scalability", description: "Easily scale your voice services as your business grows, without the need for significant infrastructure changes." },
    { title: "Advanced Features", description: "Benefit from features like call routing, voicemail, conferencing, and integration with other business applications." },
    { title: "Cost-Efficiency", description: "Reduce costs with our competitive pricing models and eliminate the need for expensive hardware with cloud solutions." },
    { title: "Reliability", description: "Enjoy high-quality, reliable voice services with minimal downtime and robust support." },
  ];

  return (
    <div className="min-h-screen">
      <SolutionHero 
        imageSrc="/imgs/solution/voice-solutions.png"
        title="Voice Solutions"
      />

      <ContentHeaderSection
        title="Voice Solutions (Cloud & On-Premise)"
        description="At Malifax Technologies, we offer versatile voice solutions that cater to the unique needs of your business. Whether you prefer a cloud-based system or an on-premise setup, our solutions ensure seamless communication, enhanced collaboration, and robust security."
      />
       <section className="bg-white">
        <div className="mt-9 xl:mt-18 px-4 xl:px-0 max-w-[900px] mx-auto">   
          <WhyChoose title="Our Managed Services?" />
        </div>
      </section>

      <GridSection items={gridItems} />


      {/* Our Managed Services Section */}
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
          <div className="text-center mb-16">
            <h2 className="text-[30px] lg:text-[60px] font-semibold text-center font-plus-jakarta text-[#0452D8] leading-[38px] lg:leading-[72px] tracking-[-1.2px]">
              Our Voice Services
            </h2>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
            {/* Row 1 */}
            <AccessSystemItem
              title="Cloud-Based VoIP"
              description="Leverage the power of the cloud with our VoIP solutions, offering flexibility, scalability, and advanced features without the need for on-site hardware."
            />
            <AccessSystemItem
              title="On-Premise PBX"
              description="Implement a traditional on-premise PBX system that provides full control over your voice infrastructure and customizable features."
            />
            {/* Row 2 */}
            <AccessSystemItem
              title="Hybrid Solutions"
              description="Combine the best of both worlds with our hybrid solutions, integrating cloud and on-premise systems for maximum flexibility and reliability."
            />
            <AccessSystemItem
              title="Unified Communications"
              description="Integrate voice, video, messaging, and collaboration tools into a single, cohesive platform to enhance productivity and communication."
            />
            {/* Row 3 */}
            <AccessSystemItem
              title="Support and Maintenance"
              description="Receive ongoing support and maintenance to ensure your voice systems are always operational and up-to-date."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white">
        <div className="flex flex-col xl:flex-row w-full max-w-[1194px] mx-auto pt-20 xl:pt-[80px] items-start gap-9 xl:gap-[135px] px-4 xl:px-0">
          {/* Left Side - Title */}
          <div className="w-full xl:w-auto xl:max-w-[355px] mb-8 xl:mb-0">
            <h2 className="text-[30px] xl:text-[60px] font-semibold text-center xl:text-left font-plus-jakarta leading-[38px] xl:leading-[72px] tracking-[-1.2px]">
              <span className="text-[#0452D8]">Benefits of</span>{" "}
              <span className="text-[#181D27]">Our Voice Solutions</span>
            </h2>
          </div>
          
          {/* Right Side - Benefits Cards Grid */}
          <div className="w-full xl:w-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
              <AccessSystemItem
                title="Enhanced Communication"
                description="Improve internal and external communication with high-quality voice services."
              />
              <AccessSystemItem
                title="Increased Productivity"
                description="Boost productivity with advanced features and seamless integration with other business tools."
              />
              <AccessSystemItem
                title="Cost Savings"
                description="Reduce operational costs with our cost-effective voice solutions."
              />
              <AccessSystemItem
                title="Future-Proofing"
                description="Stay ahead of technological advancements with our up-to-date voice solutions."
              />
              <AccessSystemItem
                title="Peace of Mind"
                description="Enjoy peace of mind knowing that your voice infrastructure is secure, reliable, and supported by experts."
              />
            </div>
          </div>
        </div>
      </section>

      {(() => {
        const iconsDesktop = [
          { position: 3, src: '/svgs/solution/voice-i1.svg', alt: 'Logo 1', size: 1 },
          { position: 9, src: '/svgs/solution/voice-i2.svg', alt: 'Logo 2', size: 2 },
          { position: 13, src: '/svgs/solution/voice-i3.svg', alt: 'Logo 3', size: 2 },
          { position: 17, src: '/svgs/solution/voice-i4.svg', alt: 'Logo 4', size: 2 },
          { position: 22, src: '/svgs/solution/voice-i5.svg', alt: 'Logo 5', size: 1 },
          { position: 27, src: '/svgs/solution/voice-i6.svg', alt: 'Logo 6', size: 2 },
          { position: 32, src: '/svgs/solution/voice-i7.svg', alt: 'Logo 7', size: 2 },
        ];
        const iconsMobile = [
          { position: 5, src: '/svgs/solution/voice-i1.svg', alt: 'Logo 1', size: 1 },
          { position: 0, src: '/svgs/solution/voice-i2.svg', alt: 'Logo 2', size: 2 },
          { position: 13, src: '/svgs/solution/voice-i3.svg', alt: 'Logo 3', size: 2 },
          { position: 18, src: '/svgs/solution/voice-i4.svg', alt: 'Logo 4', size: 2 },
          { position: 9, src: '/svgs/solution/voice-i5.svg', alt: 'Logo 5', size: 1 },
          // { position: 25, src: '/svgs/solution/voice-i6.svg', alt: 'Logo 6', size: 2 },
          { position: 25, src: '/svgs/solution/voice-i7.svg', alt: 'Logo 7', size: 2 },
        ];
        return (
          <>
            <div className="hidden xl:block">
              <LogoGrid
                icons={iconsDesktop}
                containerClassName="mt-[48px] mb-14 xl:mt-[81px] mb-[29px] xl:mb-[72px]"
              />
            </div>
            <div className="block xl:hidden">
              <LogoGrid
                icons={iconsMobile}
                totalSlots={27}
                containerClassName="mt-[48px] mb-14 xl:mt-[81px] mb-[29px] xl:mb-[72px]"
              />
            </div>
          </>
        );
      })()}


      <CTABanner
        title="Get Started with Malifax Technologies Managed Services"
        description="Transform your business with our comprehensive managed services. Contact us today to learn more about how we can help you optimize your IT infrastructure and focus on your core business activities."
        buttonText="Contact us now!"
        buttonLink="/contact"
      />
      
      <Footer />
    </div>
  );
}
