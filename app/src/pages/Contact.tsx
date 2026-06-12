import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Tractor,
  ShoppingBag,
  Truck,
  TrendingUp,
  PenTool,
  User,
  MapPin,
  Phone,
  Mail,
  Share2,
  Plus,
  Minus,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Users,
  FileText,

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
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
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
    <section className="relative bg-[#166534] pt-36 pb-20 lg:pt-40 lg:pb-20">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <nav className="mb-6">
          <Link to="/" className="text-[13px] font-body text-white/60 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[13px] font-body text-white/60 mx-2">/</span>
          <span className="text-[13px] font-body text-white/60">Contact</span>
        </nav>
        <h1 className="font-display text-[40px] lg:text-[72px] font-bold text-white leading-[1.08] tracking-[-0.025em] mb-6">
          Contactez-Nous
        </h1>
        <p className="text-[17px] lg:text-[19px] font-body text-white/80 leading-[1.65] max-w-[640px] mx-auto">
          Vous etes agriculteur, consommateur, distributeur, investisseur ou journaliste ? Nous avons le bon interlocuteur pour vous.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 2 — Contact Form
   ═══════════════════════════════════════════ */
const audienceTypes = [
  { id: 'agriculteur', label: 'Un Agriculteur', icon: Tractor },
  { id: 'consommateur', label: 'Un Consommateur', icon: ShoppingBag },
  { id: 'distributeur', label: 'Un Distributeur', icon: Truck },
  { id: 'investisseur', label: 'Un Investisseur', icon: TrendingUp },
  { id: 'journaliste', label: 'Un Journaliste', icon: PenTool },
  { id: 'autre', label: 'Autre', icon: User },
] as const;

type AudienceId = (typeof audienceTypes)[number]['id'];

function ConditionalFields({ type }: { type: AudienceId | null }) {
  const inputClass = 'w-full bg-white border border-neutral-200 rounded-lg px-4 py-3 text-[15px] font-body text-neutral-900 placeholder:text-neutral-500 focus:border-[#166534] focus:ring-[3px] focus:ring-[rgba(22,101,52,0.1)] focus:outline-none transition-all';
  const labelClass = 'block text-[13px] font-body font-medium text-neutral-700 mb-1.5';

  return (
    <AnimatePresence mode="wait">
      {type === 'agriculteur' && (
        <motion.div key="agriculteur" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden space-y-4">
          <div><label className={labelClass}>Type d'exploitation</label><select className={inputClass}><option>Viticulture</option><option>Maraichage</option><option>Elevage</option><option>Cereales</option><option>Polyculture</option><option>Autre</option></select></div>
          <div><label className={labelClass}>Surface (hectares)</label><input type="number" className={inputClass} placeholder="Ex: 25" /></div>
          <div><label className={labelClass}>Production actuelle</label><input type="text" className={inputClass} placeholder="Ex: Vin, legumes..." /></div>
        </motion.div>
      )}
      {type === 'consommateur' && (
        <motion.div key="consommateur" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden space-y-4">
          <div><label className={labelClass}>Sujet</label><select className={inputClass}><option>Vente directe</option><option>Point de vente</option><option>Question produit</option><option>Recette</option><option>Autre</option></select></div>
          <div><label className={labelClass}>Ville</label><input type="text" className={inputClass} placeholder="Ex: Tours" /></div>
        </motion.div>
      )}
      {type === 'distributeur' && (
        <motion.div key="distributeur" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden space-y-4">
          <div><label className={labelClass}>Nom de l'entreprise</label><input type="text" className={inputClass} placeholder="Nom de votre entreprise" /></div>
          <div><label className={labelClass}>Volume souhaite</label><input type="text" className={inputClass} placeholder="Ex: 500 kg/mois" /></div>
          <div><label className={labelClass}>Produits d'interet</label>
            <div className="flex flex-wrap gap-3 mt-1">
              {['Fruits', 'Legumes', 'Cereales', 'Viandes', 'Produits Transformes'].map(p => (
                <label key={p} className="flex items-center gap-2 text-[14px] font-body text-neutral-700 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-neutral-200 text-[#166534] focus:ring-[#166534]" />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      {type === 'investisseur' && (
        <motion.div key="investisseur" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden space-y-4">
          <div><label className={labelClass}>Type d'investissement</label><select className={inputClass}><option>Equity</option><option>Debt</option><option>Partenariat</option><option>Subvention</option><option>Autre</option></select></div>
          <div><label className={labelClass}>Montant envisage</label><input type="text" className={inputClass} placeholder="Ex: 50 000 EUR" /></div>
        </motion.div>
      )}
      {type === 'journaliste' && (
        <motion.div key="journaliste" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden space-y-4">
          <div><label className={labelClass}>Media</label><input type="text" className={inputClass} placeholder="Nom du media" /></div>
          <div><label className={labelClass}>Deadline</label><input type="date" className={inputClass} /></div>
          <div><label className={labelClass}>Sujet</label><input type="text" className={inputClass} placeholder="Sujet de votre demande" /></div>
        </motion.div>
      )}
      {type === 'autre' && (
        <motion.div key="autre" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden space-y-4">
          <div><label className={labelClass}>Sujet</label><input type="text" className={inputClass} placeholder="Sujet de votre message" /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactFormSection() {
  const [selectedType, setSelectedType] = useState<AudienceId | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const inputClass = 'w-full bg-white border border-neutral-200 rounded-lg px-4 py-3 text-[15px] font-body text-neutral-900 placeholder:text-neutral-500 focus:border-[#166534] focus:ring-[3px] focus:ring-[rgba(22,101,52,0.1)] focus:outline-none transition-all';
  const labelClass = 'block text-[13px] font-body font-medium text-neutral-700 mb-1.5';

  return (
    <section className="bg-white py-20 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }}
          className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16"
        >
          {/* Left — Form */}
          <div>
            <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-neutral-900 leading-[1.15] tracking-[-0.015em] mb-8">
              Envoyez-Nous un Message
            </h2>

            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              {/* Need type selector */}
              <div>
                <label className={labelClass}>Vous etes</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {audienceTypes.map((type, i) => (
                    <motion.button
                      key={type.id}
                      type="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      onClick={() => setSelectedType(type.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                        selectedType === type.id
                          ? 'border-[#166534] border-2 bg-[rgba(22,101,52,0.05)]'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                      }`}
                    >
                      <type.icon
                        size={20}
                        className={selectedType === type.id ? 'text-[#166534]' : 'text-neutral-600'}
                      />
                      <span className={`text-[13px] font-body font-medium ${
                        selectedType === type.id ? 'text-[#166534]' : 'text-neutral-700'
                      }`}>
                        {type.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Conditional fields */}
              {selectedType && <ConditionalFields type={selectedType} />}

              {/* Common fields */}
              <div className="pt-2 space-y-4">
                <div>
                  <label className={labelClass}>Nom *</label>
                  <input type="text" required className={inputClass} placeholder="Votre nom" />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" required className={inputClass} placeholder="votre@email.com" />
                </div>
                <div>
                  <label className={labelClass}>Telephone</label>
                  <input type="tel" className={inputClass} placeholder="+33 ..." />
                </div>
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea rows={4} className={`${inputClass} resize-none`} placeholder="Votre message..." />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#166534] text-white py-4 px-8 rounded-md text-[14px] font-body font-semibold tracking-[0.02em] hover:bg-[#14532D] hover:scale-[1.01] transition-all duration-200"
              >
                Envoyer
              </button>
            </form>
          </div>

          {/* Right — Context */}
          <div className="lg:pl-8">
            <h3 className="font-display text-[22px] lg:text-[28px] font-semibold text-neutral-900 leading-[1.2] tracking-[-0.01em] mb-6">
              Nous Repondons Rapidement
            </h3>

            <div className="space-y-4 mb-8">
              {[
                { label: 'Agriculteurs: sous 24h', color: 'bg-[#4ADE80]' },
                { label: 'Consommateurs: sous 48h', color: 'bg-[#D97706]' },
                { label: 'Distributeurs: sous 24h', color: 'bg-[#4ADE80]' },
                { label: 'Investisseurs: sous 72h', color: 'bg-[#F59E0B]' },
                { label: 'Journalistes: sous 4h', color: 'bg-[#4ADE80]' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-[14px] font-body text-neutral-700">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#166534]" />
                <span className="text-[14px] font-body text-neutral-700">Pour une urgence agricole: 02 47 XX XX XX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#166534]" />
                <span className="text-[14px] font-body text-neutral-700">Service commercial: commercial@terraferme.coop</span>
              </div>
            </div>

            {/* Certification badges */}
            <div className="flex items-center gap-3">
              {['AB', 'HVE', 'AOP', 'IGP'].map(badge => (
                <span
                  key={badge}
                  className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[11px] font-body font-bold text-neutral-600"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 3 — Contact Information Cards
   ═══════════════════════════════════════════ */
const infoCards = [
  {
    icon: MapPin,
    title: 'Siege Social',
    lines: ["TerraFerme Cooperative Agricole", "12 Rue des Vignes", "37400 Amboise, France"],
  },
  {
    icon: Phone,
    title: 'Telephone',
    lines: ["02 47 XX XX XX"],
    caption: "Lun-Ven, 8h-18h",
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ["contact@terraferme.coop"],
    caption: "Reponse sous 48h",
  },
  {
    icon: Share2,
    title: 'Suivez-Nous',
    lines: [],
    socials: true,
  },
];

function InfoCardsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-neutral-50 py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {infoCards.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="bg-white rounded-xl border border-neutral-200 p-6"
            >
              <card.icon size={24} className="text-[#166534] mb-3" />
              <h4 className="text-[18px] font-body font-semibold text-neutral-900 mb-2">{card.title}</h4>
              {card.lines.map(line => (
                <p key={line} className="text-[14px] font-body text-neutral-700">{line}</p>
              ))}
              {card.caption && <p className="text-[13px] font-body text-neutral-600 mt-1">{card.caption}</p>}
              {card.socials && (
                <div className="flex items-center gap-3 mt-2">
                  {[
                    { icon: Facebook, label: 'Facebook' },
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Twitter, label: 'Twitter' },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href={`#${label}`}
                      className="text-neutral-600 hover:text-[#166534] transition-colors duration-200"
                      aria-label={label}
                    >
                      <Icon size={24} />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 4 — Map & Locations
   ═══════════════════════════════════════════ */
const locations = [
  { name: "Siege Social", address: "12 Rue des Vignes, 37400 Amboise", type: "Principal", color: "text-[#166534]" },
  { name: "Domaine des Roches", address: "Bourgueil, 37460", type: "Viticulture", color: "text-[#F59E0B]" },
  { name: "Ferme des Coteaux", address: "Sancerre, 18300", type: "Maraichage", color: "text-[#4ADE80]" },
  { name: "Centre AgriTech", address: "Tours, 37000", type: "Innovation", color: "text-[#94A3B8]" },
  { name: "Point de Vente Directe", address: "Blois, 41000", type: "Vente", color: "text-[#D97706]" },
];

function MapSection() {
  return (
    <section className="bg-white py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn>
          <div className="relative w-full h-[400px] lg:h-[480px] rounded-xl overflow-hidden bg-neutral-100 mb-8">
            {/* Embedded OpenStreetMap of Centre-Val de Loire */}
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=0.2%2C46.9%2C2.3%2C47.8&layer=mapnik&marker=47.4134%2C0.9830"
              className="absolute inset-0 w-full h-full border-0"
              title="Carte TerraFerme"
              loading="lazy"
            />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {locations.map((loc, i) => (
            <FadeIn key={loc.name} delay={i * 0.1}>
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-[14px] font-body font-semibold text-neutral-900 mb-1">{loc.name}</h4>
                <p className="text-[13px] font-body text-neutral-700 mb-1">{loc.address}</p>
                <span className={`text-[11px] font-body font-medium uppercase tracking-wider ${loc.color}`}>{loc.type}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 5 — FAQ Accordion
   ═══════════════════════════════════════════ */
const faqItems = [
  {
    q: "Comment rejoindre la cooperative TerraFerme ?",
    a: "L'adhesion est simple et gratuite. Remplissez le formulaire de contact en selectionnant 'Agriculteur' et nous vous contacterons sous 24h pour un premier echange.",
  },
  {
    q: "Ou puis-je acheter les produits TerraFerme ?",
    a: "Nos produits sont disponibles en vente directe a nos fermes, dans nos points de collecte partenaires, et chez les distributeurs bio references sur notre carte.",
  },
  {
    q: "Quelles certifications portent vos produits ?",
    a: "Tous nos produits sont certifies Agriculture Biologique (AB) et/ou Haute Valeur Environnementale (HVE) Niveau 3. Certains portent egalement les labels AOP ou IGP.",
  },
  {
    q: "Proposez-vous des visites de fermes ?",
    a: "Oui ! Nous organisons des journees portes ouvertes mensuelles et des visites guidees sur reservation. Consultez notre calendrier dans la section Fermes.",
  },
  {
    q: "Comment fonctionne l'accompagnement AgriTech ?",
    a: "Nos membres Cooperateur et Premium beneficient d'un accompagnement complet: installation de capteurs IoT, vols drones, acces a la plateforme analytics et formation.",
  },
  {
    q: "Quelle est la zone geographique de la cooperative ?",
    a: "Nous couvrons principalement la region Centre-Val de Loire, avec des fermes partenaires dans l'Indre-et-Loire, le Cher, le Loir-et-Cher et le Loiret.",
  },
  {
    q: "Etes-vous ouverts aux partenariats de recherche ?",
    a: "Absolument. Nous collaborons avec l'INRAE, l'Institut Agro et plusieurs startups AgriTech. Contactez-nous via le formulaire en selectionnant 'Autre'.",
  },
  {
    q: "Comment devenir distributeur partenaire ?",
    a: "Remplissez le formulaire en selectionnant 'Distributeur'. Notre service commercial vous contactera sous 24h pour etudier ensemble les opportunites.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-neutral-50 py-20 lg:py-20">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-neutral-900 leading-[1.15] tracking-[-0.015em]">
            Questions Frequentes
          </h2>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-0"
        >
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="border-b border-neutral-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-[14px] font-body font-semibold text-neutral-900 pr-4 group-hover:text-[#166534] transition-colors">
                  {item.q}
                </span>
                <span className="shrink-0 text-neutral-600 transition-transform duration-300">
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                    className="overflow-hidden"
                  >
                    <p className="text-[14px] font-body text-neutral-700 leading-[1.7] pb-5">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 6 — Quick Links
   ═══════════════════════════════════════════ */
const quickLinks = [
  { icon: Users, label: "Rejoindre la Cooperative", to: "/cooperative" },
  { icon: ShoppingBag, label: "Acheter Nos Produits", to: "/products" },
  { icon: MapPin, label: "Visiter une Ferme", to: "/farms" },
  { icon: FileText, label: "Espace Presse", to: "/news" },
];

function QuickLinksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn className="text-center mb-10">
          <h3 className="font-display text-[22px] lg:text-[28px] font-semibold text-neutral-900 leading-[1.2] tracking-[-0.01em]">
            Vous Cherchez Autre Chose ?
          </h3>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {quickLinks.map((link) => (
            <motion.div key={link.label} variants={staggerItem}>
              <Link
                to={link.to}
                className="flex items-center gap-4 p-6 bg-neutral-50 rounded-xl border border-neutral-200 hover:bg-neutral-100 hover:border-[#166534] transition-all duration-200"
              >
                <link.icon size={24} className="text-[#166534] shrink-0" />
                <span className="text-[14px] font-body font-semibold text-neutral-900">{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════ */
export default function Contact() {
  return (
    <div>
      <PageHeader />
      <ContactFormSection />
      <InfoCardsSection />
      <MapSection />
      <FAQSection />
      <QuickLinksSection />
    </div>
  );
}
