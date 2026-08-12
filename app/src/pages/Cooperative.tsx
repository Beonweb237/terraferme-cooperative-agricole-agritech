import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Cpu,
  Handshake,
  Users,
  Shield,
  Package,
  FileCheck,
  Store,
  Check,
  X,
  Calendar,
  Settings,
  Briefcase,
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
    <section className="relative bg-cover bg-center pt-36 pb-24 lg:pt-40 lg:pb-28" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80)',
    }}>
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(22,101,52,0.7) 0%, rgba(22,101,52,0.9) 100%)',
        }}
      />
      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <nav className="mb-6">
          <Link to="/" className="text-[13px] font-body text-white/60 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[13px] font-body text-white/60 mx-2">/</span>
          <span className="text-[13px] font-body text-white/60">Cooperative</span>
        </nav>
        <p className="text-[13px] font-body font-medium uppercase tracking-[0.04em] text-[#D97706] mb-4">
          COOPERATIVE AGRICOLE
        </p>
        <h1 className="font-display text-[40px] lg:text-[72px] font-bold text-white leading-[1.08] tracking-[-0.025em] mb-6">
          Ensemble, Cultivons l'Avenir
        </h1>
        <p className="text-[17px] lg:text-[19px] font-body text-white/80 leading-[1.65] max-w-[640px] mx-auto mb-6">
          TerraFerme, c'est 340 agriculteurs unis par les memes valeurs: qualite, durabilite, innovation et solidarite. Rejoignez-nous et beneficiez d'un accompagnement complet.
        </p>
        <p className="font-mono text-[14px] text-[#D97706]">340 agriculteurs · 12 500 ha · +23% revenu moyen</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 2 — Why Join (Benefits)
   ═══════════════════════════════════════════ */
const benefitCards = [
  {
    icon: Cpu,
    title: 'Accompagnement Technologique',
    body: 'Acces gratuit a nos capteurs IoT, drones et plateforme analytics. Formation incluse pour maitriser les outils de precision agriculture.',
    badge: 'inclus',
    badgeColor: 'bg-[#166534]',
  },
  {
    icon: Handshake,
    title: 'Force Commerciale Collective',
    body: 'Negociation collective des prix, acces a 250+ points de vente, relations directes avec la grande distribution et les exportateurs.',
    badge: '+23% revenu moyen',
    badgeColor: 'bg-[#D97706]',
  },
  {
    icon: Users,
    title: 'Formation & Reseau',
    body: '12 sessions de formation par an, mentorat par les agriculteurs seniors, evenements communautaires et partage des bonnes pratiques.',
    badge: '12 formules/an',
    badgeColor: 'bg-[#166534]',
  },
];

const benefitStrips = [
  { icon: Shield, label: "Assurance mutuelle groupee", value: "-15% sur vos primes" },
  { icon: Package, label: "Achat groupe d'intrants", value: "-12% sur les engrais et semences" },
  { icon: FileCheck, label: "Acces prioritaire aux subventions", value: "Accompagnement dossier" },
  { icon: Store, label: "Vente directe supportee", value: "250+ points de collecte" },
];

function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-24 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center max-w-[640px] mx-auto mb-16">
          <h2 className="font-display text-[32px] lg:text-[56px] font-semibold text-neutral-900 leading-[1.1] tracking-[-0.02em] mb-4">
            Pourquoi Rejoindre TerraFerme ?
          </h2>
          <p className="text-[17px] lg:text-[19px] font-body text-neutral-700 leading-[1.65]">
            Notre cooperative offre a ses membres un accompagnement integral: technologique, commercial, formationnel et solidaire.
          </p>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {benefitCards.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="bg-white rounded-xl border border-neutral-200 p-8 lg:p-10 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <card.icon size={48} className="text-[#166534] mb-5" />
              <h3 className="font-display text-[22px] lg:text-[28px] font-semibold text-neutral-900 leading-[1.2] tracking-[-0.01em] mb-3">
                {card.title}
              </h3>
              <p className="text-[15px] lg:text-[16px] font-body text-neutral-700 leading-[1.7] mb-4">
                {card.body}
              </p>
              <span className={`inline-block text-[11px] font-body font-medium text-white px-3 py-1 rounded-full ${card.badgeColor}`}>
                {card.badge}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-0">
          {benefitStrips.map((strip, i) => (
            <FadeIn key={strip.label} delay={i * 0.1}>
              <div className={`flex items-center gap-4 px-6 py-5 ${i % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}`}>
                <strip.icon size={24} className="text-[#166534] shrink-0" />
                <span className="text-[15px] font-body text-neutral-900 flex-1">{strip.label}</span>
                <span className="text-[14px] font-body font-medium text-[#166534]">{strip.value}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 3 — Membership Tiers
   ═══════════════════════════════════════════ */
const tiers = [
  {
    name: 'Adherent',
    price: '0 EUR/mois',
    period: "Puis 2% du CA",
    features: [
      "Acces au reseau TerraFerme",
      "Newsletter et actualites",
      "1 session de formation/an",
      "Acces aux evenements communautaires",
      "Vente directe basique",
    ],
    missing: ["Capteurs IoT", "Drones", "Plateforme Analytics"],
    popular: false,
  },
  {
    name: 'Cooperateur',
    price: '150 EUR/mois',
    period: "Puis 1.5% du CA",
    features: [
      "Tout Adherent +",
      "Capteurs IoT complets (10 capteurs)",
      "1 vol drone/mois",
      "Acces plateforme Analytics",
      "6 sessions de formation/an",
      "Mentorat personnalise",
      "Negociation commerciale groupee",
      "Assurance mutuelle groupee",
    ],
    missing: [],
    popular: true,
  },
  {
    name: 'Premium',
    price: '350 EUR/mois',
    period: "Puis 1% du CA",
    features: [
      "Tout Cooperateur +",
      "Capteurs illimites",
      "Drones illimites",
      "IA predictive personnalisee",
      "Formations illimitees",
      "Conseiller dedie",
      "Acces prioritaire aux subventions",
      "Export et RHD",
    ],
    missing: [],
    popular: false,
  },
];

function TierSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-neutral-50 py-24 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-neutral-900 leading-[1.15] tracking-[-0.015em] mb-3">
            Choisissez Votre Engagement
          </h2>
          <p className="text-[15px] lg:text-[16px] font-body text-neutral-700 leading-[1.7]">
            Trois niveaux d'adhesion adaptes a votre exploitation.
          </p>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className={`relative rounded-xl p-8 lg:p-10 transition-all duration-300 ${tier.popular
                  ? 'bg-white border-2 border-[#D97706] shadow-[0_8px_32px_rgba(217,119,6,0.15)] md:scale-[1.03]'
                  : 'bg-white border border-neutral-200'
                }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D97706] text-neutral-900 text-[11px] font-body font-semibold uppercase tracking-wider px-4 py-1 rounded-full">
                  PLUS POPULAIRE
                </span>
              )}
              <h3 className="text-[18px] font-body font-semibold text-neutral-900 mb-1">{tier.name}</h3>
              <p className="font-display text-[32px] lg:text-[40px] font-bold leading-[1.15] mb-1"
                style={{ color: tier.popular ? '#166534' : '#1C1917' }}>
                {tier.price}
              </p>
              <p className="text-[13px] font-body text-neutral-600 uppercase tracking-[0.04em] mb-6">{tier.period}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={18} className="text-[#166534] shrink-0 mt-0.5" />
                    <span className="text-[14px] font-body text-neutral-700">{f}</span>
                  </li>
                ))}
                {tier.missing.map((m) => (
                  <li key={m} className="flex items-start gap-3 opacity-50">
                    <X size={18} className="text-neutral-400 shrink-0 mt-0.5" />
                    <span className="text-[14px] font-body text-neutral-400 line-through">{m}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 px-8 rounded-md text-[14px] font-body font-semibold tracking-[0.02em] transition-all duration-200 ${tier.popular
                    ? 'bg-[#166534] text-white hover:bg-[#14532D] hover:scale-[1.02]'
                    : 'bg-transparent border-[1.5px] border-[#166534] text-[#166534] hover:bg-[#166534] hover:text-white'
                  }`}
              >
                Devenir {tier.name}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 4 — Governance Model
   ═══════════════════════════════════════════ */
const governanceSteps = [
  {
    icon: Users,
    title: "Assemblee Generale",
    desc: "Tous les adherents se reunissent annuellement pour valider la strategie et elire le Conseil d'Administration.",
  },
  {
    icon: Calendar,
    title: "Conseil d'Administration",
    desc: "15 agriculteurs elus pour 3 ans. Decide des orientations strategiques et nomme la Direction.",
  },
  {
    icon: Settings,
    title: "Commission Techniques",
    desc: "5 commissions specialisees (viticulture, maraichage, elevage, AgriTech, durabilite) formees d'experts et d'agriculteurs.",
  },
  {
    icon: Briefcase,
    title: "Direction Executive",
    desc: "Equipe de direction professionnelle qui execute les decisions et gere les operations quotidiennes.",
  },
];

function GovernanceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-24 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-neutral-900 leading-[1.15] tracking-[-0.015em] mb-3">
            Une Gouvernance Democratique
          </h2>
          <p className="text-[15px] lg:text-[16px] font-body text-neutral-700 leading-[1.7] max-w-[640px] mx-auto">
            Chez TerraFerme, chaque agriculteur a voix au chapitre. Notre gouvernance repose sur la democratie participative.
          </p>
        </FadeIn>

        <div ref={ref} className="relative max-w-[720px] mx-auto mb-16">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[#166534]/20" />

          <div className="space-y-12">
            {governanceSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }}
                className={`relative flex items-start gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`flex-1 ${i % 2 === 1 ? 'md:text-right' : ''} pl-16 md:pl-0`}>
                  <h4 className="text-[18px] lg:text-[22px] font-body font-semibold text-neutral-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[15px] font-body text-neutral-700 leading-[1.7]">{step.desc}</p>
                </div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-[#166534] flex items-center justify-center shrink-0 z-10">
                  <step.icon size={20} className="text-white" />
                </div>
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        <FadeIn>
          <div className="bg-[#166534] rounded-lg py-8 px-6 lg:px-12 text-center">
            <p className="font-mono text-[14px] text-white">
              15 administrateurs elus · 5 commissions techniques · 1 AG/an · 340 votes
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 5 — Farmer Testimonials
   ═══════════════════════════════════════════ */
const testimonials = [
  {
    portrait: '/farmer-portrait-1.jpg',
    quote: "J'ai rejoint TerraFerme il y a 5 ans. Aujourd'hui, mes revenus ont augmente de 30% et j'ai acces a des outils que je n'aurais jamais pu m'offrir seul.",
    name: 'Pierre Martin',
    role: 'Cooperateur depuis 2021, viticulteur',
    badge: 'Cooperateur',
  },
  {
    portrait: '/farmer-portrait-2.jpg',
    quote: "La formation en AgriTech m'a permis de moderniser mon exploitation sans perdre mes valeurs. Le mentorat des seniors est inestimable.",
    name: 'Camille Rousseau',
    role: "Adherente depuis 2024, agronome",
    badge: 'Adherente',
  },
  {
    portrait: '/farmer-portrait-3.jpg',
    quote: "Trente ans de collaboration. Trois generations. TerraFerme a ete le tremplin pour que mon fils reprenne l'exploitation avec un projet moderne.",
    name: 'Andre Legrand',
    role: 'Cooperateur Premium, eleveur',
    badge: 'Premium',
  },
];

function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-neutral-900 py-24 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center mb-16">
          <p className="text-[13px] font-body font-medium uppercase tracking-[0.04em] text-[#D97706] mb-3">
            TEMOIGNAGES
          </p>
          <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-white leading-[1.15] tracking-[-0.015em]">
            Ils Ont Choisi TerraFerme
          </h2>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="rounded-xl p-8 lg:p-10 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={t.portrait}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#D97706]"
                />
                <div>
                  <p className="text-[16px] font-body font-semibold text-white">{t.name}</p>
                  <p className="text-[14px] font-body text-neutral-500">{t.role}</p>
                </div>
              </div>
              <Quote size={20} className="text-[#D97706] mb-3 opacity-60" />
              <p className="text-[15px] font-body text-white/85 italic leading-[1.7] font-display mb-5">
                {t.quote}
              </p>
              <span className="inline-block text-[11px] font-body font-medium bg-[#D97706] text-neutral-900 px-3 py-1 rounded-full">
                {t.badge}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 6 — Join CTA
   ═══════════════════════════════════════════ */
function JoinCTA() {
  return (
    <section className="bg-[#D97706] py-24 lg:py-28">
      <div className="max-w-[640px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <FadeIn>
          <h2 className="font-display text-[32px] lg:text-[56px] font-semibold text-neutral-900 leading-[1.1] tracking-[-0.02em] mb-4">
            Rejoignez les 340 Agriculteurs TerraFerme
          </h2>
          <p className="text-[17px] lg:text-[19px] font-body text-neutral-800 leading-[1.65] mb-8">
            L'adhesion est gratuite et sans engagement. Commencez votre parcours et decouvrez les avantages de la cooperative.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-neutral-900 text-white py-4 px-9 rounded-md text-[14px] font-body font-semibold tracking-[0.02em] hover:scale-[1.02] transition-transform duration-200">
              S'inscrire Gratuitement
            </button>
            <button className="bg-transparent border-[1.5px] border-neutral-900 text-neutral-900 py-4 px-9 rounded-md text-[14px] font-body font-semibold tracking-[0.02em] hover:bg-neutral-900 hover:text-white transition-all duration-200">
              Demander une Info
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════ */
export default function Cooperative() {
  return (
    <div>
      <PageHeader />
      <BenefitsSection />
      <TierSection />
      <GovernanceSection />
      <TestimonialsSection />
      <JoinCTA />
    </div>
  );
}
