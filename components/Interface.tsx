
import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, Calendar } from 'lucide-react';

interface InterfaceProps {
  isHoveringNode: boolean;
}

const PHRASES = [
  "So you want to change the world",
  "Build something that matters",
  "Maximize impact by Leveraging AI",
  "Work with high agency people",
  "And ethic comes first"
];

// Custom WhatsApp Icon
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.71.879-.13.15-.261.168-.486.056-.224-.112-.953-.351-1.815-1.12-6.711-.599-1.179-1.008-1.328-1.203-.15-.195-.016-.3.096-.412.1-.1.224-.261.336-.393.112-.13.149-.224.224-.374.075-.15.038-.281-.019-.393-.056-.113-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008c-.15 0-.393.056-.6.28-.206.225-.785.767-.785 1.871 0 1.104.803 2.17 .915 2.32.112.15 1.58 2.41 3.832 3.381 1.336.576 1.859.614 2.536.514.756-.111 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.15-.43-.262" />
  </svg>
)

export const Interface: React.FC<InterfaceProps> = ({ isHoveringNode }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (isHoveringNode) return;

    // 3 seconds rotation, 3 loops max
    // Total phrases = PHRASES.length
    // Max changes = PHRASES.length * 3
    const maxTicks = PHRASES.length * 3;
    let ticks = 0;

    const interval = setInterval(() => {
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        return;
      }
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHoveringNode]);

  // Left side text links
  const textLinks = [
    { label: 'Resume', href: 'https://www.notion.so/Resume-2b2176710091805a9e25e69a28785c50?source=copy_link' },
    { label: 'Publications', href: 'https://www.notion.so/Publications-2b217671009180ae9e81d2001d883667?source=copy_link' },
    { label: 'Academics', href: 'https://www.notion.so/Academics-2b217671009180f38131cee30fcfb8aa?source=copy_link' },
    { label: 'Interests', href: 'https://www.notion.so/Interests-2b217671009180fdbe6beff8add3ac5f?source=copy_link' },
  ];

  // Right side icon links
  const iconLinks = [
    { 
      icon: <Linkedin size={24} />, 
      href: 'https://www.linkedin.com/in/nylan-richard/',
      label: 'LinkedIn'
    },
    { 
      icon: <WhatsAppIcon size={24} />, 
      href: 'https://wa.me/33783772834',
      label: 'WhatsApp'
    },
    { 
      icon: <Mail size={24} />, 
      href: 'mailto:nylanrichard1@gmail.com',
      label: 'Mail'
    },
    { 
      icon: <Calendar size={24} />, 
      href: 'https://cal.com/nylan-richard-o26erk',
      label: 'Book a call'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 md:p-12 font-sans relative">
      {/* Center Text - Integrated into background with Carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full flex justify-center">
        {isHoveringNode ? (
          <a 
            href="mailto:nylanrichard1@gmail.com"
            className="pointer-events-auto cursor-pointer text-white text-sm md:text-base font-medium tracking-[0.2em] uppercase blur-none scale-105 transition-all duration-300 hover:scale-125 hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
          >
            let's work together
          </a>
        ) : (
          <div key={phraseIndex} className="flex flex-wrap justify-center max-w-2xl px-4 gap-x-[0.3em] gap-y-1">
            {PHRASES[phraseIndex].split(' ').map((word, i) => (
              <span 
                key={i} 
                className="word-animate text-neutral-400 text-sm md:text-base font-medium tracking-[0.2em] uppercase"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {word}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Top Left - Header */}
      <header className="flex justify-start items-start pointer-events-auto">
        <a 
          href="https://www.notion.so/Say-Hi-2b21767100918062816ec5167ce72368?source=copy_link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl md:text-5xl font-semibold tracking-tight text-white cursor-pointer transition-all duration-300 hover:scale-105"
        >
          Nylan Richard
        </a>
      </header>

      {/* Bottom Section */}
      <div className="flex justify-between items-end pointer-events-auto">
        
        {/* Bottom Left: Info & Text Links */}
        <div className="flex flex-col gap-6 w-full md:w-auto">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
              Paris - San Francisco
            </h2>
            <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed whitespace-normal md:whitespace-nowrap">
              AI Product builder. 0 to 1 operator turning complex ideas into systems.
            </p>
          </div>

          {/* Text Navigation Links */}
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {textLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <a 
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-white hover:text-gray-300 transition-colors uppercase tracking-wider relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
                {/* Separator */}
                {index < textLinks.length - 1 && (
                  <span className="text-white/30 font-light">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Bottom Right: Icon Links */}
        <div className="flex flex-col gap-6 items-center pb-1">
          {iconLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};
