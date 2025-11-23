import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, Calendar, X, ArrowRight, ArrowLeft } from 'lucide-react';

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

// Updated to reflect the new services for the button hover effect
const SERVICE_PHRASES = [
  "AI Engineering",
  "Product Strategy",
  "Revenue Ops",
  "Data Science",
  "Finance Strategy",
  "Tech Marketing"
];

// --- CONTENT DATA ---

const INTRO_TEXT = [
  "I launched four AI-native startups at OSS Ventures, a startup studio specialised in AI softwares in manufacturing, working closely with founders and seeing how early-stage companies operate, from validating problems to building prototypes, acquiring the first users, iterating under real constraints until reaching their PMF.",
  "I’ve also worked across different startup ecosystems, from San Francisco to Paris, building products with teams on several continents. My background spans data science, product execution and early-stage advisory, reinforced by earlier experience in private equity. This mix helps me understand both how companies build and how they scale in the age of AI.",
  "My approach for building meaningful outcomes blends technical depth, product expertise, and strategic clarity."
];

interface ContentSection {
  id: number;
  title: string;
  number: string;
  description: string[];
  deliverables?: string[];
  pastExperiences?: string[];
}

const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: 1,
    number: "01",
    title: "AI Engineering & Automation",
    description: [
      "I help teams operate at a higher strategic and execution level by designing Agentic AI systems that augment product, revenue, HR and finance workflows.",
      "Product teams iterate faster, sales teams identify the right leads sooner, hiring becomes more accurate, and strategic decisions are driven by real‑time insights rather than manual processes or guesswork."
    ],
    deliverables: [
      "Product Operating System powered by AI: ICP qualification, user research preparation, feedback synthesis, reporting, PRD drafting, and automated insight generation",
      "Sales systems: SDR coaching agents, sales‑call analysis, CRM enrichment, qualification workflows, and full-funnel automation",
      "HR systems: candidate scoring, interview analysis, talent insights, onboarding intelligence",
      "Finance systems: VC-style company analysis, automated reporting, dashboards, anomaly detection, and financial copilots",
      "AGI-inspired Agentic workflows across product, revenue, operations, HR, finance, and marketing",
      "LLM-powered internal copilots tailored to your proprietary knowledge base",
      "End-to-end automated pipelines using APIs, Zapier, n8n, Notion, Supabase"
    ]
  },
  {
    id: 2,
    number: "02",
    title: "Startup Building & Product Strategy",
    description: [
      "I support early‑stage founders and product teams across the full 0→1 cycle, from idea to prototype to MVP to early traction, with a strong focus on AI execution. This includes product strategy, MVP architecture, acquisition strategy, early growth systems, and recruitment for the first hires.",
      "Having launched several companies at OSS Ventures, a startup studio specialised in manufacturing ventures, I worked closely with world class founders to validate markets, build prototypes, design AI workflows, and prepare GTM. I bring hands‑on, repeatable experience of what it takes to move from concept to a real product used by real teams."
    ],
    deliverables: [
      "End-to-end 0→1 product advisory: idea shaping, opportunity sizing, strategic clarity",
      "Product operating frameworks: discovery, scoping, feature architecture, PRDs",
      "High-speed prototyping: interactive mockups, functional AI prototypes",
      "MVP design & execution with real workflows, user-facing AI, and clear success metrics",
      "Acquisition & growth foundations: ICP definition, early funnel setup, messaging, positioning",
      "Support on recruitment for first product/tech/growth hires",
      "Weekly product rituals and decision rhythm inspired by SF best teams"
    ]
  },
  {
    id: 3,
    number: "03",
    title: "Revenue Operations & Growth Systems",
    description: [
      "I help early‑stage teams achieve revenue traction faster by building AI Growth systems that support prospecting, lead qualification, meeting preparation, follow‑ups, and pipeline management.",
      "Having worked with multiple startups and founders at the very beginning of their journey, I understand the difficulty of getting the first clients, booking meetings, refining ICPs, and creating a repeatable acquisition engine.",
      "I’ve also built AI systems for Sales and Revenue teams across several organisations, and I advise founders on modern tools and growth frameworks."
    ],
    deliverables: [
      "End‑to‑end Revenue OS: CRM setup, automated workflows, dashboards, qualification logic",
      "AI‑powered prospecting: lead sourcing, outreach generation, sequencing, prioritisation",
      "ICP refinement & value‑based messaging for early traction",
      "AI systems for Sales coaching, meeting analysis, objection handling, and follow‑up drafting",
      "Pricing strategy and value‑based segmentation",
      "Lead scoring (LLM + ML signals), intent detection, and pipeline cleanliness",
      "Full-funnel optimisation for cold, warm, inbound, and partner channels"
    ]
  },
  {
    id: 4,
    number: "04",
    title: "Data Science & Machine Learning",
    description: [
      "I help founders and data-driven teams turn their data into growth levers and business decisions. Instead of academic ML for its own sake, I package data science into practical, insight‑driven analysis that directly supports product iteration, revenue strategy, and operational decision‑making.",
      "Founders get clear metrics, real behavioural patterns, and strategic recommendations they can act on immediately: whether to refine their product, optimise acquisition, price more intelligently, or understand churn."
    ],
    deliverables: [
      "Insight‑driven data analysis wrapped in ML: segmentation, behavioural patterns, retention signals",
      "Predictive modelling for real business outcomes (lead scoring, churn, revenue forecasting)",
      "Time-series forecasting for demand, volatility, KPIs, seasonality",
      "Strategic dashboards & decision frameworks for founders and operators",
      "Causal inference (DiD, regressions) & econometrics for strategic decisions",
      "ML experimentation, interpretation, and actionable insights for product & growth teams"
    ]
  },
  {
    id: 5,
    number: "05",
    title: "Finance & Strategy",
    description: [
      "I help founders and finance teams gain clarity and make sharper decisions by combining rigorous financial analysis, structured reporting, and operational discipline. I approach finance the way an engineer approaches a system: understand the inputs, isolate the real performance drivers, and build architectures that make the whole company more predictable and scalable."
    ],
    deliverables: [
      "P&L analysis, budgeting, forecasting",
      "Investment reporting & workflow automation",
      "Founder-friendly financial dashboards",
      "Strategic planning, scenario modelling, risk mapping",
      "Audit-level understanding of controls & financial integrity"
    ],
    pastExperiences: [
      "CFO in a healthcare startup in Australia, restructuring reporting flows and improving financial predictability",
      "Audited the accounting and P&L of 25+ companies, from SMBs to billion-dollar groups, strengthening my ability to detect weak signals and structural bottlenecks",
      "Managed financial performance across 50 business units in France, building unified reporting systems for clearer decision-making"
    ]
  },
  {
    id: 6,
    number: "06",
    title: "Technical Marketing & Thought-Leadership Writing",
    description: [
      "I turn complex topics, AI, ML, product, systems, into narratives that strengthen a founder’s authority and elevate how a company communicates. My work spans educational content, strategic writing, and public-facing thought leadership across platforms like LinkedIn, X, Medium, and company blogs.",
      "Brands and founders communicate with more clarity, attract higher-quality users and talent, and position themselves as credible, forward-thinking players, especially in markets where technical trust is a differentiator."
    ],
    deliverables: [
      "Website copy & product positioning for AI/tech companies, supported by clear narratives that build trust with users and investors.",
      "Deep-dive technical content: essays, research memos, explainers on AI agents, and ML systems.",
      "Product storytelling for feature launches and roadmap communication",
      "Executive ghostwriting (LinkedIn/X) for founders, helping them attract talent, communicate vision, and strengthen authority.",
      "Medium editorial strategy with educational content on AI, math, systems and product that makes complex ideas accessible.",
      "Internal knowledge bases & documentation (AI, product, data) that improve clarity, onboarding, and cross-team execution"
    ]
  }
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
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(null);
  
  // Button State
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [buttonText, setButtonText] = useState("LET'S WORK TOGETHER");

  // Reset selection when closing panel
  useEffect(() => {
    if (!isPanelOpen) {
      // Small delay to reset selection so it doesn't flicker during close animation
      const timer = setTimeout(() => setSelectedSection(null), 300);
      return () => clearTimeout(timer);
    }
  }, [isPanelOpen]);

  // Top Carousel Logic (Automatic, No Hover dependency)
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Button Carousel Logic (On Hover)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isHoveringButton) {
      let index = 0;
      // Start cycling through the services
      interval = setInterval(() => {
        if (index < SERVICE_PHRASES.length) {
          setButtonText(SERVICE_PHRASES[index]);
          index++;
        } else {
          // Stop at the last element
          clearInterval(interval);
        }
      }, 200); // Fast cycle
    } else {
      setButtonText("LET'S WORK TOGETHER");
    }

    return () => clearInterval(interval);
  }, [isHoveringButton]);

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
      
      {/* Side Panel Widget */}
      <div 
        className={`fixed inset-y-0 left-0 w-full md:w-[680px] bg-black/95 backdrop-blur-xl border-r border-white/10 p-8 md:p-16 z-50 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col pointer-events-auto shadow-2xl ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button 
          onClick={() => setIsPanelOpen(false)}
          className="self-end text-white/50 hover:text-white transition-colors mb-8 z-10"
        >
          <X size={32} />
        </button>

        {/* --- PANEL CONTENT CONTAINER --- */}
        <div className="relative flex-1 overflow-hidden">
          
          {/* 1. TABLE OF CONTENTS VIEW */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${selectedSection ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
            <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
              
              {/* Intro Text */}
              <div className="mb-12 space-y-4">
                {INTRO_TEXT.map((paragraph, i) => (
                  <p key={i} className="text-white/70 font-light leading-relaxed text-sm md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <nav className="space-y-6">
                {CONTENT_SECTIONS.map((section) => (
                  <div 
                    key={section.id} 
                    onClick={() => setSelectedSection(section)}
                    className="group cursor-pointer py-2 border-b border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between text-xl md:text-2xl font-light text-white group-hover:text-white/80 transition-colors">
                      <span className="flex items-baseline gap-4">
                        <span className="text-white/30 text-base font-mono">{section.number}</span>
                        {section.title}
                      </span>
                      <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-white/50" size={20} />
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-8">
                {iconLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 transition-transform duration-300 hover:scale-110"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. DETAIL VIEW */}
          <div className={`absolute inset-0 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${selectedSection ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            
            <button 
              onClick={() => setSelectedSection(null)}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 group w-fit"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="uppercase tracking-wider text-sm">Back</span>
            </button>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar pb-12">
              {selectedSection && (
                <div className="animate-turnstileIn">
                  <span className="text-white/30 font-mono text-sm block mb-2">{selectedSection.number}</span>
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-8 leading-tight">
                    {selectedSection.title}
                  </h2>

                  <div className="space-y-6 mb-10">
                    {selectedSection.description.map((p, i) => (
                      <p key={i} className="text-white/80 font-light leading-relaxed text-base md:text-lg">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Deliverables / "What I deliver" */}
                  {selectedSection.deliverables && (
                    <div className="mb-10">
                      <h3 className="text-white text-lg font-medium mb-4 border-l-2 border-white pl-3">What I deliver</h3>
                      <ul className="space-y-3">
                        {selectedSection.deliverables.map((item, i) => (
                          <li key={i} className="text-white/60 font-light text-sm md:text-base flex items-start gap-3">
                            <span className="block w-1.5 h-1.5 bg-white/40 rounded-full mt-2 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Past Experiences (Only for Section 5 technically, but flexible) */}
                  {selectedSection.pastExperiences && (
                    <div className="mb-10">
                      <h3 className="text-white text-lg font-medium mb-4 border-l-2 border-white pl-3">Past experiences</h3>
                      <ul className="space-y-3">
                        {selectedSection.pastExperiences.map((item, i) => (
                          <li key={i} className="text-white/60 font-light text-sm md:text-base flex items-start gap-3">
                            <span className="block w-1.5 h-1.5 bg-white/40 rounded-full mt-2 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Overlay Backdrop for Panel */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 pointer-events-none ${isPanelOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsPanelOpen(false)}
        style={{ pointerEvents: isPanelOpen ? 'auto' : 'none' }}
      />

      {/* Center Section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full flex justify-center z-20">
        <div className="flex flex-col items-center gap-4">
          
          <style>{`
            .text-shimmer {
              background: linear-gradient(110deg, rgba(255,255,255,0.8) 40%, #ffffff 50%, rgba(255,255,255,0.8) 60%);
              background-size: 200% auto;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: shimmer 2s linear infinite;
            }
            @keyframes shimmer {
              to { background-position: 200% center; }
            }
          `}</style>

          {/* Automatic Carousel (Standard Text) */}
          <div className="cursor-default py-2 px-8 min-h-[3rem] flex items-center justify-center">
            <div key={phraseIndex} className="flex flex-wrap justify-center max-w-4xl gap-x-[0.3em] gap-y-1 items-center text-center">
              {PHRASES[phraseIndex].split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className="word-animate text-white text-base md:text-xl font-semibold tracking-[0.1em] uppercase"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Button with Hover Carousel & Shimmer */}
          <button 
            onClick={() => setIsPanelOpen(true)}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            className="pointer-events-auto cursor-pointer group relative overflow-hidden px-10 py-4 border border-white/30 bg-black/20 backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 min-w-[280px]"
          >
            <span className={`relative z-10 text-white text-sm md:text-base font-medium tracking-[0.2em] uppercase transition-all ${isHoveringButton ? 'text-shimmer' : ''}`}>
              {buttonText}
            </span>
          </button>
        </div>
      </div>

      {/* Top Left - Header */}
      <header className="flex justify-start items-start pointer-events-auto relative z-10">
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
      <div className="flex justify-between items-end pointer-events-auto relative z-10">
        
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