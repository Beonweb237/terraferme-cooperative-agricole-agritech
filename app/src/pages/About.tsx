import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Star,
  Handshake,
  Lightbulb,
  Eye,
  MapPin,
  Quote,
} from 'lucide-react';

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] } },
};

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Section 1 — Page Header
   ═══════════════════════════════════════════ */
function PageHeader() {
  return (
    <section
      className="relative pt-40 pb-24 lg:pt-44 lg:pb-28 bg-cover bg-center"
      style={{ backgroundImage: 'url(/farm-bourgueil.jpg)' }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(28,25,23,0.6) 0%, rgba(28,25,23,0.85) 100%)' }}
      />
      <div className="relative max-w-[800px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <nav className="mb-6">
          <Link to="/" className="text-[13px] font-body text-white/60 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[13px] font-body text-white/60 mx-2">/</span>
          <span className="text-[13px] font-body text-white/60">A Propos</span>
        </nav>
        <p className="text-[13px] font-body font-medium uppercase tracking-[0.04em] text-[#D97706] mb-4">
          DEPUIS 1952
        </p>
        <h1 className="font-display text-[40px] lg:text-[72px] font-bold text-white leading-[1.08] tracking-[-0.025em] mb-6">
          TerraFerme, une Histoire de Terre et d'Hommes
        </h1>
        <p className="text-[17px] lg:text-[19px] font-body text-white/80 leading-[1.65] max-w-[640px] mx-auto mb-6">
          De trois familles paysannes a 340 agriculteurs cooperateurs. Une aventure humaine et agricole qui dure depuis plus de 70 ans.
        </p>
        <p className="font-mono text-[14px] text-[#D97706]">70+ ans · 3 generations · 340 agriculteurs</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 2 — Our Story Timeline
   ═══════════════════════════════════════════ */
const timelineEvents = [
  { year: '1952', text: "Trois familles de vignerons du Val de Loire s'unissent pour creer la premiere cooperative viticole de la region. Le debut d'une grande aventure.", side: 'left' as const },
  { year: '1978', text: "Passage de 15 a 80 membres. Integration des maraichers et cerealiculteurs. Premiere installation de stockage collectif.", side: 'right' as const },
  { year: '1995', text: "Obtention de la premiere certification Agriculture Biologique. Engagement radical vers des pratiques 100% naturelles.", side: 'left' as const },
  { year: '2008', text: "Lancement du programme Precision Agriculture. Installation des premiers capteurs IoT et acquisition des premiers drones.", side: 'right' as const },
  { year: '2018', text: "Obtention de la certification Haute Valeur Environnementale niveau 3 pour l'ensemble des exploitations.", side: 'left' as const },
  { year: '2024', text: "Cap des 340 agriculteurs cooperateurs franchi. 12 500 hectares cultives, 47 000 tonnes produites.", side: 'right' as const },
  { year: '2026', text: "Lancement du programme Neutralite Carbone 2030. Deploiement complet de l'IA predictive sur toutes les exploitations.", side: 'left' as const, highlight: true },
];

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-24 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-[32px] lg:text-[56px] font-semibold text-neutral-900 leading-[1.1] tracking-[-0.02em]">
            Notre Histoire
          </h2>
        </FadeIn>

        <div ref={ref} className="relative max-w-[960px] mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-neutral-300" />

          <div className="space-y-12 lg:space-y-16">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  event.side === 'right' ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 pl-16 md:pl-0 ${
                  event.side === 'right'
                    ? 'md:pr-12 md:text-right'
                    : 'md:pl-12 md:text-left'
                }`}>
                  <p className={`font-mono text-[22px] lg:text-[28px] font-medium mb-2 ${
                    event.highlight ? 'text-[#D97706]' : 'text-[#166534]'
                  }`}>
                    {event.year}
                  </p>
                  <p className="text-[15px] font-body text-neutral-700 leading-[1.7]">{event.text}</p>
                </div>

                {/* Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full mt-3 z-10"
                  style={{ background: event.highlight ? '#D97706' : '#166534' }}
                />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 3 — Values & Mission
   ═══════════════════════════════════════════ */
const values = [
  {
    icon: Star,
    title: 'Qualite avant tout',
    body: "Chaque produit porte l'empreinte de notre terroir et le soin de nos agriculteurs. Jamais de compromis sur la qualite.",
  },
  {
    icon: Handshake,
    title: 'Solidarite Paysanne',
    body: "La force du collectif contre l'isolement. Nous partageons outils, savoirs et reussites. Un agriculteur TerraFerme n'est jamais seul.",
  },
  {
    icon: Lightbulb,
    title: 'Innovation Responsable',
    body: "Technologie au service de la terre, jamais contre elle. Chaque innovation est evaluee sur son impact environnemental.",
  },
  {
    icon: Eye,
    title: 'Transparence Totale',
    body: "Nos pratiques, nos chiffres, nos defis. Nous n'avons rien a cacher parce que nous faisons les choses bien.",
  },
];

function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-neutral-50 py-24 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center max-w-[720px] mx-auto mb-16">
          <Quote size={48} className="text-[#D97706] opacity-30 mx-auto mb-4" />
          <h3 className="font-display text-[28px] lg:text-[40px] font-semibold text-neutral-900 leading-[1.15] tracking-[-0.015em] italic mb-4">
            "Unir les agriculteurs pour cultiver ensemble des terres saines, des produits de qualite et un avenir durable."
          </h3>
          <p className="text-[13px] font-body font-medium uppercase tracking-[0.04em] text-neutral-600">
            — Notre raison d'etre depuis 1952
          </p>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={staggerItem}
              className="bg-white rounded-xl border border-neutral-200 p-8 border-t-[3px] border-t-[#166534]"
            >
              <v.icon size={32} className="text-[#166534] mb-4" />
              <h4 className="text-[18px] lg:text-[22px] font-body font-semibold text-neutral-900 mb-3">
                {v.title}
              </h4>
              <p className="text-[15px] font-body text-neutral-700 leading-[1.7]">{v.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 4 — Leadership Team
   ═══════════════════════════════════════════ */
const teamMembers = [
  { portrait: '/farmer-portrait-1.jpg', name: 'Jean-Louis Moreau', role: 'President du Conseil d\'Administration', specialty: 'Vigneron, 3e generation', location: 'Bourgueil' },
  { portrait: '/farmer-portrait-2.jpg', name: 'Camille Rousseau', role: 'Directrice Agronomique', specialty: 'AgriTech & Innovation', location: 'Sancerre' },
  { portrait: '/farmer-portrait-3.jpg', name: 'Andre Legrand', role: 'Directeur Commercial', specialty: 'Cooperative & Export', location: 'Chinon' },
  { portrait: '', name: 'Sophie Blanc', role: 'Responsable Durabilite', specialty: 'Certifications & Environnement', location: 'Tours' },
  { portrait: '', name: 'Thomas Martin', role: 'Directeur Technique', specialty: 'IoT & Precision Agriculture', location: 'Blois' },
  { portrait: '', name: 'Marie Dupont', role: 'Responsable Communication', specialty: 'Relations Presse & Media', location: 'Orleans' },
];

function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-24 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-neutral-900 leading-[1.15] tracking-[-0.015em] mb-3">
            Notre Equipe
          </h2>
          <p className="text-[15px] lg:text-[16px] font-body text-neutral-700 leading-[1.7]">
            Des agriculteurs, des agronomes et des professionnels unis par la meme passion.
          </p>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              className="text-center group"
            >
              {member.portrait ? (
                <div className="w-[120px] h-[120px] mx-auto mb-4 rounded-full overflow-hidden border-2 border-neutral-200 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.portrait}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-[120px] h-[120px] mx-auto mb-4 rounded-full bg-neutral-200 flex items-center justify-center border-2 border-neutral-200 group-hover:scale-105 transition-transform duration-300">
                  <span className="font-display text-[40px] font-bold text-neutral-400">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
              <p className="text-[16px] font-body font-semibold text-neutral-900 group-hover:text-[#166534] transition-colors duration-200 mb-1">
                {member.name}
              </p>
              <p className="text-[14px] font-body font-medium text-[#166534] mb-1">{member.role}</p>
              <p className="text-[13px] font-body text-neutral-600 mb-1">{member.specialty}</p>
              <div className="flex items-center justify-center gap-1">
                <MapPin size={12} className="text-neutral-500" />
                <span className="text-[12px] font-body text-neutral-500">{member.location}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 5 — Certifications Timeline
   ═══════════════════════════════════════════ */
const certifications = [
  { icon: '/certification-ab.svg', abbr: 'AB', year: '1995', name: "Agriculture Biologique", metric: "100% des productions", color: '#22C55E' },
  { icon: '/certification-hve.svg', abbr: 'HVE', year: '2018', name: "Haute Valeur Environnementale", metric: "Niveau 3", color: '#EAB308' },
  { icon: '/certification-aop.svg', abbr: 'AOP', year: '2002', name: "Appellation d'Origine Protegee", metric: "12 produits", color: '#991B1B' },
  { icon: '/certification-igp.svg', abbr: 'IGP', year: '2005', name: "Indication Geographique Protegee", metric: "18 produits", color: '#2563EB' },
];

function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-neutral-50 py-20 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-neutral-900 leading-[1.15] tracking-[-0.015em] mb-3">
            Nos Certifications
          </h2>
          <p className="text-[15px] lg:text-[16px] font-body text-neutral-700 leading-[1.7]">
            Des labels reconnus qui garantissent la qualite et l'engagement de nos pratiques.
          </p>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 lg:gap-10 mb-12"
        >
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-neutral-300 z-0" />

          {certifications.map((cert) => (
            <motion.div
              key={cert.abbr}
              variants={staggerItem}
              className="relative z-10 text-center w-full md:w-auto"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-3 shadow-sm">
                {cert.icon ? (
                  <img src={cert.icon} alt={cert.abbr} className="w-10 h-10" />
                ) : (
                  <span className="text-[24px] font-body font-bold" style={{ color: cert.color }}>{cert.abbr}</span>
                )}
              </div>
              <p className="font-mono text-[13px] text-neutral-600 mb-1">{cert.year}</p>
              <p className="text-[16px] font-body font-semibold text-neutral-900 mb-1">{cert.name}</p>
              <p className="text-[14px] font-body text-neutral-700">{cert.metric}</p>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn>
          <div className="bg-[#166534] rounded-lg py-6 px-6 lg:px-12 text-center">
            <p className="font-mono text-[14px] text-white">
              100% Bio/HVE · 30 produits AOP/IGP · 70 ans d'experience · 340 agriculteurs
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 6 — CTA Join Us
   ═══════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="bg-[#92400E] py-24 lg:py-28">
      <div className="max-w-[640px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <FadeIn>
          <h2 className="font-display text-[32px] lg:text-[56px] font-semibold text-white leading-[1.1] tracking-[-0.02em] mb-4">
            Faites Partie de l'Histoire
          </h2>
          <p className="text-[17px] lg:text-[19px] font-body text-white/80 leading-[1.65] mb-8">
            Que vous soyez agriculteur, consommateur, distributeur ou investisseur, il y a une place pour vous dans l'aventure TerraFerme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cooperative"
              className="bg-white text-[#92400E] py-4 px-9 rounded-md text-[14px] font-body font-semibold tracking-[0.02em] text-center hover:scale-[1.02] transition-transform duration-200"
            >
              Rejoindre la Cooperative
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-[1.5px] border-white text-white py-4 px-9 rounded-md text-[14px] font-body font-semibold tracking-[0.02em] text-center hover:bg-white hover:text-[#92400E] transition-all duration-200"
            >
              Nous Contacter
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════ */
export default function About() {
  return (
    <div>
      <PageHeader />
      <TimelineSection />
      <ValuesSection />
      <TeamSection />
      <CertificationsSection />
      <CTASection />
    </div>
  );
}
