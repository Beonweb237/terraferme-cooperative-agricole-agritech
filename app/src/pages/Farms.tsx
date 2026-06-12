import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  MapPin,
  ChevronDown,
  ArrowRight,
  Calendar,
  Leaf,
  ShieldCheck,
  Wheat,
  Grape,
  Beef,
  Apple,
  Tractor,
  Sprout,
  TreePine,
  Flower2,
  Users,
  Phone,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Farm {
  id: number;
  name: string;
  location: string;
  region: string;
  products: string;
  certifications: string[];
  image: string;
  portrait?: string;
  farmer?: string;
  role?: string;
  quote?: string;
  founded?: number;
  hectares?: number;
  employees?: number;
  bottles?: number;
  animals?: number;
  headline?: string;
  body?: string;
  practices?: string[];
  parallaxImage?: string;
  featured?: boolean;
}

const farms: Farm[] = [
  {
    id: 1,
    name: 'Domaine des Roches',
    location: 'Bourgueil, Val de Loire',
    region: 'Loire',
    products: 'Vins AOP, Cabernet Franc',
    certifications: ['AB', 'AOP', 'HVE'],
    image: '/farm-bourgueil.jpg',
    portrait: '/farmer-portrait-1.jpg',
    farmer: 'Jean-Louis Moreau',
    role: 'Vigneron, 3e generation',
    quote: 'Le vin est le fruit\'un dialogue entre l\'homme et la terre.',
    founded: 1952,
    hectares: 45,
    employees: 12,
    bottles: 120000,
    headline: 'Une Histoire de Vignes',
    body: 'Fonde en 1952 par la famille Moreau, le Domaine des Roches s\'etend sur 45 hectares de vignes de Cabernet Franc. Trois generations de savoir-faire viticole alliees aux techniques de precision agriculture modernes.',
    practices: ['Agriculture Biologique Certifiee AB', 'Viticulture de Precision (capteurs IoT)', 'Recolte Manuelle Selective', 'Vinification Traditionnelle'],
    parallaxImage: '/farm-bourgueil.jpg',
    featured: true,
  },
  {
    id: 2,
    name: 'Ferme des Coteaux',
    location: 'Sancerre, Centre-Val de Loire',
    region: 'Centre',
    products: 'Boeuf Charolais, Ble Bio, Legumes',
    certifications: ['AB', 'HVE', 'IGP'],
    image: '/farm-sancerre.jpg',
    portrait: '/farmer-portrait-2.jpg',
    farmer: 'Marie Dupont',
    role: 'Agricultrice, Agronome',
    quote: 'L\'avenir de l\'agriculture passe par le respect des equilibres naturels.',
    founded: 2010,
    hectares: 120,
    employees: 28,
    animals: 85,
    headline: 'Polyculture-Elevage & Agroecologie',
    body: 'La Ferme des Coteaux est un modele d\'agriculture regenerative sur 120 hectares. Marie Dupont et son equipe pratiquent la polyculture-elevage avec bovins Charolais, cultures cerealieres et maraichage bio.',
    practices: ['Agriculture de Conservation', 'Elevage en Plein Air', 'Rotation des Cultures', 'Agroforesterie'],
    parallaxImage: '/farm-sancerre.jpg',
    featured: true,
  },
  {
    id: 3,
    name: 'Les Vergers du Cher',
    location: 'Vierzon, Centre-Val de Loire',
    region: 'Centre',
    products: 'Pommes, Poires, Cidre',
    certifications: ['AB', 'IGP'],
    image: '/produit-pommes.jpg',
    portrait: '/farmer-portrait-3.jpg',
    farmer: 'Pierre et Claire Lefevre',
    role: 'Arboriculteurs',
    quote: 'Un arbre bien soigne vous donne les meilleurs fruits.',
    founded: 1985,
    hectares: 35,
    employees: 8,
  },
  {
    id: 4,
    name: 'Bergerie de la Montagne',
    location: 'Aubusson, Nouvelle-Aquitaine',
    region: 'Nouvelle-Aquitaine',
    products: 'Agneau, Fromage, Laine',
    certifications: ['AB', 'AOP'],
    image: '/produit-raisins.jpg',
    farmer: 'Sophie Martin',
    role: 'Bergere, Fromagere',
    founded: 1998,
    hectares: 80,
    employees: 5,
  },
  {
    id: 5,
    name: 'Marais de Bourges',
    location: 'Bourges, Centre-Val de Loire',
    region: 'Centre',
    products: 'Legumes, Aromatiques',
    certifications: ['AB', 'HVE'],
    image: '/produit-courgettes.jpg',
    farmer: 'Lucas Garnier',
    role: 'Maraicher',
    founded: 2005,
    hectares: 15,
    employees: 6,
  },
  {
    id: 6,
    name: 'Ferme du Limousin',
    location: 'Limoges, Nouvelle-Aquitaine',
    region: 'Nouvelle-Aquitaine',
    products: 'Boeuf, Porc, Volailles',
    certifications: ['AB', 'IGP', 'Label Rouge'],
    image: '/agritech-drone.jpg',
    farmer: 'Thier et Anne Blanc',
    role: 'Eleveurs',
    founded: 1972,
    hectares: 200,
    employees: 15,
  },
  {
    id: 7,
    name: 'Domaine du Berry',
    location: 'Chateauroux, Centre-Val de Loire',
    region: 'Centre',
    products: 'Lentilles, Miel, Cereales',
    certifications: ['AB', 'AOP'],
    image: '/agritech-capteurs.jpg',
    farmer: 'Jean-Pierre Rousseau',
    role: 'Cerealier, Apiculteur',
    founded: 1960,
    hectares: 90,
    employees: 4,
  },
  {
    id: 8,
    name: 'Hortus Jardins',
    location: 'Tours, Val de Loire',
    region: 'Loire',
    products: 'Fruits Rouges, Tomates',
    certifications: ['AB', 'HVE'],
    image: '/produit-tomates.jpg',
    farmer: 'Camille Fontaine',
    role: 'Maraichere',
    founded: 2015,
    hectares: 8,
    employees: 10,
  },
  {
    id: 9,
    name: 'Vignoble de l\'Indre',
    location: 'Issoudun, Centre-Val de Loire',
    region: 'Centre',
    products: 'Vin IGP, Jus de Raisin',
    certifications: ['AB', 'IGP'],
    image: '/agritech-precision.jpg',
    farmer: 'Robert et Isabelle Faure',
    role: 'Viticulteurs',
    founded: 1988,
    hectares: 28,
    employees: 6,
  },
  {
    id: 10,
    name: 'Ferme de la Loire',
    location: 'Orleans, Val de Loire',
    region: 'Loire',
    products: 'Asperges, Haricots, Mais',
    certifications: ['AB', 'HVE'],
    image: '/season-spring.jpg',
    farmer: 'Nicolas et Julie Perrot',
    role: 'Maraichers',
    founded: 1995,
    hectares: 55,
    employees: 9,
  },
  {
    id: 11,
    name: 'Prairies de Touraine',
    location: 'Loches, Val de Loire',
    region: 'Loire',
    products: 'Fromage de Chevre, Miel',
    certifications: ['AB', 'AOP'],
    image: '/recette-tarte.jpg',
    farmer: 'Helene Chevalier',
    role: 'Chevriere, Fromagere',
    founded: 2002,
    hectares: 42,
    employees: 3,
  },
  {
    id: 12,
    name: 'Terres du Poitou',
    location: 'Poitiers, Nouvelle-Aquitaine',
    region: 'Nouvelle-Aquitaine',
    products: 'Poulets, Oeufs, Cereales',
    certifications: ['AB', 'IGP'],
    image: '/recette-soupe.jpg',
    farmer: 'Marc et Veronique Dubois',
    role: 'Aviculteurs, Cerealiers',
    founded: 1978,
    hectares: 65,
    employees: 7,
  },
];

/* ------------------------------------------------------------------ */
/*  MAP REGION COORDINATES (simplified France)                         */
/* ------------------------------------------------------------------ */

const regionDots = [
  { region: 'Loire', x: 38, y: 38 },
  { region: 'Centre', x: 42, y: 42 },
  { region: 'Nouvelle-Aquitaine', x: 32, y: 55 },
];

/* ------------------------------------------------------------------ */
/*  HELPER COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function CertificationBadge({ cert, size = 16 }: { cert: string; size?: number }) {
  const colors: Record<string, string> = {
    AB: '#22C55E',
    HVE: '#EAB308',
    AOP: '#991B1B',
    IGP: '#2563EB',
    'Label Rouge': '#DC2626',
  };
  const color = colors[cert] || '#78716C';
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-mono font-medium"
      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      <ShieldCheck size={size} />
      {cert}
    </span>
  );
}

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
/*  ACCORDION COMPONENT                                                */
/* ------------------------------------------------------------------ */

function PracticeAccordion({ items }: { items: string[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-2 mt-6">
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            className="rounded-lg border border-[#E7E5E4] overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#FAFAF9] transition-colors"
              onClick={() => setOpenIdx(isOpen ? null : i)}
            >
              <span className="font-body text-sm font-medium text-[#1C1917]">{item}</span>
              <ChevronDown
                size={18}
                className="text-[#78716C] transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? '120px' : '0px' }}
            >
              <p className="px-4 pb-3 text-sm text-[#57534E]">
                Pratique mise en oeuvre sur l&apos;ensemble des parcelles avec suivi
                annuel des indicateurs de performance environnementale.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURED FARM SECTION                                              */
/* ------------------------------------------------------------------ */

function FeaturedFarmSection({ farm }: { farm: Farm }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!parallaxRef.current) return;
    gsap.to(parallaxRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    if (contentRef.current) {
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }
  }, { scope: sectionRef });

  const statEntries = [
    farm.hectares ? { value: farm.hectares, label: 'Hectares' } : null,
    farm.founded ? { value: farm.founded, label: 'Annee de fondation' } : null,
    farm.bottles ? { value: farm.bottles.toLocaleString(), label: 'Bouteilles/an' } : null,
    farm.animals ? { value: farm.animals, label: 'Bovins' } : null,
    farm.employees ? { value: farm.employees, label: 'Employes' } : null,
  ].filter(Boolean) as { value: string | number; label: string }[];

  const productList = farm.id === 1
    ? [
        { name: 'Bourgueil Rouge AOP', season: 'Autumn', certs: ['AB', 'AOP'] },
        { name: 'Bourgueil Rose', season: 'Spring', certs: ['AB', 'AOP'] },
      ]
    : farm.id === 2
      ? [
          { name: 'Boeuf Charolais Label Rouge', season: 'All', certs: ['AB', 'IGP'] },
          { name: 'Ble Bio', season: 'Summer', certs: ['AB'] },
          { name: 'Legumes de Saison', season: 'Spring', certs: ['AB', 'HVE'] },
        ]
      : [];

  const seasonColors: Record<string, string> = {
    Spring: '#4ADE80',
    Summer: '#FCD34D',
    Autumn: '#F59E0B',
    Winter: '#94A3B8',
    All: '#166534',
  };

  return (
    <div ref={sectionRef} className="relative">
      {/* Parallax Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0 w-full" style={{ height: '130%', top: '-15%' }}>
          <img
            src={farm.parallaxImage}
            alt={farm.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(28,25,23,0.85) 0%, rgba(28,25,23,0.2) 60%, transparent 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-2">
            {farm.name}
          </h2>
          <p className="text-[#D97706] text-base sm:text-lg font-body mb-4 flex items-center gap-2">
            <MapPin size={18} />
            {farm.location}
          </p>
          <div className="flex gap-2 flex-wrap">
            {farm.certifications.map((c) => (
              <CertificationBadge key={c} cert={c} size={20} />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 lg:py-20">
          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-3">
              <h3 className="font-display text-2xl sm:text-[40px] font-semibold text-[#1C1917] mb-4">
                {farm.headline}
              </h3>
              <p className="text-[#44403C] text-base sm:text-lg font-body leading-relaxed mb-6">
                {farm.body}
              </p>

              <PracticeAccordion items={farm.practices || []} />

              {/* Farmer Profile */}
              {farm.portrait && (
                <div className="mt-8 flex items-start gap-4 p-5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  <img
                    src={farm.portrait}
                    alt={farm.farmer}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-body text-base font-semibold text-[#1C1917]">
                      {farm.farmer}
                    </p>
                    <p className="font-body text-sm text-[#57534E]">{farm.role}</p>
                    {farm.quote && (
                      <p className="mt-2 font-display text-sm italic text-[#92400E] leading-relaxed">
                        &ldquo;{farm.quote}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {statEntries.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                    <p className="font-mono text-2xl sm:text-3xl font-medium text-[#166534]">
                      {s.value}
                    </p>
                    <p className="text-xs text-[#78716C] mt-1 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Seasonal Products */}
              {productList.length > 0 && (
                <div>
                  <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-[#78716C] mb-3">
                    Produits Phares
                  </h4>
                  <div className="space-y-3">
                    {productList.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4]"
                      >
                        <span className="font-body text-sm text-[#1C1917]">{p.name}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ background: seasonColors[p.season] }}
                          />
                          <div className="flex gap-1">
                            {p.certs.map((c) => (
                              <CertificationBadge key={c} cert={c} size={12} />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visit Button */}
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#166534] text-white rounded-md font-body text-sm font-semibold hover:bg-[#14532D] transition-colors">
                <MapPin size={16} />
                Visiter la ferme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                                */
/* ------------------------------------------------------------------ */

export default function Farms() {
  const [activeFarmId, setActiveFarmId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const featuredFarms = farms.filter((f) => f.featured);
  const otherFarms = farms.filter((f) => !f.featured);
  const visibleOtherFarms = showAll ? otherFarms : otherFarms.slice(0, 6);

  const scrollToFarm = useCallback((farmId: number) => {
    setActiveFarmId(farmId);
    const el = document.getElementById(`farm-${farmId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useGSAP(() => {
    // Header animation
    if (headerRef.current) {
      const children = headerRef.current.children;
      gsap.from(children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'expo.out',
      });
    }

    // Directory animation
    if (directoryRef.current) {
      gsap.from(directoryRef.current, {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: directoryRef.current, start: 'top 85%', once: true },
      });
    }

    // Grid animation
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
      });
    }

    // CTA animation
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

  const farmIcons = [Grape, Beef, Apple, Sprout, Wheat, Tractor, TreePine, Flower2, Leaf, Users, Phone, Sprout];

  return (
    <div ref={pageRef} className="min-h-[100dvh]">
      {/* ============================================================ */}
      {/* SECTION 1 — PAGE HEADER                                      */}
      {/* ============================================================ */}
      <div
        className="relative pt-36 sm:pt-40 pb-20 sm:pb-24"
        style={{ background: '#1C1917' }}
      >
        <div ref={headerRef} className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-6">
            <Link to="/" className="hover:text-[#4ADE80] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Nos Fermes</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4">
            Nos Fermes Partenaires
          </h1>
          <p className="text-white/75 text-base sm:text-lg font-body leading-relaxed max-w-2xl mx-auto mb-6">
            Chaque ferme raconte une histoire. Chaque agriculteur porte un savoir-faire.
            Rencontrez les hommes et les femmes qui cultivent votre alimentation.
          </p>
          <p className="font-mono text-sm text-[#D97706] tracking-wide">
            12 fermes &middot; 6 regions &middot; 340 agriculteurs
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 2 — FARM DIRECTORY (Map + List)                      */}
      {/* ============================================================ */}
      <div
        ref={directoryRef}
        className="sticky top-16 z-30 bg-white border-b border-[#E7E5E4] py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Map Visualization */}
            <div className="lg:w-[55%] relative">
              <div className="relative rounded-xl bg-[#F5F5F4] border border-[#E7E5E4] overflow-hidden aspect-[4/3] lg:aspect-[16/10]">
                <svg
                  viewBox="0 0 100 80"
                  className="w-full h-full"
                  style={{ background: '#EDE9E6' }}
                >
                  {/* Simplified France regions */}
                  <path
                    d="M30 15 L55 10 L70 18 L75 30 L68 42 L72 50 L65 58 L58 65 L50 68 L42 62 L35 55 L28 48 L25 38 L28 28 Z"
                    fill="#D6D3D1"
                    stroke="#A8A29E"
                    strokeWidth="0.5"
                  />
                  <text x="50" y="38" textAnchor="middle" fontSize="4" fill="#78716C" fontFamily="DM Sans">
                    France - Regions Centre & Loire
                  </text>
                  {/* Region dots */}
                  {regionDots.map((dot) => (
                    <g key={dot.region}>
                      <circle cx={dot.x} cy={dot.y} r="2" fill="#D97706" opacity="0.3" />
                      <circle cx={dot.x} cy={dot.y} r="1" fill="#D97706" />
                    </g>
                  ))}
                  {/* Farm pins */}
                  {farms.map((farm, i) => {
                    const baseX = regionDots.find((d) => d.region === farm.region)?.x || 40;
                    const baseY = regionDots.find((d) => d.region === farm.region)?.y || 40;
                    const offsetX = (i % 3 - 1) * 6;
                    const offsetY = Math.floor(i / 3) * 5;
                    return (
                      <g
                        key={farm.id}
                        className="cursor-pointer"
                        onClick={() => scrollToFarm(farm.id)}
                      >
                        <circle
                          cx={baseX + offsetX}
                          cy={baseY + offsetY}
                          r="2.5"
                          fill={activeFarmId === farm.id ? '#166534' : '#D97706'}
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </g>
                    );
                  })}
                </svg>
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 text-[10px] text-[#57534E] font-mono">
                  Cliquez sur un point pour voir la ferme
                </div>
              </div>
            </div>

            {/* Farm List */}
            <div className="lg:w-[45%] max-h-[300px] lg:max-h-[320px] overflow-y-auto pr-1">
              {farms.map((farm) => {
                const IconComp = farmIcons[farm.id - 1] || Leaf;
                return (
                  <button
                    key={farm.id}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all duration-200 hover:bg-[#F5F5F4] mb-1"
                    style={{
                      borderLeft: activeFarmId === farm.id ? '3px solid #166534' : '3px solid transparent',
                      background: activeFarmId === farm.id ? '#F5F5F4' : undefined,
                    }}
                    onClick={() => scrollToFarm(farm.id)}
                  >
                    <div className="w-12 h-12 rounded-md bg-[#E7E5E4] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {farm.image ? (
                        <img src={farm.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <IconComp size={20} className="text-[#78716C]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-[#1C1917] truncate">
                        {farm.name}
                      </p>
                      <p className="text-xs text-[#57534E] flex items-center gap-1">
                        <MapPin size={10} />
                        {farm.location}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTIONS 3 & 4 — FEATURED FARMS                              */}
      {/* ============================================================ */}
      {featuredFarms.map((farm) => (
        <div key={farm.id} id={`farm-${farm.id}`}>
          <FeaturedFarmSection farm={farm} />
        </div>
      ))}

      {/* ============================================================ */}
      {/* SECTION 5 — OTHER MEMBER FARMS                               */}
      {/* ============================================================ */}
      <div className="py-16 lg:py-20" style={{ background: '#F5F5F4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <SectionEntrance className="text-center mb-10 lg:mb-12">
            <h2 className="font-display text-2xl sm:text-[40px] font-semibold text-[#1C1917] mb-3">
              Les Autres Fermes de la Cooperative
            </h2>
            <p className="text-[#44403C] text-base font-body max-w-xl mx-auto">
              {otherFarms.length} fermes supplementaires a travers la region Centre-Val de Loire
            </p>
          </SectionEntrance>

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleOtherFarms.map((farm) => {
              const IconComp = farmIcons[farm.id - 1] || Leaf;
              return (
                <div
                  key={farm.id}
                  id={`farm-${farm.id}`}
                  className="group bg-white rounded-xl border border-[#E7E5E4] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
                >
                  <div className="aspect-video overflow-hidden bg-[#E7E5E4]">
                    {farm.image ? (
                      <img
                        src={farm.image}
                        alt={farm.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IconComp size={40} className="text-[#A8A29E]" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-body text-lg font-semibold text-[#1C1917] mb-1">
                      {farm.name}
                    </h4>
                    <p className="text-xs text-[#78716C] uppercase tracking-wider mb-2 flex items-center gap-1">
                      <MapPin size={10} />
                      {farm.location}
                    </p>
                    <p className="text-sm text-[#44403C] mb-3">{farm.products}</p>
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                      {farm.certifications.map((c) => (
                        <CertificationBadge key={c} cert={c} size={14} />
                      ))}
                    </div>
                    <button
                      onClick={() => scrollToFarm(farm.id)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#166534] hover:underline"
                    >
                      Decouvrir
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {!showAll && otherFarms.length > 6 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border-[1.5px] border-[#166534] text-[#166534] rounded-md font-body text-sm font-semibold hover:bg-[#166534] hover:text-white transition-all duration-200"
              >
                Voir Plus
                <ChevronDown size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 6 — CTA VISIT A FARM                                 */}
      {/* ============================================================ */}
      <div ref={ctaRef} className="py-20 lg:py-24" style={{ background: '#92400E' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white mb-4">
            Venez Nous Rendre Visite
          </h2>
          <p className="text-white/80 text-base sm:text-lg font-body leading-relaxed mb-8">
            Nous organisons des visites de fermes chaque mois. Une occasion unique de
            rencontrer nos agriculteurs et de decouvrir nos pratiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#92400E] rounded-md font-body text-sm font-semibold hover:bg-[#F5F5F4] transition-colors">
              <Calendar size={16} />
              Reserver une Visite
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 border border-white text-white rounded-md font-body text-sm font-semibold hover:bg-white/10 transition-colors">
              <Calendar size={16} />
              Voir le Calendrier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
