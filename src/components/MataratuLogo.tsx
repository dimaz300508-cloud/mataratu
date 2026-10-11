import React from 'react';

interface MataratuLogoProps {
  className?: string;
  size?: number | string;
}

export const MataratuLogo: React.FC<MataratuLogoProps> = ({ 
  className = "w-12 h-12", 
  size 
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg 
      viewBox="0 0 500 500" 
      className={`inline-block select-none ${className}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo Resmi MATARATU - Teknik Pertambangan Batubara"
    >
      <defs>
        {/* Drop shadow for sharp depth */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
        </filter>

        {/* Circular path for top arched text */}
        <path 
          id="textArcTop" 
          d="M 105,250 A 145,145 0 0,1 395,250" 
          fill="none" 
        />
        {/* Circular path for bottom arched text */}
        <path 
          id="textArcBottom" 
          d="M 385,250 A 135,135 0 0,1 115,250" 
          fill="none" 
        />
      </defs>

      <g filter="url(#logoShadow)">
        {/* 8 Curved Sawtooth / Bucket-Wheel Gear Blades */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 250 250)`}>
            <path
              d="M 250,75 C 275,60 305,50 335,45 C 315,90 285,120 250,135 Z"
              fill="#FDE047"
              stroke="#CA8A04"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>
        ))}

        {/* Outer Red Ring behind the ribbon */}
        <circle 
          cx="250" 
          cy="250" 
          r="168" 
          fill="none" 
          stroke="#DC2626" 
          strokeWidth="6" 
        />

        {/* Blue Ribbon Ring */}
        <circle 
          cx="250" 
          cy="250" 
          r="156" 
          fill="#8BE0E8" 
          stroke="#0284C7" 
          strokeWidth="3.5" 
        />

        {/* Inner Green Field */}
        <circle 
          cx="250" 
          cy="250" 
          r="120" 
          fill="#9ADE43" 
          stroke="#15803D" 
          strokeWidth="3" 
        />

        {/* Arched Text: TEKNIK PERTAMBANGAN BATUBARA (Top) */}
        <text 
          fill="#0F172A" 
          fontSize="17" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          letterSpacing="2.5px"
        >
          <textPath 
            href="#textArcTop" 
            startOffset="50%" 
            textAnchor="middle"
          >
            TEKNIK PERTAMBANGAN BATUBARA
          </textPath>
        </text>

        {/* Arched Text: MATARATU (Bottom) */}
        <text 
          fill="#0F172A" 
          fontSize="22" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          letterSpacing="4px"
        >
          <textPath 
            href="#textArcBottom" 
            startOffset="50%" 
            textAnchor="middle"
          >
            MATARATU
          </textPath>
        </text>

        {/* Inner Masked Mining Emblem: Coal Seam + Stylized TPB Machine */}
        <g clipPath="url(#innerCircleClip)">
          {/* Inner clip circle */}
          <clipPath id="innerCircleClip">
            <circle cx="250" cy="250" r="118" />
          </clipPath>

          {/* Solid Black Coal Seam (Lapisan Batubara) at bottom */}
          <rect 
            x="130" 
            y="312" 
            width="240" 
            height="60" 
            fill="#111827" 
          />

          {/* Red Machine Base/Sled of TPB */}
          <rect 
            x="195" 
            y="290" 
            width="110" 
            height="18" 
            rx="9" 
            fill="#DC2626" 
            stroke="#7F1D1D" 
            strokeWidth="2" 
          />

          {/* Stylized Red 'TPB' Shovel Machine Graphic */}
          {/* The Outer Red Contour of T and Excavator Boom */}
          <path
            d="M 235,160 
               L 300,160 
               C 320,160 330,172 330,188 
               C 330,202 320,212 305,214 
               C 322,216 332,228 332,246 
               C 332,266 318,278 295,278 
               L 260,278 
               L 260,215 
               L 245,215 
               L 245,278 
               L 225,278 
               L 225,215 
               L 185,240 
               L 170,225 
               L 215,188 
               L 215,160 
               Z"
            fill="#E11D48"
            stroke="#9F1239"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Inner cutout cavities for P and B loops */}
          <rect x="272" y="172" width="28" height="26" rx="4" fill="#9ADE43" stroke="#9F1239" strokeWidth="2.5" />
          <rect x="272" y="226" width="30" height="34" rx="4" fill="#9ADE43" stroke="#9F1239" strokeWidth="2.5" />
          
          {/* Machine Boom Inner Triangle */}
          <polygon points="195,225 215,198 215,225" fill="#9ADE43" stroke="#9F1239" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
};
