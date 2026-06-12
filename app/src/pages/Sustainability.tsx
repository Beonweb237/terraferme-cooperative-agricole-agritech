import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Leaf,
  Recycle,
  Wind,
  TreePine,
  Sun,
  Earth,
  Bird,
  Droplets,
  ShieldCheck,
  MapPin,
  Bug,
  Sprout,
  Flower2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

/* Inline icons for names not in lucide-react */
const BeeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 17c0-3 2.5-5 2.5-8S14 4 12 4 9.5 6 9.5 9s2.5 5 2.5 8"/>
    <path d="M7 13c1.5-1 3.5-1 5 0s3.5 1 5 0"/>
    <path d="M7 16c1.5-1 3.5-1 5 0s3.5 1 5 0"/>
    <path d="M9 4V3M15 4V3"/>
    <path d="M7 8c-2 0-3 1-3 3s1 3 3 3M17 8c2 0 3 1 3 3s-1 3-3 3"/>
  </svg>
);
const ButterflyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18"/>
    <path d="M12 8c-2-2-5-2-7 0s-2 5 0 7c1.5 1.5 4 1 5 0"/>
    <path d="M12 8c2-2 5-2 7 0s2 5 0 7c-1.5 1.5-4 1-5 0"/>
    <path d="M12 13c-1.5 1-3 3-3 5s1.5 3 3 2"/>
    <path d="M12 13c1.5 1 3 3 3 5s-1.5 3-3 2"/>
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  HELPER: Animated Counter                                         */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useGSAP(() => {
    if (!ref.current || hasAnimated.current) return;
    const el = ref.current;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (decimals > 0) {
              el.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
            } else {
              el.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
            }
          },
        });
      },
    });

    return () => { trigger.kill(); };
  }, { scope: ref });

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}

/* ------------------------------------------------------------------ */
/*  HELPER: Section Entrance                                         */
/* ------------------------------------------------------------------ */

function SectionEntrance({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      delay,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CARBON RING CHART COMPONENT                                       */
/* ------------------------------------------------------------------ */

function CarbonRingChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const size = 280;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useGSAP(() => {
    if (!chartRef.current || hasAnimated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: chartRef.current,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        if (ringRef.current) {
          gsap.fromTo(
            ringRef.current,
            { strokeDashoffset: circumference },
            {
              strokeDashoffset: circumference * 0.6,
              duration: 2,
              ease: 'power2.out',
            }
          );
        }
        if (numberRef.current) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 40,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              if (numberRef.current) {
                numberRef.current.textContent = `-${Math.round(obj.val)}%`;
              }
            },
          });
        }
      },
    });

    return () => { trigger.kill(); };
  }, { scope: chartRef });

  return (
    <div ref={chartRef} className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E7E5E4"
          strokeWidth={strokeWidth}
        />
        {/* Animated ring - 40% fill = 0.4 of circumference */}
        <circle
          ref={ringRef}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#166534"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
        {/* 2020 baseline marker */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2 - 4}
          fill="none"
          stroke="#D6D3D1"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <div ref={numberRef} className="font-mono text-5xl font-medium text-[#166534]">
          -40%
        </div>
        <p className="text-xs text-[#78716C] mt-1 uppercase tracking-wider">CO2 evite</p>
      </div>

      {/* Timeline markers */}
      <div className="flex justify-between w-full max-w-[280px] mt-6 px-2">
        <div className="text-center">
          <p className="font-mono text-sm text-[#78716C]">2020</p>
          <p className="text-[10px] text-[#A8A29E]">Base</p>
        </div>
        <div className="text-center">
          <p className="font-mono text-sm font-medium text-[#166534]">2026</p>
          <p className="text-[10px] text-[#A8A29E]">-40%</p>
        </div>
        <div className="text-center">
          <p className="font-mono text-sm text-[#78716C]">2030</p>
          <p className="text-[10px] text-[#A8A29E]">Net 0</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CERTIFICATION CARD                                                */
/* ------------------------------------------------------------------ */

function CertificationCard({
  icon: Icon,
  iconColor,
  title,
  subtitle,
  body,
  metric,
  metricColor,
  borderColor,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  subtitle: string;
  body: string;
  metric: string;
  metricColor: string;
  borderColor: string;
}) {
  return (
    <div
      className="group bg-white rounded-xl border border-[#E7E5E4] p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
      style={{ borderTop: `4px solid ${borderColor}` }}
    >
      <Icon size={64} style={{ color: iconColor }} className="mb-5" />
      <p className="text-xs uppercase tracking-wider text-[#78716C] mb-1">{title}</p>
      <h3
        className="font-display text-xl sm:text-[28px] font-semibold mb-3"
        style={{ color: iconColor }}
      >
        {subtitle}
      </h3>
      <p className="text-[#44403C] text-sm sm:text-base font-body leading-relaxed mb-5">
        {body}
      </p>
      <p className="font-mono text-sm font-medium" style={{ color: metricColor }}>
        {metric}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PILLAR CARD                                                       */
/* ------------------------------------------------------------------ */

function PillarCard({
  icon: Icon,
  iconColor,
  headline,
  body,
  metric,
  metricColor,
  delay,
}: {
  icon: React.ElementType;
  iconColor: string;
  headline: string;
  body: string;
  metric: string;
  metricColor: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="rounded-xl p-8 lg:p-10 border border-[#E7E5E4] bg-[#FAFAF9] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
      style={{ borderTop: `4px solid ${iconColor}` }}
    >
      <Icon size={40} style={{ color: iconColor }} className="mb-5" />
      <h3 className="font-display text-xl sm:text-[28px] font-semibold text-[#1C1917] mb-3">
        {headline}
      </h3>
      <p className="text-[#44403C] text-sm sm:text-base font-body leading-relaxed mb-5">
        {body}
      </p>
      <p className="font-mono text-sm font-medium" style={{ color: metricColor }}>
        {metric}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                                */
/* ------------------------------------------------------------------ */

export default function Sustainability() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const bioBannerRef = useRef<HTMLDivElement>(null);
  const bioParallaxRef = useRef<HTMLDivElement>(null);
  const certGridRef = useRef<HTMLDivElement>(null);
  const organicRef = useRef<HTMLDivElement>(null);
  const carbonRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero parallax
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Hero text
    if (heroRef.current) {
      const els = heroRef.current.querySelectorAll('.hero-anim');
      gsap.from(els, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'expo.out',
      });
    }

    // Biodiversity banner parallax
    if (bioParallaxRef.current) {
      gsap.to(bioParallaxRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: bioBannerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Organic section
    if (organicRef.current) {
      gsap.from(organicRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: organicRef.current, start: 'top 85%', once: true },
      });
    }

    // Carbon section
    if (carbonRef.current) {
      gsap.from(carbonRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: carbonRef.current, start: 'top 85%', once: true },
      });
    }

    // Certification cards
    if (certGridRef.current) {
      const cards = certGridRef.current.children;
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: certGridRef.current, start: 'top 85%', once: true },
      });
    }

    // Metrics grid
    if (metricsRef.current) {
      const items = metricsRef.current.children;
      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: metricsRef.current, start: 'top 80%', once: true },
      });
    }

    // CTA
    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', once: true },
      });
    }
  }, { scope: pageRef });

  const practices = [
    { icon: Sprout, text: 'Rotation sur 7 ans minimum' },
    { icon: Leaf, text: 'Compostage de nos residus de recolte' },
    { icon: Bug, text: 'Ennemis naturels des ravageurs' },
    { icon: Flower2, text: 'Semences paysannes et reproductibles' },
    { icon: ShieldCheck, text: 'Absence totale de pesticides synthetiques' },
  ];

  const initiatives = [
    { icon: TreePine, title: 'Agroforesterie', body: '5 000 arbres plantes sur nos parcelles' },
    { icon: Sun, title: 'Energies Renouvelables', body: '100% electricite verte, 12 installations solaires' },
    { icon: Earth, title: 'Agriculture de Conservation', body: 'Non-labour sur 80% des surfaces' },
  ];

  return (
    <div ref={pageRef} className="min-h-[100dvh]">
      {/* ============================================================ */}
      {/* SECTION 1 — PAGE HEADER                                      */}
      {/* ============================================================ */}
      <div ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div ref={parallaxRef} className="absolute inset-0 w-full" style={{ height: '120%', top: '-10%' }}>
            <img
              src="/biodiversity-field.jpg"
              alt="Biodiversity field"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(28,25,23,0.6) 0%, rgba(28,25,23,0.85) 100%)',
            }}
          />
        </div>
        <div className="relative z-10 pt-40 sm:pt-44 pb-24 sm:pb-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
            <div className="hero-anim flex items-center justify-center gap-2 text-sm text-white/60 mb-6">
              <Link to="/" className="hover:text-[#4ADE80] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Durabilite</span>
            </div>
            <p className="hero-anim text-xs uppercase tracking-[0.04em] text-[#4ADE80] font-body font-medium mb-4">
              Agriculture Regenerative
            </p>
            <h1 className="hero-anim font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4">
              Cultiver l&apos;Avenir, Preserver la Terre
            </h1>
            <p className="hero-anim text-white/80 text-base sm:text-lg font-body leading-relaxed max-w-2xl mx-auto mb-6">
              100% de nos exploitations sont certifiees agriculture biologique ou HVE.
              Nous visons la neutralite carbone d&apos;ici 2030.
            </p>
            <p className="hero-anim font-mono text-sm text-[#D97706] tracking-wide">
              100% Bio/HVE &middot; -40% CO2 &middot; +300% biodiversite
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 2 — COMMITMENT PILLARS                               */}
      {/* ============================================================ */}
      <div className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <SectionEntrance className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-[56px] font-semibold text-[#1C1917]">
              Quatre Piliers pour une Agriculture Durable
            </h2>
          </SectionEntrance>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PillarCard
              icon={Leaf}
              iconColor="#22C55E"
              headline="Bio depuis Toujours"
              body="100% de nos productions certifiees AB. Aucun pesticide synthetique, aucun OGM. Seuls les savoir-faire naturels et la patience."
              metric="100% AB"
              metricColor="#22C55E"
              delay={0}
            />
            <PillarCard
              icon={BeeIcon}
              iconColor="#EAB308"
              headline="HVE Niveau 3"
              body="La certification HVE reconnait notre engagement en biodiversite, gestion de l'irrigation, fertilisation et protection phytosanitaire."
              metric="HVE Niveau 3"
              metricColor="#EAB308"
              delay={0.12}
            />
            <PillarCard
              icon={Recycle}
              iconColor="#166534"
              headline="Regenerer les Sols"
              body="Couvertures vegetales, compostage, agroforesterie et non-labour pour enrichir la matiere organique et capturer le carbone."
              metric="+12% carbone/sol"
              metricColor="#166534"
              delay={0.24}
            />
            <PillarCard
              icon={Wind}
              iconColor="#1C1917"
              headline="Objectif 2030"
              body="Reduction de 40% des emissions de CO2 depuis 2020. Compensation via nos forets et prairies. Neutralite totale prevue pour 2030."
              metric="-40% CO2"
              metricColor="#166534"
              delay={0.36}
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 3 — ORGANIC & REGENERATIVE AGRICULTURE               */}
      {/* ============================================================ */}
      <div className="py-20 lg:py-24" style={{ background: '#F5F5F4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div ref={organicRef}>
              <p className="text-xs uppercase tracking-[0.04em] text-[#22C55E] font-body font-medium mb-3">
                Agriculture Biologique
              </p>
              <h2 className="font-display text-2xl sm:text-[40px] font-semibold text-[#1C1917] mb-4 leading-tight">
                Le Respect du Vivant
              </h2>
              <p className="text-[#44403C] text-base sm:text-lg font-body leading-relaxed mb-6">
                Notre agriculture biologique repose sur des pratiques ancestrales enrichies par la
                science moderne. Rotation des cultures, compostage, lutte biologique et semences
                paysannes assurent des sols vivants et des produits sains.
              </p>

              <div className="space-y-3 mb-8">
                {practices.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0">
                      <p.icon size={16} className="text-[#22C55E]" />
                    </div>
                    <span className="font-body text-sm text-[#1C1917]">{p.text}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/farms"
                className="inline-flex items-center gap-2 px-6 py-3 border-[1.5px] border-[#166534] text-[#166534] rounded-md font-body text-sm font-semibold hover:bg-[#166534] hover:text-white transition-all duration-200"
              >
                Nos Certifications Bio
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right Column */}
            <SectionEntrance delay={0.2}>
              <div className="relative">
                <img
                  src="/carbon-soil.jpg"
                  alt="Rich organic soil"
                  className="w-full rounded-xl object-cover aspect-[4/3]"
                  loading="lazy"
                />
                <div className="mt-4 p-4 bg-white rounded-xl border border-[#E7E5E4]">
                  <p className="font-mono text-sm text-[#22C55E] font-medium">
                    Matiere organique du sol:{' '}
                    <AnimatedCounter value={18} prefix="+" suffix="% en 5 ans" />
                  </p>
                </div>
              </div>
            </SectionEntrance>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 4 — CARBON & CLIMATE INITIATIVES                     */}
      {/* ============================================================ */}
      <div className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Carbon Ring Chart */}
            <div className="flex items-center justify-center">
              <CarbonRingChart />
            </div>

            {/* Right — Content */}
            <div ref={carbonRef}>
              <p className="text-xs uppercase tracking-[0.04em] text-[#166534] font-body font-medium mb-3">
                Neutralite Carbone
              </p>
              <h2 className="font-display text-2xl sm:text-[40px] font-semibold text-[#1C1917] mb-4 leading-tight">
                Champ d&apos;Action Climatique
              </h2>
              <p className="text-[#44403C] text-base sm:text-lg font-body leading-relaxed mb-8">
                Nous avons reduit nos emissions de gaz a effet de serre de 40% depuis 2020 grace a
                l&apos;agriculture de conservation, l&apos;agroforesterie et les energies renouvelables.
                Notre objectif: la neutralite carbone totale d&apos;ici 2030.
              </p>

              {/* Initiative Cards */}
              <div className="space-y-4">
                {initiatives.map((init, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#166534]/10 flex items-center justify-center flex-shrink-0">
                      <init.icon size={22} className="text-[#166534]" />
                    </div>
                    <div>
                      <h4 className="font-body text-base font-semibold text-[#1C1917] mb-1">
                        {init.title}
                      </h4>
                      <p className="font-mono text-sm text-[#166534]">{init.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 5 — BIODIVERSITY & ECOSYSTEMS                        */}
      {/* ============================================================ */}
      <div>
        {/* Banner */}
        <div ref={bioBannerRef} className="relative h-[50vh] overflow-hidden">
          <div ref={bioParallaxRef} className="absolute inset-0 w-full" style={{ height: '120%', top: '-10%' }}>
            <img
              src="/biodiversity-field.jpg"
              alt="Biodiversity field with wildflowers"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(28,25,23,0.5) 60%, #F5F5F4 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white mb-3">
                La Biodiversite, Notre Alliee
              </h2>
              <p className="text-white/80 text-base sm:text-lg font-body max-w-2xl leading-relaxed">
                Haies, bandes fleuries, mares et arbres isoles: nous cultivons la diversite
                biologique au coeur de nos exploitations.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="py-16 lg:py-20" style={{ background: '#F5F5F4' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <div
              ref={metricsRef}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {[
                { value: 300, prefix: '+', suffix: '%', label: 'Insectes pollinisateurs', icon: ButterflyIcon },
                { value: 47, suffix: '', label: 'Especes d\'oiseaux nicheurs', icon: Bird },
                { value: 12, suffix: ' km', label: 'Haies replantees', icon: TreePine },
                { value: 28, suffix: '', label: 'Mares restaurees', icon: Droplets },
              ].map((m, i) => (
                <div key={i} className="text-center p-6 lg:p-8">
                  <m.icon size={32} className="text-[#78716C] mx-auto mb-4" />
                  <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#166534] mb-2">
                    <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className="text-[#44403C] text-sm font-body">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 6 — CERTIFICATIONS & LABELS                          */}
      {/* ============================================================ */}
      <div className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <SectionEntrance className="text-center mb-10 lg:mb-12">
            <h2 className="font-display text-2xl sm:text-[40px] font-semibold text-[#1C1917] mb-3">
              Nos Garanties de Qualite
            </h2>
            <p className="text-[#44403C] text-base font-body max-w-xl mx-auto">
              Tous nos produits portent au moins une certification reconnue.
            </p>
          </SectionEntrance>

          <div
            ref={certGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <CertificationCard
              icon={Leaf}
              iconColor="#22C55E"
              title="Agriculture Biologique"
              subtitle="Agriculture Biologique"
              body="Certification AB delivree par les organismes agrees. Garantit l'absence de pesticides synthetiques, d'OGM et de fertilisants chimiques."
              metric="247 produits certifies AB"
              metricColor="#22C55E"
              borderColor="#22C55E"
            />
            <CertificationCard
              icon={BeeIcon}
              iconColor="#EAB308"
              title="Haute Valeur Environnementale"
              subtitle="HVE Niveau 3"
              body="Certification officielle du Ministere de l'Agriculture. Niveau 3: engagement avance en biodiversite, strategie phytosanitaire, gestion de la fertilisation et de l'irrigation."
              metric="100% HVE Niveau 3"
              metricColor="#EAB308"
              borderColor="#EAB308"
            />
            <CertificationCard
              icon={ShieldCheck}
              iconColor="#991B1B"
              title="Appellation d'Origine Protegee"
              subtitle="AOP"
              body="Garantit l'origine geographique et le savoir-faire traditionnel. Nos vins Bourgueil AOP et nos lentilles Vertes du Berry AOP en portent le label."
              metric="12 produits AOP"
              metricColor="#991B1B"
              borderColor="#991B1B"
            />
            <CertificationCard
              icon={MapPinIcon}
              iconColor="#2563EB"
              title="Indication Geographique Protegee"
              subtitle="IGP"
              body="Reconnait le lien entre un produit et son territoire. Nos pommes du Limousin et notre orge brassicole portent l'IGP."
              metric="18 produits IGP"
              metricColor="#2563EB"
              borderColor="#2563EB"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 7 — CTA JOIN THE MOVEMENT                            */}
      {/* ============================================================ */}
      <div ref={ctaRef} className="py-20 lg:py-24" style={{ background: '#166534' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white mb-4">
            Chaque Choix Compte
          </h2>
          <p className="text-white/80 text-base sm:text-lg font-body leading-relaxed mb-8">
            En choisissant les produits TerraFerme, vous soutenez une agriculture qui respecte
            la terre, preserve la biodiversite et construit l&apos;avenir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#166534] rounded-md font-body text-sm font-semibold hover:bg-[#F5F5F4] transition-colors"
            >
              <ShoppingBag size={16} />
              Acheter Nos Produits
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white text-white rounded-md font-body text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <ArrowRight size={16} />
              En Savoir Plus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Extra icon wrapper for IGP card (MapPin with different usage)     */
/* ------------------------------------------------------------------ */

function MapPinIcon(props: React.SVGAttributes<SVGSVGElement> & { size?: number }) {
  return <MapPin size={props.size || 24} {...props} />;
}
