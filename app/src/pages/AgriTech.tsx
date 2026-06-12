import { useState, useEffect, useRef, memo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Wifi,
  Plane,
  Brain,
  Check,
  ArrowRight,
  BarChart3,
  Droplets,
  AlertTriangle,
  Leaf,
  CloudSun,
  FileText,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Easing                                                             */
/* ------------------------------------------------------------------ */
const easeExpoOut = [0.19, 1, 0.22, 1] as [number, number, number, number]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const staggerChild = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeExpoOut },
  },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const tickerItems = [
  '+23% rendement moyen',
  '-31% utilisation d\'eau',
  '-15% intrants',
  '340 capteurs actifs',
  '24/7 monitoring',
]

const techCards = [
  {
    icon: Wifi,
    title: 'Capteurs IoT',
    desc: '340 capteurs de sol, meteo et hydriques delivrent des donnees en temps reel sur l\'integralite de nos parcelles.',
    metric: 'Donnees toutes les 15 min',
  },
  {
    icon: Plane,
    title: 'Drones & Imagerie',
    desc: '12 drones equipes de cameras multispectrales realisent des cartographies NDVI hebdomadaires pour detecter le stress vegetal.',
    metric: '+23% detection precoce',
  },
  {
    icon: Brain,
    title: 'Intelligence Artificielle',
    desc: 'Notre algorithme d\'IA predit les rendements, optimise l\'irrigation et recommande les traitements avec une precision de 94%.',
    metric: '94% precision predictive',
  },
]

const iotFeatures = [
  'Humidite du sol a 3 profondeurs',
  'Temperature et pH en temps reel',
  'Alertes automatiques par SMS/app',
  'Historique de donnees sur 5 ans',
  'Integration avec les systemes d\'irrigation',
]

const droneFeatures = [
  '5 bandes spectrales (R, G, B, Red Edge, NIR)',
  'Cartographie NDVI hebdomadaire',
  'Detection precoce de stress hydrique',
  'Comptage de plants automatise',
  'Suivi de la maturite des recoltes',
]

const dashboardFeatures = [
  { icon: BarChart3, title: 'Predictions de Rendement', metric: '+/- 5% de precision a J-30' },
  { icon: Droplets, title: 'Optimisation d\'Irrigation', metric: '-31% d\'economie d\'eau' },
  { icon: AlertTriangle, title: 'Detection de Maladies', metric: 'Alertes 7-10 jours avant symptomes' },
  { icon: Leaf, title: 'Gestion des Intrants', metric: '-15% d\'engrais, +8% de rendement' },
  { icon: CloudSun, title: 'Meteo Localisee', metric: 'Previsions a l\'heure par parcelle' },
  { icon: FileText, title: 'Rapports Automatiques', metric: 'PDF hebdo pour chaque exploitation' },
]

const testimonials = [
  {
    portrait: '/farmer-portrait-1.jpg',
    quote: 'Les capteurs m\'ont permis de reduire mon irrigation de 35% tout en augmentant mes rendements de tomates de 18%. Les alertes en temps reel sont precieuses.',
    name: 'Pierre Martin',
    role: 'Maraicher, 12 hectares',
    metric: '+18% rendement · -35% eau',
  },
  {
    portrait: '/farmer-portrait-2.jpg',
    quote: 'La cartographie NDVI m\'a revele des zones de stress que je ne voyais pas a l\'oeil nu. J\'ai pu intervenir 10 jours plus tot et sauver 40% de ma parcelle.',
    name: 'Camille Rousseau',
    role: 'Agronome, cereales',
    metric: '-40% pertes · +12% rendement',
  },
  {
    portrait: '/farmer-portrait-3.jpg',
    quote: 'L\'application mobile me donne acces aux donnees de mes capteurs ou que je sois. Je peux prendre des decisions eclairees meme quand je suis au marche.',
    name: 'Andre Legrand',
    role: 'Viticulteur, 45 hectares',
    metric: '+23% rendement · -20% intrants',
  },
]

const resultsMetrics = [
  { value: '+23%', label: 'rendement' },
  { value: '-31%', label: 'eau' },
  { value: '-15%', label: 'intrants' },
  { value: '94%', label: 'precision IA' },
]

/* ------------------------------------------------------------------ */
/*  Animated counter (isolated + memo)                                 */
/* ------------------------------------------------------------------ */
const AnimatedCounter = memo(function AnimatedCounter({
  target,
  suffix = '',
}: {
  target: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const numeric = parseFloat(target.replace(/[^0-9.-]/g, ''))
    const prefix = target.match(/^[^0-9]/)?.[0] || ''
    const duration = 2000
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numeric * eased
      if (Number.isInteger(numeric)) {
        setDisplay(prefix + Math.round(current) + suffix)
      } else {
        setDisplay(prefix + current.toFixed(0) + suffix)
      }
      if (progress < 1) requestAnimationFrame(tick)
      else setDisplay(target)
    }
    requestAnimationFrame(tick)
  }, [isInView, target, suffix])

  return <span ref={ref}>{display}</span>
})

/* ------------------------------------------------------------------ */
/*  Data Ticker (isolated perpetual animation)                         */
/* ------------------------------------------------------------------ */
const DataTicker = memo(function DataTicker() {
  const duplicated = [...tickerItems, ...tickerItems, ...tickerItems]
  return (
    <div className="w-full overflow-hidden py-4">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm text-[#4ADE80] shrink-0"
          >
            {item} &nbsp;·&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  )
})

/* ------------------------------------------------------------------ */
/*  Sensor data card with typewriter effect                            */
/* ------------------------------------------------------------------ */
const SensorDataCard = memo(function SensorDataCard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShow(true), 500)
      return () => clearTimeout(t)
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      className="mt-4 p-4 rounded-lg flex gap-4 flex-wrap"
      style={{ background: '#1C1917' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {show && (
          <>
            <motion.span
              className="font-mono text-sm text-[#4ADE80]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0 }}
            >
              Humidite: 62%
            </motion.span>
            <motion.span
              className="font-mono text-sm text-[#4ADE80]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              pH: 6.8
            </motion.span>
            <motion.span
              className="font-mono text-sm text-[#4ADE80]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Temp: 18.2°C
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */
export default function AgriTech() {
  const [ndviTab, setNdviTab] = useState<'real' | 'ndvi'>('real')

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* SECTION 1 — Page Header                                       */}
      {/* ============================================================ */}
      <section
        className="w-full pt-36 md:pt-44 pb-20 md:pb-24 px-4 sm:px-8 lg:px-12"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Breadcrumbs */}
          <motion.p
            className="text-sm mb-6"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>AgriTech</span>
          </motion.p>

          {/* Caption */}
          <motion.p
            className="font-body text-xs font-medium tracking-[0.04em] uppercase text-[#4ADE80] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeExpoOut }}
          >
            AGRICULTURE DE PRECISION
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-display font-bold text-white mb-6"
            style={{
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: easeExpoOut }}
          >
            L&apos;Intelligence au Service des Champs
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="font-body text-lg max-w-xl mx-auto mb-10"
            style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeExpoOut, delay: 0.3 }}
          >
            Capteurs IoT, drones, intelligence artificielle et data analytics optimisent chaque recolte tout en preservant les sols et la biodiversite.
          </motion.p>

          {/* Data Ticker */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: easeExpoOut, delay: 0.5 }}
          >
            <DataTicker />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Technology Overview                               */}
      {/* ============================================================ */}
      <section className="w-full py-20 md:py-24 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Intro */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: easeExpoOut }}
          >
            <h2
              className="font-display font-semibold text-[#1C1917] mb-4"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Une Agriculture Connectee et Durable
            </h2>
            <p
              className="font-body text-lg"
              style={{ color: '#44403C', lineHeight: 1.65 }}
            >
              TerraFerme a investi dans les technologies de precision agricole depuis 2018. Aujourd&apos;hui, notre reseau de 340 capteurs IoT, 12 drones et une plateforme d&apos;analyse AI couvre l&apos;integralite de nos 12 500 hectares.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {techCards.map((card) => (
              <motion.div
                key={card.title}
                className="bg-white border border-[#E7E5E4] rounded-xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:border-[#166534] cursor-default"
                variants={staggerChild}
              >
                <card.icon size={48} className="text-[#166534] mb-5" />
                <h3
                  className="font-display font-semibold text-[#1C1917] mb-3"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', lineHeight: 1.2, letterSpacing: '-0.01em' }}
                >
                  {card.title}
                </h3>
                <p className="font-body text-[15px] md:text-base text-[#44403C] mb-4" style={{ lineHeight: 1.7 }}>
                  {card.desc}
                </p>
                <p className="font-mono text-sm text-[#166534]">{card.metric}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — IoT Sensors & Soil Monitoring                     */}
      {/* ============================================================ */}
      <section className="w-full py-20 md:py-24 px-4 sm:px-8 lg:px-12" style={{ background: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeExpoOut }}
          >
            <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-[#166534] mb-3">
              CAPTEURS CONNECTES
            </p>
            <h2
              className="font-display font-semibold text-[#1C1917] mb-4"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
            >
              Le Sol Nous Parle
            </h2>
            <p
              className="font-body text-lg text-[#44403C] mb-6"
              style={{ lineHeight: 1.65 }}
            >
              Nos capteurs IoT mesurent en continu l&apos;humidite du sol, la temperature, le pH, la conductivite electrique et les niveaux de NPK. Les donnees sont transmises en temps reel a notre plateforme cloud et analysees par nos agronomes.
            </p>
            <ul className="space-y-3 mb-8">
              {iotFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check size={18} className="text-[#166534] mt-0.5 shrink-0" />
                  <span className="font-body text-[15px] text-[#1C1917]">{f}</span>
                </li>
              ))}
            </ul>
            <button
              className="px-8 py-3.5 border-[1.5px] border-[#166534] text-[#166534] rounded-md font-body text-sm font-semibold tracking-[0.02em] transition-all duration-200 hover:bg-[#166534] hover:text-white"
              type="button"
            >
              En Savoir Plus sur l&apos;IoT
            </button>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: easeExpoOut }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/agritech-capteurs.jpg"
                alt="IoT soil sensor in rich dark soil with green shoots"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <SensorDataCard />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Drone Imaging & NDVI                              */}
      {/* ============================================================ */}
      <section className="w-full py-20 md:py-24 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
          {/* Left — Image + NDVI toggle */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: easeExpoOut }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg relative">
              <AnimatePresence mode="wait">
                {ndviTab === 'real' ? (
                  <motion.img
                    key="real"
                    src="/agritech-drone.jpg"
                    alt="Agricultural drone over crop field"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.div
                    key="ndvi"
                    className="w-full aspect-square relative"
                    style={{ background: 'linear-gradient(135deg, #1a472a 0%, #2d5016 30%, #86efac 60%, #14532d 100%)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-mono text-xs uppercase tracking-wider text-white/70 mb-2">NDVI Heatmap</p>
                        <p className="font-mono text-2xl text-[#4ADE80]">0.72 moyenne</p>
                      </div>
                    </div>
                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Toggle */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setNdviTab('real')}
                className="px-4 py-2 rounded-md font-body text-sm font-medium transition-all duration-200"
                style={{
                  background: ndviTab === 'real' ? '#166534' : '#F5F5F4',
                  color: ndviTab === 'real' ? '#FFFFFF' : '#44403C',
                }}
                type="button"
              >
                Photo reelle
              </button>
              <button
                onClick={() => setNdviTab('ndvi')}
                className="px-4 py-2 rounded-md font-body text-sm font-medium transition-all duration-200"
                style={{
                  background: ndviTab === 'ndvi' ? '#166534' : '#F5F5F4',
                  color: ndviTab === 'ndvi' ? '#FFFFFF' : '#44403C',
                }}
                type="button"
              >
                Carte NDVI
              </button>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeExpoOut }}
          >
            <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-[#166534] mb-3">
              IMAGERIE AERIENNE
            </p>
            <h2
              className="font-display font-semibold text-[#1C1917] mb-4"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
            >
              Le Ciel Nous Guide
            </h2>
            <p
              className="font-body text-lg text-[#44403C] mb-6"
              style={{ lineHeight: 1.65 }}
            >
              Nos drones agricoles equipes de cameras multispectrales capturent des images dans 5 bandes spectrales. Ces donnees generent des cartographies NDVI qui revelent la sante de chaque plante individuellement.
            </p>
            <ul className="space-y-3 mb-8">
              {droneFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check size={18} className="text-[#166534] mt-0.5 shrink-0" />
                  <span className="font-body text-[15px] text-[#1C1917]">{f}</span>
                </li>
              ))}
            </ul>
            <button
              className="px-8 py-3.5 border-[1.5px] border-[#166534] text-[#166534] rounded-md font-body text-sm font-semibold tracking-[0.02em] transition-all duration-200 hover:bg-[#166534] hover:text-white"
              type="button"
            >
              Decouvrir l&apos;Imagerie Drone
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Data Dashboard & AI Analytics                     */}
      {/* ============================================================ */}
      <section
        className="w-full py-24 md:py-32 px-4 sm:px-8 lg:px-12"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: easeExpoOut }}
          >
            <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-[#4ADE80] mb-3">
              PLATEFORME TERRAFERME ANALYTICS
            </p>
            <h2
              className="font-display font-semibold text-white mb-4"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Vos Champs sur un Ecran
            </h2>
            <p
              className="font-body text-lg"
              style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}
            >
              Notre plateforme centralise toutes les donnees capteurs, drone et meteo. L&apos;IA analyse les correlations et genere des recommandations actionnables pour chaque parcelle.
            </p>
          </motion.div>

          {/* Dashboard mockup */}
          <motion.div
            className="rounded-xl overflow-hidden mb-16"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <img
              src="/agritech-precision.jpg"
              alt="TerraFerme Analytics dashboard showing crop health map and sensor data"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Feature grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {dashboardFeatures.map((feat) => (
              <motion.div
                key={feat.title}
                className="flex gap-4"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeExpoOut } },
                }}
              >
                <feat.icon size={24} className="text-[#4ADE80] shrink-0 mt-1" />
                <div>
                  <h4 className="font-body text-base font-semibold text-white mb-1">
                    {feat.title}
                  </h4>
                  <p className="font-mono text-sm text-[#4ADE80]">{feat.metric}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — Results & Farmer Testimonials                     */}
      {/* ============================================================ */}
      <section className="w-full py-20 md:py-24 px-4 sm:px-8 lg:px-12" style={{ background: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeExpoOut }}
          >
            <h2
              className="font-display font-semibold text-[#1C1917] mb-3"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
            >
              Resultats Concrets, Paysans Convaincus
            </h2>
            <p className="font-body text-[15px] text-[#44403C]">
              Decouvrez comment l&apos;AgriTech transforme le quotidien de nos agriculteurs.
            </p>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                className="bg-white border border-[#E7E5E4] rounded-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
                variants={staggerChild}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.portrait}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-body text-sm font-semibold text-[#1C1917]">{t.name}</p>
                    <p className="font-body text-xs text-[#57534E]">{t.role}</p>
                  </div>
                </div>
                <p
                  className="font-body text-[15px] text-[#44403C] mb-4 italic"
                  style={{ lineHeight: 1.7 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-mono text-sm text-[#166534]">{t.metric}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Results bar */}
          <motion.div
            className="rounded-xl py-8 px-6 md:px-12"
            style={{ background: '#166534' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: easeExpoOut }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {resultsMetrics.map((m) => (
                <div key={m.label}>
                  <p
                    className="font-mono text-2xl md:text-3xl text-white font-bold"
                  >
                    <AnimatedCounter target={m.value} />
                  </p>
                  <p className="font-body text-sm text-white/80 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — CTA                                               */}
      {/* ============================================================ */}
      <section className="w-full py-20 md:py-24 px-4 sm:px-8 lg:px-12" style={{ background: '#166534' }}>
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: easeExpoOut }}
        >
          <h2
            className="font-display font-semibold text-white mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Pret a Transformer Votre Exploitation ?
          </h2>
          <p
            className="font-body text-lg mb-8"
            style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}
          >
            Que vous soyez agriculteur membre ou partenaire technologique, decouvrez comment l&apos;AgriTech TerraFerme peut revolutionner votre rendement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-[#166534] rounded-md font-body text-sm font-semibold tracking-[0.02em] transition-all duration-200 hover:scale-[1.02]"
              type="button"
            >
              Demander une Demo
              <ArrowRight size={16} />
            </button>
            <button
              className="inline-flex items-center justify-center px-9 py-4 border-[1.5px] border-white text-white rounded-md font-body text-sm font-semibold tracking-[0.02em] transition-all duration-200 hover:bg-white hover:text-[#166534]"
              type="button"
            >
              Devenir Partenaire
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
