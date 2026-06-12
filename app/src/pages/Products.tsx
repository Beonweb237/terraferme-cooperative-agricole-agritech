import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  X,
  ChevronDown,
  Leaf,
  Snowflake,
  Sun,
  CloudSun,
  ShieldCheck,
  MapPin,
  Plus,
  Check,
  Grid3X3,
  List,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Product {
  id: number
  name: string
  price: string
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'all-year'
  certifications: string[]
  image: string
  origin: string
  category: string
}

const allProducts: Product[] = [
  // Fruits & Vegetables (12)
  { id: 1, name: "Tomates Anciennes", price: "4.50 EUR/kg", season: "summer", certifications: ["AB"], image: "/produit-tomates.jpg", origin: "Bourgueil, Loire", category: "Legumes" },
  { id: 2, name: "Courgettes Bio", price: "3.20 EUR/kg", season: "summer", certifications: ["AB"], image: "/produit-courgettes.jpg", origin: "Chinon, Indre-et-Loire", category: "Legumes" },
  { id: 3, name: "Pommes Reinettes", price: "2.80 EUR/kg", season: "autumn", certifications: ["AB", "IGP"], image: "/produit-pommes.jpg", origin: "Limousin", category: "Fruits" },
  { id: 4, name: "Raisin de Table", price: "5.90 EUR/kg", season: "autumn", certifications: ["AOP"], image: "/produit-raisins.jpg", origin: "Touraine", category: "Fruits" },
  { id: 5, name: "Carottes Nouvelles", price: "2.40 EUR/kg", season: "spring", certifications: ["AB"], image: "/produit-carottes.jpg", origin: "Sancerre, Cher", category: "Legumes" },
  { id: 6, name: "Poireaux d'Hiver", price: "3.80 EUR/kg", season: "winter", certifications: ["AB", "HVE"], image: "/produit-poireaux.jpg", origin: "Bourges, Cher", category: "Legumes" },
  { id: 7, name: "Aubergines Bio", price: "3.60 EUR/kg", season: "summer", certifications: ["AB"], image: "/produit-tomates.jpg", origin: "Chinon, Indre-et-Loire", category: "Legumes" },
  { id: 8, name: "Poivrons Rouges", price: "4.20 EUR/kg", season: "summer", certifications: ["AB", "HVE"], image: "/produit-courgettes.jpg", origin: "Bourgueil, Loire", category: "Legumes" },
  { id: 9, name: "Fraises des Bois", price: "6.50 EUR/kg", season: "spring", certifications: ["AB"], image: "/produit-pommes.jpg", origin: "Touraine", category: "Fruits" },
  { id: 10, name: "Betteraves Rouges", price: "2.60 EUR/kg", season: "autumn", certifications: ["AB"], image: "/produit-raisins.jpg", origin: "Sancerre, Cher", category: "Legumes" },
  { id: 11, name: "Chou Kale", price: "3.90 EUR/kg", season: "winter", certifications: ["AB", "HVE"], image: "/produit-courgettes.jpg", origin: "Bourges, Cher", category: "Legumes" },
  { id: 12, name: "Peches Blanches", price: "5.40 EUR/kg", season: "summer", certifications: ["IGP"], image: "/produit-pommes.jpg", origin: "Rhône-Alpes", category: "Fruits" },

  // Grains & Cereals (8)
  { id: 13, name: "Blé Bio", price: "0.45 EUR/kg", season: "summer", certifications: ["AB"], image: "/produit-tomates.jpg", origin: "Beauce", category: "Cereales" },
  { id: 14, name: "Orge Brassicole", price: "0.38 EUR/kg", season: "summer", certifications: ["AB", "IGP"], image: "/produit-courgettes.jpg", origin: "Champagne", category: "Cereales" },
  { id: 15, name: "Triticale", price: "0.32 EUR/kg", season: "autumn", certifications: ["AB"], image: "/produit-raisins.jpg", origin: "Centre-Val de Loire", category: "Cereales" },
  { id: 16, name: "Maïs Doux", price: "0.85 EUR/kg", season: "summer", certifications: ["AB", "HVE"], image: "/produit-tomates.jpg", origin: "Sud-Ouest", category: "Cereales" },
  { id: 17, name: "Lentilles Vertes", price: "4.20 EUR/kg", season: "autumn", certifications: ["AOP"], image: "/produit-pommes.jpg", origin: "Puy-en-Velay", category: "Cereales" },
  { id: 18, name: "Flocons d'Avoine", price: "2.90 EUR/kg", season: "winter", certifications: ["AB"], image: "/produit-courgettes.jpg", origin: "Bretagne", category: "Cereales" },
  { id: 19, name: "Quinoa Français", price: "6.50 EUR/kg", season: "summer", certifications: ["AB"], image: "/produit-raisins.jpg", origin: "Camargue", category: "Cereales" },
  { id: 20, name: "Graines de Tournesol", price: "3.10 EUR/kg", season: "autumn", certifications: ["HVE"], image: "/produit-tomates.jpg", origin: "Centre-Val de Loire", category: "Cereales" },

  // Meats & Dairy (6)
  { id: 21, name: "Bœuf Charolais", price: "28.00 EUR/kg", season: "all-year", certifications: ["Label Rouge"], image: "/produit-pommes.jpg", origin: "Bourgogne", category: "Viandes" },
  { id: 22, name: "Agneau du Limousin", price: "32.00 EUR/kg", season: "spring", certifications: ["AOP"], image: "/produit-raisins.jpg", origin: "Limousin", category: "Viandes" },
  { id: 23, name: "Poulet Fermier", price: "14.50 EUR/kg", season: "all-year", certifications: ["AB", "Label Rouge"], image: "/produit-courgettes.jpg", origin: "Touraine", category: "Viandes" },
  { id: 24, name: "Canard Gras", price: "18.00 EUR/kg", season: "autumn", certifications: ["IGP"], image: "/produit-tomates.jpg", origin: "Sud-Ouest", category: "Viandes" },
  { id: 25, name: "Fromage de Chèvre", price: "24.00 EUR/kg", season: "all-year", certifications: ["AOP"], image: "/produit-pommes.jpg", origin: "Touraine", category: "Produits Laitiers" },
  { id: 26, name: "Beurre de Baratte", price: "8.50 EUR/unit", season: "all-year", certifications: ["AB"], image: "/produit-courgettes.jpg", origin: "Bretagne", category: "Produits Laitiers" },

  // Processed Products (10)
  { id: 27, name: "Confiture de Fraises", price: "5.90 EUR", season: "summer", certifications: ["AB"], image: "/produit-pommes.jpg", origin: "Touraine", category: "Produits Transformes" },
  { id: 28, name: "Miel de Lavande", price: "12.00 EUR", season: "summer", certifications: ["AB"], image: "/produit-raisins.jpg", origin: "Provence", category: "Produits Transformes" },
  { id: 29, name: "Jus de Pomme Bio", price: "3.50 EUR", season: "autumn", certifications: ["AB"], image: "/produit-tomates.jpg", origin: "Limousin", category: "Produits Transformes" },
  { id: 30, name: "Huile de Colza", price: "8.90 EUR", season: "all-year", certifications: ["AB", "HVE"], image: "/produit-courgettes.jpg", origin: "Centre-Val de Loire", category: "Produits Transformes" },
  { id: 31, name: "Farine de Blé T80", price: "3.20 EUR", season: "all-year", certifications: ["AB"], image: "/produit-pommes.jpg", origin: "Beauce", category: "Produits Transformes" },
  { id: 32, name: "Soupe de Légumes", price: "4.50 EUR", season: "winter", certifications: ["AB"], image: "/produit-raisins.jpg", origin: "Touraine", category: "Produits Transformes" },
  { id: 33, name: "Coulis de Tomates", price: "3.80 EUR", season: "summer", certifications: ["AB"], image: "/produit-tomates.jpg", origin: "Bourgueil, Loire", category: "Produits Transformes" },
  { id: 34, name: "Pâte de Fruit", price: "6.50 EUR", season: "autumn", certifications: ["AB"], image: "/produit-pommes.jpg", origin: "Touraine", category: "Produits Transformes" },
  { id: 35, name: "Vinaigre de Cidre", price: "7.20 EUR", season: "all-year", certifications: ["AB"], image: "/produit-courgettes.jpg", origin: "Normandie", category: "Produits Transformes" },
  { id: 36, name: "Granola Maison", price: "8.50 EUR", season: "all-year", certifications: ["AB"], image: "/produit-raisins.jpg", origin: "Bretagne", category: "Produits Transformes" },
]

const categories = ["Tous", "Fruits", "Legumes", "Cereales", "Viandes", "Produits Transformes"]

const seasonConfig = {
  spring: { color: '#4ADE80', label: 'Printemps', icon: Leaf },
  summer: { color: '#FCD34D', label: 'Ete', icon: Sun },
  autumn: { color: '#F59E0B', label: 'Automne', icon: CloudSun },
  winter: { color: '#94A3B8', label: 'Hiver', icon: Snowflake },
  'all-year': { color: '#78716C', label: 'Toute saison', icon: ShieldCheck },
}

const certConfig: Record<string, { color: string; abbr: string }> = {
  'AB': { color: '#22C55E', abbr: 'AB' },
  'HVE': { color: '#EAB308', abbr: 'HVE' },
  'AOP': { color: '#991B1B', abbr: 'AOP' },
  'IGP': { color: '#2563EB', abbr: 'IGP' },
  'Label Rouge': { color: '#DC2626', abbr: 'LR' },
}

/* ------------------------------------------------------------------ */
/*  SEASON BADGE                                                       */
/* ------------------------------------------------------------------ */
function SeasonBadge({ season }: { season: keyof typeof seasonConfig }) {
  const config = seasonConfig[season]
  const Icon = config.icon
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: config.color }}
      >
        <Icon size={12} className="text-white" />
      </div>
      <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: config.color }}>
        {config.label}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CERTIFICATION ICONS                                                */
/* ------------------------------------------------------------------ */
function CertificationIcons({ certs }: { certs: string[] }) {
  return (
    <div className="flex items-center gap-1.5">
      {certs.map((cert) => {
        const cfg = certConfig[cert]
        if (!cfg) return null
        return (
          <div
            key={cert}
            className="relative group"
          >
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold text-white cursor-default"
              style={{ background: cfg.color }}
            >
              {cfg.abbr}
            </span>
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {cert}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PRODUCT CARD                                                       */
/* ------------------------------------------------------------------ */
function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group bg-white rounded-xl border border-[#E7E5E4] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <SeasonBadge season={product.season} />
        </div>
      </div>
      <div className="p-4">
        <CertificationIcons certs={product.certifications} />
        <h3 className="font-display text-lg font-semibold text-[#1C1917] mt-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <MapPin size={12} className="text-[#78716C]" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
            {product.origin}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-sm text-[#166534] font-medium">
            {product.price}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 active:scale-95"
            style={{
              background: added ? '#22C55E' : '#166534',
              color: 'white',
            }}
          >
            {added ? <Check size={12} /> : <Plus size={12} />}
            {added ? 'Ajoute' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PRODUCT SECTION                                                    */
/* ------------------------------------------------------------------ */
function ProductSection({
  title,
  products,
  bgClass,
}: {
  title: string
  products: Product[]
  bgClass: string
}) {
  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const visibleProducts = showAll ? products : products.slice(0, 6)

  return (
    <section ref={sectionRef} className={`${bgClass} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-[#1C1917] leading-tight tracking-tight">
            {title}
          </h2>
          <span className="text-[12px] font-medium uppercase tracking-wider text-[#78716C]">
            {products.length} produits
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length > 6 && !showAll && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-md border-[1.5px] border-[#166534] text-[#166534] text-sm font-semibold transition-all duration-200 hover:bg-[#166534] hover:text-white"
            >
              Voir Plus
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN PRODUCTS PAGE                                                 */
/* ------------------------------------------------------------------ */
export default function Products() {
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [sortBy, setSortBy] = useState("Saison")
  const [sortOpen, setSortOpen] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  /* Seasonal banner content */
  const currentSeason: keyof typeof seasonConfig = 'spring'
  const seasonColor = seasonConfig[currentSeason].color
  const seasonLabel = seasonConfig[currentSeason].label

  /* Filter + Sort products */
  const filteredProducts = useCallback(() => {
    let filtered = activeCategory === "Tous"
      ? allProducts
      : activeCategory === "Fruits"
        ? allProducts.filter(p => p.category === "Fruits")
        : activeCategory === "Legumes"
          ? allProducts.filter(p => p.category === "Legumes")
          : activeCategory === "Cereales"
            ? allProducts.filter(p => p.category === "Cereales")
            : activeCategory === "Viandes"
              ? allProducts.filter(p => p.category === "Viandes" || p.category === "Produits Laitiers")
              : activeCategory === "Produits Transformes"
                ? allProducts.filter(p => p.category === "Produits Transformes")
                : allProducts

    switch (sortBy) {
      case "Prix croissant":
        filtered = [...filtered].sort((a, b) => {
          const pa = parseFloat(a.price.replace(/[^0-9.]/g, ''))
          const pb = parseFloat(b.price.replace(/[^0-9.]/g, ''))
          return pa - pb
        })
        break
      case "Prix decroissant":
        filtered = [...filtered].sort((a, b) => {
          const pa = parseFloat(a.price.replace(/[^0-9.]/g, ''))
          const pb = parseFloat(b.price.replace(/[^0-9.]/g, ''))
          return pb - pa
        })
        break
      case "Nom A-Z":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
    return filtered
  }, [activeCategory, sortBy])

  const fruitsAndVeg = filteredProducts().filter(
    p => p.category === "Fruits" || p.category === "Legumes"
  )
  const grains = filteredProducts().filter(p => p.category === "Cereales")
  const meatsDairy = filteredProducts().filter(
    p => p.category === "Viandes" || p.category === "Produits Laitiers"
  )
  const processed = filteredProducts().filter(
    p => p.category === "Produits Transformes"
  )

  /* GSAP animations */
  useGSAP(() => {
    if (!containerRef.current) return

    gsap.from('.products-hero-headline', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.2,
    })
    gsap.from('.products-hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      delay: 0.4,
    })
    gsap.from('.products-hero-cert', {
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.6,
    })
    gsap.from('.products-hero-stats', {
      y: 10,
      opacity: 0,
      duration: 0.6,
      ease: 'expo.out',
      delay: 0.8,
    })

    gsap.from('.filter-pill', {
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.5,
    })

    const sections = gsap.utils.toArray<HTMLElement>('.product-section-anim')
    sections.forEach((section) => {
      gsap.from(section.querySelectorAll('.product-card-anim'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
      })
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      {/* ========== SECTION 1: PAGE HEADER ========== */}
      <div
        ref={headerRef}
        className="pt-[120px] pb-20"
        style={{ background: '#166534' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 mb-6 text-[13px]">
            <Link to="/" className="text-white/60 hover:text-white transition-colors duration-200">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/60">Produits</span>
          </div>

          {/* Headline */}
          <h1 className="products-hero-headline font-display text-[40px] lg:text-[72px] font-bold text-white leading-[1.08] tracking-[-0.025em]">
            Nos Produits
          </h1>

          {/* Subheadline */}
          <p className="products-hero-sub text-[17px] lg:text-[19px] text-white/80 max-w-xl mx-auto mt-4 leading-relaxed">
            Fruits, legumes, cereales, viandes et produits transformes — cultives par nos agriculteurs avec passion et respect des saisons.
          </p>

          {/* Certification trust bar */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {Object.entries(certConfig).slice(0, 4).map(([key, cfg]) => (
              <div key={key} className="products-hero-cert flex flex-col items-center gap-1">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[10px] font-bold text-white"
                  style={{ background: cfg.color }}
                >
                  {cfg.abbr}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/70">
                  {key}
                </span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="products-hero-stats mt-6 font-mono text-[13px] lg:text-[14px]" style={{ color: '#D97706' }}>
            47 000T/an &middot; 340 agriculteurs &middot; 5 categories
          </div>
        </div>
      </div>

      {/* ========== SECTION 2: CATEGORY FILTERS & SEASONAL BANNER ========== */}
      <div
        ref={filterRef}
        className="sticky top-16 z-40 bg-white border-b border-[#E7E5E4]"
      >
        {/* Seasonal banner */}
        {bannerVisible && (
          <div
            className="flex items-center justify-center gap-2 py-2.5 px-4 text-[15px] relative"
            style={{
              background: `${seasonColor}14`,
              color: seasonColor,
            }}
          >
            <span>
              C&apos;est le {seasonLabel.toLowerCase()} ! Decouvrez nos produits de saison
            </span>
            <button
              onClick={() => setBannerVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 hover:opacity-70 transition-opacity"
              aria-label="Dismiss banner"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Category filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="filter-pill whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shrink-0"
                  style={{
                    background: activeCategory === cat ? '#166534' : '#F5F5F4',
                    color: activeCategory === cat ? '#FFFFFF' : '#44403C',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* View toggle */}
              <div className="hidden sm:flex items-center border border-[#E7E5E4] rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className="p-2 transition-colors duration-200"
                  style={{
                    background: viewMode === 'grid' ? '#166534' : 'white',
                    color: viewMode === 'grid' ? 'white' : '#44403C',
                  }}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="p-2 transition-colors duration-200"
                  style={{
                    background: viewMode === 'list' ? '#166534' : 'white',
                    color: viewMode === 'list' ? 'white' : '#44403C',
                  }}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-3 py-2 border border-[#E7E5E4] rounded-md text-sm text-[#44403C] hover:border-[#166534] transition-colors duration-200"
                >
                  <span className="hidden sm:inline">Trier par</span>
                  <span className="sm:hidden">Trier</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 bg-white border border-[#E7E5E4] rounded-lg shadow-lg z-20 py-1 min-w-[180px]">
                      {["Saison", "Prix croissant", "Prix decroissant", "Nom A-Z"].map((option) => (
                        <button
                          key={option}
                          onClick={() => { setSortBy(option); setSortOpen(false) }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5F4] transition-colors duration-150"
                          style={{ color: sortBy === option ? '#166534' : '#44403C' }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== PRODUCT SECTIONS ========== */}
      {(activeCategory === "Tous" || activeCategory === "Fruits" || activeCategory === "Legumes") && fruitsAndVeg.length > 0 && (
        <ProductSection title="Fruits & Legumes" products={fruitsAndVeg} bgClass="bg-[#FAFAF9]" />
      )}

      {(activeCategory === "Tous" || activeCategory === "Cereales") && grains.length > 0 && (
        <ProductSection title="Cereales & Graines" products={grains} bgClass="bg-white" />
      )}

      {(activeCategory === "Tous" || activeCategory === "Viandes") && meatsDairy.length > 0 && (
        <ProductSection title="Viandes & Produits Laitiers" products={meatsDairy} bgClass="bg-[#FAFAF9]" />
      )}

      {(activeCategory === "Tous" || activeCategory === "Produits Transformes") && processed.length > 0 && (
        <ProductSection title="Produits Transformes" products={processed} bgClass="bg-white" />
      )}

      {/* ========== SECTION 7: CTA BANNER ========== */}
      <section className="py-20" style={{ background: '#166534' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-white leading-tight tracking-tight">
            Ne Trouvez Pas ce que Vous Cherchez ?
          </h2>
          <p className="text-[17px] lg:text-[19px] text-white/80 mt-4 leading-relaxed">
            Contactez-nous pour les commandes speciales, les volumes professionnels ou les produits hors saison.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-8 px-8 py-4 rounded-md bg-white text-[#166534] text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            Nous Contacter
          </Link>
        </div>
      </section>
    </div>
  )
}
