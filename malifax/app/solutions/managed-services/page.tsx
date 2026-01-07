import React from 'react';
import Image from 'next/image';
import SolutionHero from '../../components/solutions/SolutionHero';
import ContentHeaderSection from '../../components/solutions/ContentHeaderSection';
import WhyChoose from '../../components/solutions/WhyChoose';
import GridSection from '../../components/solutions/GridSection';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';
import AccessSystemItem from '../../components/AccessSystemItem';

export default function ManagedServicesPage() {
  const gridItems = [
    { title: "Expertise", description: "Gain access to a team of experienced IT professionals who provide proactive management and support." },
    { title: "Cost-Efficiency", description: "Reduce operational costs with our predictable, flat-rate pricing model." },
    { title: "Scalability", description: "Easily scale your IT services to match the growth and changing needs of your business." },
    { title: "Proactive Monitoring", description: "Continuous monitoring of your IT environment to detect and resolve issues before they impact your operations." },
    { title: "Enhanced Security", description: "Protect your IT infrastructure with our advanced security measures and compliance-focused solutions." }
  ];

  return (
    <div className="min-h-screen">
      <SolutionHero 
        imageSrc="/imgs/solution/managed-services.png"
        title="Managed Services"
      />

      <ContentHeaderSection
        title="Managed Services"
        description="At Malifax Technologies, we understand that managing IT infrastructure can be complex and time-consuming. Our Managed Services are designed to take the burden off your shoulders, allowing you to focus on your core business activities while we handle your IT needs."
      />

      {/* Why Choose Section */}
      <section className="bg-white">
        <div className="mt-9 xl:mt-20 px-4 xl:px-0 max-w-[1194px] mx-auto">
          <WhyChoose title="Our Managed Services?" />
        </div>
      </section>

      <GridSection items={gridItems} />

      {/* Our Managed Services Section */}
      <section className="mt-20 relative">
        {/* Striped Backgrounds - left and right like Home Services */}
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
              Our Managed Services
            </h2>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
            {/* Row 1 */}
            <AccessSystemItem
              title="Network Management"
              description="Ensure your network is always up and running with our comprehensive network management services."
            />
            <AccessSystemItem
              title="Server Management"
              description="Maintain optimal performance and availability of your servers with our proactive server management solutions."
            />
            {/* Row 2 */}
            <AccessSystemItem
              title="Cloud Management"
              description="Manage and optimize your cloud environments for enhanced performance and cost-efficiency."
            />
            <AccessSystemItem
              title="Endpoint Management"
              description="Secure and manage all endpoint devices, including desktops, laptops, and mobile devices."
            />
            {/* Row 3 */}
            <AccessSystemItem
              title="Backup and Disaster Recovery"
              description="Protect your data and ensure quick recovery with our reliable backup and disaster recovery solutions."
            />
            <AccessSystemItem
              title="Help Desk Support"
              description="Provide your employees with 24/7 access to our help desk for prompt resolution of IT issues."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white mb-[35px]">
        <div className="flex flex-col xl:flex-row w-full max-w-[1194px] mx-auto pt-20 xl:pt-[80px] items-start gap-9 xl:gap-[135px] px-4 xl:px-0">
          {/* Left Side - Title */}
          <div className="w-full xl:w-auto xl:max-w-[355px] mb-8 xl:mb-0">
            <h2 className="text-[30px] xl:text-[60px] font-semibold text-center xl:text-left font-plus-jakarta leading-[38px] xl:leading-[72px] tracking-[-1.2px]">
              <span className="text-[#0452D8]">Benefits of</span>{" "}
              <span className="text-[#181D27]">Our Managed Services</span>
            </h2>
          </div>
          
          {/* Right Side - Benefits Cards Grid */}
          <div className="w-full xl:w-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 place-items-center xl:place-items-stretch">
              <AccessSystemItem
                title="Improved Performance"
                description="Enhance the performance and reliability of your IT systems."
              />
              <AccessSystemItem
                title="Reduced Downtime"
                description="Minimize downtime with proactive monitoring and quick issue resolution."
              />
              <AccessSystemItem
                title="Increased Productivity"
                description="Allow your team to focus on strategic initiatives rather than day-to-day IT management."
              />
              <AccessSystemItem
                title="Future-Proofing"
                description="Stay ahead of technological advancements with our up-to-date IT solutions and expertise."
              />
              <AccessSystemItem
                title="Peace of Mind"
                description="Enjoy peace of mind knowing that your IT infrastructure is in capable hands."
              />
            </div>
          </div>
        </div>
      </section>

      <CTABanner 
        title="Get Started with Malifax Technologies Managed Services"
        description="Transform your IT operations with our comprehensive Managed Services. Contact us today to learn more about how we can help you achieve your business goals with reliable and efficient IT management."
        buttonText="Contact us now!"
        buttonLink="/contact"
      />

      <Footer />
    </div>
  );
}
