"use client";
import React from 'react';
import SolutionCard from './SolutionCard';

const services = [
  {
    icon: 'business-continuity',
    title: 'Business Continuity & Disaster Recovery',
    description:
      'Robust BCDR solutions to safeguard operations and ensure rapid recovery from incidents.',
  },
  {
    icon: 'cctv-door-access',
    title: 'CCTV & Door Access',
    description:
      'Comprehensive surveillance and access control to protect your people and assets.',
  },
  {
    icon: 'cyber-security',
    title: 'Cyber Security',
    description:
      'End-to-end protection, monitoring, and response to keep your business secure.',
  },
  {
    icon: 'enterprise-cloud',
    title: 'Enterprise Cloud',
    description:
      'Flexible, scalable, and secure cloud platforms tailored for your workloads.',
  },
  {
    icon: 'it-infrastructure',
    title: 'IT Infrastructure Services',
    description:
      'Design, deploy, and optimize resilient on-prem and hybrid infrastructure.',
  },
  {
    icon: 'managed-services',
    title: 'Managed Services',
    description:
      'Proactive monitoring and support to maximize uptime and performance.',
  },
  {
    icon: 'network-wifi',
    title: 'Network infrastructure & Enterprise WiFi',
    description:
      'High‑performance wired and wireless networking for modern enterprises.',
  },
  {
    icon: 'voice-solutions',
    title: 'Voice Solutions (CLOUD / ON-PREM)',
    description:
      'Reliable cloud and on‑prem telephony with advanced collaboration features.',
  },
];

import { motion } from 'framer-motion';

export default function SolutionCarousel() {
  return (
    <div className="relative mt-8">
      <div className="max-w-[1440px] w-full mx-auto">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 xl:gap-8 max-w-[1440px] px-4 md:px-0 items-stretch">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SolutionCard
                  {...service}
                  isActive={true}
                  href={
                    service.icon === 'business-continuity' ? '/solutions/business-continuity' :
                      service.icon === 'cctv-door-access' ? '/solutions/cctv-door-access' :
                        service.icon === 'cyber-security' ? '/solutions/cyber-security' :
                          service.icon === 'enterprise-cloud' ? '/solutions/enterprise-cloud' :
                            service.icon === 'it-infrastructure' ? '/solutions/it-infrastructure' :
                              service.icon === 'managed-services' ? '/solutions/managed-services' :
                                service.icon === 'network-wifi' ? '/solutions/networking-wifi' :
                                  service.icon === 'voice-solutions' ? '/solutions/voice-solutions' :
                                    '#'
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
