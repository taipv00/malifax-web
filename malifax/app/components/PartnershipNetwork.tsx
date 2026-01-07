import React from 'react';
import Image from 'next/image';

const PartnershipNetwork: React.FC = () => {
  // Calculate positions for companies in circles
  const centerX = 550;
  const centerY = 550;
  
  // 7 concentric circles with different radii
  const circles = [
    { radius: 90, hasCompanies: false },   // Circle 1: 180px diameter, no companies
    { radius: 167, hasCompanies: true },   // Circle 2: 90 + 77 = 167
    { radius: 239, hasCompanies: false },  // Circle 3: 167 + 72 = 239
    { radius: 318, hasCompanies: true },   // Circle 4: 239 + 79 = 318
    { radius: 391, hasCompanies: true },   // Circle 5: 318 + 73 = 391
    { radius: 455, hasCompanies: true },   // Circle 6: 391 + 64 = 455
    { radius: 511, hasCompanies: true }    // Circle 7: 455 + 56 = 511
  ];
  
      // Companies for ring 2 - only 3 companies
  const ring2Companies = [
    { name: "CISCO", logo: "CISCO", angle: 50, radius: 167 },
    { name: "FORTINET", logo: "FORTINET", angle: 220, radius: 167 },
    { name: "McAfee", logo: "McAfee", angle: 340, radius: 167 }
  ];
  
      // Companies for ring 4 - 2 companies
  const ring4Companies = [
    { name: "Partner 4-1", logo: "partner_4_1", angle: 120, radius: 318 },
    { name: "Partner 4-2", logo: "partner_4_2", angle: 340, radius: 318 }
  ];
  
      // Companies for ring 5 - 3 companies
  const ring5Companies = [
    { name: "Partner 5-1", logo: "partner_5_1", angle: 45, radius: 391 },
    { name: "Partner 5-2", logo: "partner_5_2", angle: 170, radius: 391 },
    { name: "Partner 5-3", logo: "partner_5_3", angle: 280, radius: 391 }
  ];
  
      // Companies for ring 6 - 1 company
  const ring6Companies = [
    { name: "Partner 6-1", logo: "partner_6_1", angle: 230, radius: 455 }
  ];
  
      // Companies for ring 7 - 5 companies
  const ring7Companies = [
    { name: "Partner 7-1", logo: "partner_7_1", angle: 30, radius: 511 },
    { name: "Partner 7-2", logo: "partner_7_2", angle: 120, radius: 511 },
    { name: "Partner 7-3", logo: "partner_7_3", angle: 200, radius: 511 },
    { name: "Partner 7-4", logo: "partner_7_4", angle: 256, radius: 511 },
    { name: "Partner 7-5", logo: "partner_7_5", angle: 328, radius: 511 }
  ];

  const round3 = (n: number) => Math.round(n * 1000) / 1000;
  const getPosition = (radius: number, angle: number) => {
    const radian = (angle * Math.PI) / 180;
    const x = round3(centerX + radius * Math.cos(radian));
    const y = round3(centerY + radius * Math.sin(radian));
    return { x, y };
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <svg width="1100" height="1100" viewBox="0 0 1100 1100" className="w-full h-auto">
        {/* Background */}
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ECF9FF', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Concentric circles - background first */}
        <g stroke="#D5EFFF" strokeWidth="1" fill="none">
          {circles.map((circle, index) => (
            <circle
              key={`circle-${index}`}
              cx={centerX}
              cy={centerY}
              r={circle.radius}
            />
          ))}
        </g>

        {/* All Companies on their respective rings */}
        {/* Ring 2 Companies */}
        {ring2Companies.map((company, index) => {
          const pos = getPosition(company.radius, company.angle);
          return (
            <g key={`ring2-${index}`}>
              {/* Logo circle with new styling */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="50"
                fill="#FDFDFD"
                stroke="#E9EAEB"
                strokeWidth="1"
                filter="drop-shadow(0px 24px 48px -12px #0A459E2E)"
              />
              {/* Company icon */}
              <foreignObject
                x={pos.x - 50}
                y={pos.y - 50}
                width="100"
                height="100"
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center'
                }}>
                    <Image
                        src={`/svgs/solution/partner${index + 1}.svg`}
                        alt={company.name}
                        width={86}
                        height={0}
                        quality={100}
                        unoptimized={true}
                   />
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Ring 4 Companies */}
        {ring4Companies.map((company, index) => {
          const pos = getPosition(company.radius, company.angle);
          return (
            <g key={`ring4-${index}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="50"
                fill="#FDFDFD"
                stroke="#E9EAEB"
                strokeWidth="1"
                filter="drop-shadow(0px 24px 48px -12px #0A459E2E)"
              />
              <foreignObject
                x={pos.x - 50}
                y={pos.y - 50}
                width="100"
                height="100"
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center'
                }}>
                  <Image
                    src={`/svgs/solution/${company.logo}.svg`}
                    alt={company.name}
                    width={86}
                    height={0}
                    quality={100}
                    unoptimized={true}
                  />
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Ring 5 Companies */}
        {ring5Companies.map((company, index) => {
          const pos = getPosition(company.radius, company.angle);
          return (
            <g key={`ring5-${index}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="50"
                fill="#FDFDFD"
                stroke="#E9EAEB"
                strokeWidth="1"
                filter="drop-shadow(0px 24px 48px -12px #0A459E2E)"
              />
              <foreignObject
                x={pos.x - 50}
                y={pos.y - 50}
                width="100"
                height="100"
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center'
                }}>
                  <Image
                    src={`/svgs/solution/${company.logo}.svg`}
                    alt={company.name}
                    width={86}
                    height={0}
                    quality={100}
                    unoptimized={true}
                  />
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Ring 6 Companies */}
        {ring6Companies.map((company, index) => {
          const pos = getPosition(company.radius, company.angle);
          return (
            <g key={`ring6-${index}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="50"
                fill="#FDFDFD"
                stroke="#E9EAEB"
                strokeWidth="1"
                filter="drop-shadow(0px 24px 48px -12px #0A459E2E)"
              />
              <foreignObject
                x={pos.x - 50}
                y={pos.y - 50}
                width="100"
                height="100"
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center'
                }}>
                  <Image
                    src={`/svgs/solution/${company.logo}.svg`}
                    alt={company.name}
                    width={86}
                    height={0}
                    quality={100}
                    unoptimized={true}
                  />
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Ring 7 Companies */}
        {ring7Companies.map((company, index) => {
          const pos = getPosition(company.radius, company.angle);
          return (
            <g key={`ring7-${index}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="50"
                fill="#FDFDFD"
                stroke="#E9EAEB"
                strokeWidth="1"
                filter="drop-shadow(0px 24px 48px -12px #0A459E2E)"
              />
              <foreignObject
                x={pos.x - 50}
                y={pos.y - 50}
                width="100"
                height="100"
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center'
                }}>
                  <Image
                    src={`/svgs/solution/${company.logo}.svg`}
                    alt={company.name}
                    width={86}
                    height={0}
                    quality={100}
                    unoptimized={true}
                  />
                </div>
              </foreignObject>
            </g>
          );
        })}


      </svg>
    </div>
  );
};

export default PartnershipNetwork;
