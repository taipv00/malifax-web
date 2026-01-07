import React from 'react';
import SolutionItem from './SolutionItem';

const solutions = [
  {
    icon: 'business-continuity',
    text: 'Business Continuity & Disaster Recovery'
  },
  {
    icon: 'cctv-door-access',
    text: 'CCTV & Door Access'
  },
  {
    icon: 'cyber-security',
    text: 'Cyber Security'
  },
  {
    icon: 'enterprise-cloud',
    text: 'Enterprise Cloud'
  },
  {
    icon: 'it-infrastructure',
    text: 'IT Infrastructure Services'
  },
  {
    icon: 'managed-services',
    text: 'Managed Services'
  },
  {
    icon: 'network-wifi',
    text: 'Network infrastructure & Enterprise WiFi'
  },
  {
    icon: 'voice-solutions',
    text: 'Voice Solutions (CLOUD / ON-PREM)'
  }
];

export default function SolutionList() {
  return (
    <div className="flex justify-center mt-[150px] xl:mt-[46px]">
      <div className="inline-flex p-1.5 flex-col justify-center items-center gap-1.5 rounded-[22px] outline outline-1 outline-[#E9EAEB] bg-[#F5F5F5] md:inline-grid md:grid-cols-2 md:gap-1.5 xl:inline-grid xl:grid-cols-4 xl:gap-1.5">
        {solutions.map((solution, index) => (
          <SolutionItem
            key={index}
            icon={solution.icon}
            text={solution.text}
          />
        ))}
      </div>
    </div>
  );
}
