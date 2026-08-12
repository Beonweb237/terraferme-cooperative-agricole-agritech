import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Leaf, ArrowRight, ShoppingCart, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  HERO SECTION                                                        */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const els = contentRef.current.children
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(els[0], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' })
      .fromTo(els[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.5')
      .fromTo(els[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.4')
      .fromTo(els[3], { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')

    return () => { tl.kill() }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] pt-[72px] overflow-hidden" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(28,25,23,0.3) 0%, rgba(28,25,23,0.45) 60%, rgba(28,25,23,0.75) 100%)',
        }}
      />
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-end min-h-[100dvh] pb-24 px-4 sm:px-8"
      >
        <h1
          className="font-display text-white text-center font-bold max-w-[720px]"
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            textShadow: '0 2px 40px rgba(0,0,0,0.3)',
          }}
        >
          De la Terre a l&apos;Assiette, avec Intelligence
        </h1>
        <p className="text-white/85 text-base sm:text-lg text-center max-w-[560px] mt-4 font-body leading-relaxed">
          Cultivons l&apos;avenir ensemble — agriculture regenerative, technologies de precision, produits locaux de qualite.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/products"
            className="bg-white text-neutral-900 px-8 py-4 rounded-md text-sm font-semibold tracking-wide hover:bg-neutral-100 hover:scale-[1.02] transition-all duration-200 text-center"
          >
            Decouvrir Nos Produits
          </Link>
          <Link
            to="/cooperative"
            className="bg-transparent border border-white text-white px-8 py-4 rounded-md text-sm font-semibold tracking-wide hover:bg-white/10 hover:scale-[1.02] transition-all duration-200 text-center"
          >
            Rejoindre la Cooperative
          </Link>
        </div>
        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce-gentle">
          <span className="text-white/50 text-xs uppercase tracking-wider font-body">Defiler</span>
          <ChevronDown className="text-white/50" size={20} />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SEASONAL MANIFESTO SECTION                                         */
/* ------------------------------------------------------------------ */
function SeasonalManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-content',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24 px-4 sm:px-8 lg:px-12">
      <div className="manifesto-content max-w-[680px] mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-8 h-8 rounded-full bg-[#4ADE80] flex items-center justify-center">
            <Leaf size={14} className="text-white" />
          </span>
          <span className="font-body text-neutral-900 font-semibold text-base">Printemps 2026</span>
        </div>
        <h2
          className="font-display text-neutral-900 font-semibold mb-6"
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Chaque saison a son histoire. Chaque produit a son terroir.
        </h2>
        <p className="text-neutral-700 text-base sm:text-lg leading-relaxed max-w-[560px] mx-auto mb-6 font-body">
          Depuis trois generations, TerraFerme allie le savoir-faire paysan a l&apos;innovation technologique.
          Nos 340 agriculteurs cultivent plus de 12 000 hectares en agriculture biologique et HVE,
          produisant fruits, legumes, cereales et viandes dans le respect des saisons et des sols.
        </p>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-[#166534] font-medium text-sm hover:underline underline-offset-4 transition-all duration-200 font-body"
        >
          Notre Histoire <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  PRODUCT CARD                                                        */
/* ------------------------------------------------------------------ */
interface ProductCardProps {
  image: string
  name: string
  price: string
  season: string
  seasonColor: string
  certifications: string[]
}

function ProductCard({ image, name, price, season, seasonColor, certifications }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: seasonColor }}
        >
          {season}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {certifications.map((cert) => (
            <span key={cert} className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
              {cert}
            </span>
          ))}
        </div>
        <h4 className="font-body font-semibold text-neutral-900 text-base mb-1">{name}</h4>
        <p className="font-mono text-[#166534] text-sm mb-4">{price}</p>
        <button className="w-full bg-[#166534] text-white py-2.5 rounded-md text-xs font-semibold tracking-wide hover:bg-[#14532D] hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2">
          <ShoppingCart size={14} /> Ajouter
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FEATURED PRODUCTS SECTION                                          */
/* ------------------------------------------------------------------ */
function FeaturedProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.15,
          scrollTrigger: { trigger: '.products-grid', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const products: ProductCardProps[] = [
    { image: '/produit-tomates.jpg', name: 'Tomates Anciennes', price: '4.50 EUR/kg', season: 'Ete', seasonColor: '#FCD34D', certifications: ['AB'] },
    { image: '/produit-courgettes.jpg', name: 'Courgettes Bio', price: '3.20 EUR/kg', season: 'Ete', seasonColor: '#FCD34D', certifications: ['AB'] },
    { image: '/produit-pommes.jpg', name: 'Pommes Reinettes', price: '2.80 EUR/kg', season: 'Automne', seasonColor: '#F59E0B', certifications: ['AB', 'IGP'] },
    { image: '/produit-raisins.jpg', name: 'Raisin de Table', price: '5.90 EUR/kg', season: 'Automne', seasonColor: '#F59E0B', certifications: ['AOP'] },
  ]

  return (
    <section ref={sectionRef} className="bg-neutral-50 py-16 md:py-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="products-header text-center mb-12">
          <span className="text-[#166534] text-xs font-medium tracking-[0.04em] uppercase font-body">NOS PRODUITS DE SAISON</span>
          <h2
            className="font-display text-neutral-900 font-semibold mt-3"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
          >
            Le Gout du Terroir
          </h2>
          <p className="text-neutral-700 text-base sm:text-lg mt-3 max-w-xl mx-auto font-body">
            Fruits, legumes, cereales et viandes cultives avec soin par nos agriculteurs.
          </p>
        </div>
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.name} className="product-card">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 border border-[#166534] text-[#166534] px-8 py-3.5 rounded-md text-sm font-semibold hover:bg-[#166534] hover:text-white transition-all duration-200"
          >
            Voir Tous Nos Produits <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  FARM STORIES SECTION                                               */
/* ------------------------------------------------------------------ */
function FarmStoryBlock({
  image,
  caption,
  headline,
  quote,
  attribution,
  reverse = false,
}: {
  image: string
  caption: string
  headline: string
  quote: string
  attribution: string
  reverse?: boolean
}) {
  const blockRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!blockRef.current || !imgRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { y: -40 },
        {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: blockRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
      gsap.fromTo(
        '.farm-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: blockRef.current, start: 'top 70%' },
        }
      )
    }, blockRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={blockRef} className="relative min-h-[70vh] overflow-hidden">
      <div
        ref={imgRef}
        className="absolute inset-0 w-full h-[120%]"
        style={{ top: '-10%' }}
      >
        <img
          src={image}
          alt={headline}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: reverse
            ? 'linear-gradient(to left, rgba(28,25,23,0.85) 0%, rgba(28,25,23,0.3) 60%, transparent 100%)'
            : 'linear-gradient(to right, rgba(28,25,23,0.85) 0%, rgba(28,25,23,0.3) 60%, transparent 100%)',
        }}
      />
      <div className={`farm-content relative z-[2] flex items-center min-h-[70vh] px-6 sm:px-12 lg:px-16 py-16 ${reverse ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-[480px]">
          <span className="text-[#D97706] text-xs font-medium tracking-[0.04em] uppercase font-body">{caption}</span>
          <h3
            className="font-display text-white font-semibold mt-3"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15 }}
          >
            {headline}
          </h3>
          <p className="text-white/80 text-base sm:text-lg italic font-display mt-4 leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="text-[#D97706] text-sm font-medium mt-4 font-body">{attribution}</p>
          <Link
            to="/farms"
            className="inline-flex items-center gap-2 mt-6 border border-white text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-white/10 transition-all duration-200"
          >
            Visiter la Ferme <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function FarmStoriesSection() {
  return (
    <section className="bg-neutral-900">
      <FarmStoryBlock
        image="/farm-bourgueil.jpg"
        caption="DOMAINE DES ROCHES — BOURGUEIL"
        headline="Le Cabernet Franc dans ses Origines"
        quote="Nous avons plante nos premieres vignes en 1952. Aujourd'hui, nos 45 hectares produisent un Bourgueil AOP reconnu dans toute l'Europe."
        attribution="Jean-Louis Moreau, Vigneron"
      />
      <FarmStoryBlock
        image="/farm-sancerre.jpg"
        caption="FERME DES COTEAUX — SANCERRE"
        headline="Des Coteaux a Votre Panier"
        quote="Notre exploitation de 120 hectares allie polyculture elevage et agriculture de precision. Chaque produit porte l'empreinte de notre terroir."
        attribution="Marie Dupont, Agricultrice"
        reverse
      />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  AGRITECH SECTION                                                   */
/* ------------------------------------------------------------------ */
function AgriTechCard({
  image,
  label,
  icon,
  metrics,
}: {
  image: string
  label: string
  icon: React.ReactNode
  metrics: { value: string; label: string }[]
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ perspective: '800px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative transition-all duration-300"
        style={{
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
        }}
      >
        <div className="aspect-square overflow-hidden rounded-xl">
          <img
            src={image}
            alt={label}
            loading="lazy"
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: hovered ? 0.4 : 1 }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="mb-2 flex justify-center">{icon}</div>
            <h4 className="font-body font-semibold text-base">{label}</h4>
          </div>
        </div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-white font-display text-2xl font-bold">{m.value}</p>
              <p className="text-white/70 text-xs font-body">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AgriTechSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.agritech-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.agritech-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', stagger: 0.2,
          scrollTrigger: { trigger: '.agritech-grid', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      image: '/agritech-drone.jpg',
      label: 'Drones & Imagerie',
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
      metrics: [{ value: '+23%', label: 'Rendement' }, { value: '-15%', label: 'Intrants' }],
    },
    {
      image: '/agritech-capteurs.jpg',
      label: 'Capteurs IoT',
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 0 1 10 10M12 2v4m0 16a10 10 0 0 0 10-10M12 22v-4M2 12h4m16 0h-4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" /></svg>,
      metrics: [{ value: 'Temps reel', label: 'Donnees collectees' }, { value: '24/7', label: 'Alertes automatiques' }],
    },
    {
      image: '/agritech-precision.jpg',
      label: 'Agriculture de Precision',
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-6" /></svg>,
      metrics: [{ value: 'NDVI', label: 'Cartographie' }, { value: '30%', label: 'Economie eau' }],
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-8 lg:px-12"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="agritech-header text-center mb-14">
          <span className="text-[#4ADE80] text-xs font-medium tracking-[0.04em] uppercase font-body">AGRICULTURE 4.0</span>
          <h2
            className="font-display text-white font-semibold mt-3"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            L&apos;Intelligence au Coeur des Champs
          </h2>
          <p className="text-white/70 text-base sm:text-lg mt-3 max-w-xl mx-auto font-body">
            Capteurs IoT, drones et intelligence artificielle optimisent chaque recolte tout en preservant les sols.
          </p>
        </div>
        <div className="agritech-grid grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {cards.map((c) => (
            <div key={c.label} className="agritech-card">
              <AgriTechCard {...c} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/agritech"
            className="inline-flex items-center gap-2 bg-[#4ADE80] text-neutral-900 px-8 py-3.5 rounded-md text-sm font-semibold hover:bg-[#22C55E] hover:scale-[1.02] transition-all duration-200"
          >
            Explorer Nos Technologies <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER                                                    */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime: number
    let raf: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ------------------------------------------------------------------ */
/*  STATS SECTION                                                       */
/* ------------------------------------------------------------------ */
function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stats-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.2,
          scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const stats = [
    { value: 340, label: 'Agriculteurs Cooperateurs', suffix: '' },
    { value: 12500, label: 'Hectares Cultives', suffix: '' },
    { value: 47000, label: 'Tonnes Produites par An', suffix: '' },
    { value: 98, label: 'Taux de Satisfaction Client', suffix: '%' },
  ]

  return (
    <section ref={sectionRef} className="bg-[#166534] py-20 md:py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C40 20 50 25 50 35 C50 45 40 50 30 55 C20 50 10 45 10 35 C10 25 20 20 30 5Z' fill='white'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
      }} />
      <div className="max-w-7xl mx-auto relative z-[1]">
        <div className="stats-header text-center mb-14">
          <span className="text-[#D97706] text-xs font-medium tracking-[0.04em] uppercase font-body">NOTRE IMPACT</span>
          <h2
            className="font-display text-white font-semibold mt-3"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            TerraFerme en Chiffres
          </h2>
        </div>
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="stat-item text-center">
              <p
                className="font-display text-white font-bold"
                style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 1.1 }}
              >
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-white/80 text-sm mt-2 font-body">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/cooperative"
            className="inline-flex items-center gap-2 bg-white text-[#166534] px-8 py-3.5 rounded-md text-sm font-semibold hover:bg-neutral-100 hover:scale-[1.02] transition-all duration-200"
          >
            Rejoindre la Cooperative <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS 3D CAROUSEL                                            */
/* ------------------------------------------------------------------ */
function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const testimonials = [
    {
      image: '/farmer-portrait-1.jpg',
      quote: 'Rejoindre TerraFerme a transforme notre exploitation. L\'acces aux technologies de precision et un reseau solidaire — c\'est l\'avenir de l\'agriculture.',
      name: 'Pierre Martin',
      role: 'Viticulteur, Bourgueil',
    },
    {
      image: '/farmer-portrait-2.jpg',
      quote: 'En tant qu\'agronome debutante, la cooperative m\'a offert formation, mentorat et un veritable projet d\'innovation en agroecologie.',
      name: 'Camille Rousseau',
      role: 'Agronome, Sancerre',
    },
    {
      image: '/farmer-portrait-3.jpg',
      quote: 'Trente ans de collaboration. Trois generations de paysans. TerraFerme, c\'est la famille agricole que nous avons choisie.',
      name: 'Andre et Marie Legrand',
      role: 'Exploitants, Chinon',
    },
  ]

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused, testimonials.length])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.testimonial-carousel',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: '.testimonial-carousel', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-neutral-900 py-20 md:py-28 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="testimonials-header text-center mb-14">
          <span className="text-[#D97706] text-xs font-medium tracking-[0.04em] uppercase font-body">ILS NOUS FONT CONFIANCE</span>
          <h2
            className="font-display text-white font-semibold mt-3"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            La Voix de Nos Agriculteurs
          </h2>
        </div>

        <div
          className="testimonial-carousel relative"
          style={{ perspective: '800px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative flex items-center justify-center min-h-[360px] sm:min-h-[320px]">
            {testimonials.map((t, i) => {
              const offset = i - activeIndex
              const absOffset = Math.abs(offset)
              const isActive = i === activeIndex

              return (
                <div
                  key={i}
                  className="absolute w-full max-w-lg transition-all duration-600"
                  style={{
                    transform: `translateX(${offset * 60}%) scale(${isActive ? 1 : 0.85}) rotateY(${offset * -8}deg)`,
                    opacity: isActive ? 1 : absOffset === 1 ? 0.4 : 0,
                    filter: isActive ? 'none' : 'blur(2px)',
                    zIndex: isActive ? 10 : 5 - absOffset,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDuration: '0.6s',
                  }}
                >
                  <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50 text-center">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-[3px] border-[#D97706]"
                    />
                    <p className="text-white/85 text-base sm:text-lg italic font-display leading-relaxed mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="text-white font-semibold font-body">{t.name}</p>
                    <p className="text-neutral-500 text-sm font-body">{t.role}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                style={{ background: i === activeIndex ? '#D97706' : '#44403C' }}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="font-display text-white font-semibold text-xl sm:text-2xl mb-3">
            Vous aussi, Rejoignez l&apos;Aventure
          </h3>
          <p className="text-white/70 text-base max-w-lg mx-auto mb-6 font-body">
            Beneficiez de l&apos;accompagnement, des outils technologiques et d&apos;un reseau de 340 agriculteurs passionnes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cooperative"
              className="inline-flex items-center justify-center gap-2 bg-[#D97706] text-neutral-900 px-8 py-3.5 rounded-md text-sm font-semibold hover:bg-[#B45309] hover:scale-[1.02] transition-all duration-200"
            >
              Devenir Cooperateur <ArrowRight size={16} />
            </Link>
            <Link
              to="/cooperative"
              className="inline-flex items-center justify-center gap-2 border border-white text-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/10 transition-all duration-200"
            >
              En Savoir Plus
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA HARVEST VIDEO SECTION                                           */
/* ------------------------------------------------------------------ */
function CTAVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => { })
        } else {
          videoRef.current?.pause()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-end overflow-hidden">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster="/cta-harvest-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/cta-harvest-video.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(28,25,23,0.85) 0%, rgba(28,25,23,0.3) 50%, transparent 100%)',
        }}
      />
      <div className="relative z-[2] w-full px-4 sm:px-8 lg:px-12 pb-16 pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <span className="cta-content text-[#D97706] text-xs font-medium tracking-[0.04em] uppercase font-body block">
            C&apos;EST LA SAISON DES RECOLTES
          </span>
          <h2
            className="cta-content font-display text-white font-bold mt-3"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}
          >
            Goutez la Difference TerraFerme
          </h2>
          <p className="cta-content text-white/80 text-base sm:text-lg mt-4 max-w-xl mx-auto font-body">
            Nos produits frais sont disponibles en vente directe, dans nos points de collecte et chez nos distributeurs partenaires.
          </p>
          <div className="cta-content flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 px-8 py-3.5 rounded-md text-sm font-semibold hover:bg-neutral-100 hover:scale-[1.02] transition-all duration-200"
            >
              Points de Vente <MapPin size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white text-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/10 transition-all duration-200"
            >
              Contactez-Nous
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  HOME PAGE                                                           */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <div>
      <HeroSection />
      <SeasonalManifestoSection />
      <FeaturedProductsSection />
      <FarmStoriesSection />
      <AgriTechSection />
      <StatsSection />
      <TestimonialsSection />
      <CTAVideoSection />
    </div>
  )
}
