import React, { useState } from "react";

// Top Row - Social & Platforms (integrations we use)
const topRowLogos = [
  "/icons/notion.svg",
  "/icons/slack.svg",
  "/icons/airtable.svg",
  "/icons/google-calendar.svg",
  "/icons/outlook.svg",
  "/icons/chatgpt.svg",
  "/icons/postgresql.svg",
  "/icons/asana.svg",
  "/icons/figma.svg",
  "/icons/n8n.svg",
  "/icons/make.svg",
  "/icons/zapier.svg",
  "/icons/excel.svg",
  "/icons/discord.svg",
  "/icons/mailchimp.svg",
]

// Bottom Row, Global brands & enterprises, no food / drink brands
const bottomRowLogos = [
  "/icons/notion.svg",
  "/icons/slack.svg",
  "/icons/airtable.svg",
  "/icons/google-calendar.svg",
  "/icons/outlook.svg",
  "/icons/chatgpt.svg",
  "/icons/postgresql.svg",
  "/icons/asana.svg",
  "/icons/figma.svg",
  "/icons/n8n.svg",
  "/icons/make.svg",
  "/icons/zapier.svg",
  "/icons/excel.svg",
  "/icons/discord.svg",
  "/icons/mailchimp.svg",
];

// Single Logo Tile component
function LogoTile({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.name}
      className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-[#2A2A2C] to-[#1F1F21] border border-[#3B3C3E]/60 flex items-center justify-center"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}
    >
      {!imgError ? (
        <img
          src={item.logo}
          alt={item.name}
          className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : null}
    </a>
  );
}

// Smooth infinite scrolling row
function ScrollingRow({ logos, direction = "left", duration = 60 }) {
  return (
    <div className="relative overflow-hidden w-full py-3">
      {/* Subtle edge fades - positioned at extreme edges */}
      <div 
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: '60px',
          background: 'linear-gradient(to right, #1A1A1C 0%, #1A1A1C 20%, transparent 100%)'
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: '60px',
          background: 'linear-gradient(to left, #1A1A1C 0%, #1A1A1C 20%, transparent 100%)'
        }}
      />

      {/* Track with two copies for seamless loop */}
      <div
        className={`flex w-max ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex gap-5 sm:gap-6 lg:gap-8 pr-5 sm:pr-6 lg:pr-8">
          {logos.map((item, index) => (
            <LogoTile key={`${item.name}-main-${index}`} item={item} />
          ))}
        </div>
        <div className="flex gap-5 sm:gap-6 lg:gap-8 pr-5 sm:pr-6 lg:pr-8" aria-hidden="true">
          {logos.map((item, index) => (
            <LogoTile key={`${item.name}-dup-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Logo Carousel Section
export default function LogoCarouselSection() {
  return (
    <>
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .animate-scroll-left {
          animation-name: scrollLeft;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .animate-scroll-right {
          animation-name: scrollRight;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      <section className="overflow-hidden w-full">
        <div className="space-y-3 sm:space-y-4">
          <ScrollingRow logos={topRowLogos} direction="left" duration={80} />
          <ScrollingRow logos={bottomRowLogos} direction="right" duration={50} />
        </div>
      </section>
    </>
  );
}