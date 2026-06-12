import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  X,
  Leaf,
  Sun,
  CloudSun,
  Snowflake,
  Clock,
  Star,
  Users,
  Apple,
  Carrot,
  Milk,
  Package,
  Snowflake as SnowflakeIcon,
  Wheat,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Recipe {
  id: number
  name: string
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  time: string
  difficulty: string
  servings: number
  image: string | null
  tags: string[]
}

const recipes: Recipe[] = [
  { id: 1, name: "Tarte aux Tomates Anciennes", season: "summer", time: "45 min", difficulty: "Facile", servings: 4, image: "/recette-tarte.jpg", tags: ["Vegetarien"] },
  { id: 2, name: "Veloute de Courge & Carottes", season: "autumn", time: "35 min", difficulty: "Facile", servings: 4, image: "/recette-soupe.jpg", tags: ["Vegetarien", "Sans Gluten"] },
  { id: 3, name: "Salade de Lentilles Vertes", season: "winter", time: "25 min", difficulty: "Facile", servings: 2, image: null, tags: ["Vegetarien", "Sans Gluten"] },
  { id: 4, name: "Gratin de Courgettes", season: "summer", time: "40 min", difficulty: "Moyen", servings: 4, image: null, tags: ["Vegetarien"] },
  { id: 5, name: "Tarte Tatin aux Pommes", season: "autumn", time: "60 min", difficulty: "Moyen", servings: 6, image: "/recette-tarte.jpg", tags: ["Vegetarien"] },
  { id: 6, name: "Soupe de Legumes d'Hiver", season: "winter", time: "30 min", difficulty: "Facile", servings: 4, image: "/recette-soupe.jpg", tags: ["Vegetarien", "Sans Gluten"] },
  { id: 7, name: "Risotto aux Asperges", season: "spring", time: "35 min", difficulty: "Moyen", servings: 4, image: null, tags: ["Vegetarien", "Sans Gluten"] },
  { id: 8, name: "Crumble aux Fraises", season: "summer", time: "30 min", difficulty: "Facile", servings: 4, image: "/recette-tarte.jpg", tags: ["Vegetarien"] },
  { id: 9, name: "Ragout de Bœuf Charolais", season: "winter", time: "90 min", difficulty: "Facile", servings: 6, image: "/recette-soupe.jpg", tags: ["Sans Gluten"] },
]

const seasonConfig = {
  spring: { color: '#4ADE80', label: 'Printemps', icon: Leaf },
  summer: { color: '#FCD34D', label: 'Ete', icon: Sun },
  autumn: { color: '#F59E0B', label: 'Automne', icon: CloudSun },
  winter: { color: '#94A3B8', label: 'Hiver', icon: Snowflake },
}

const filterTabs = ["Toutes", "Printemps", "Ete", "Automne", "Hiver", "Rapide (<30min)", "Vegetarien", "Sans Gluten"]

const seasonalProducts = {
  spring: [
    { name: "Asperges vertes", status: "Disponible maintenant", color: '#4ADE80' },
    { name: "Petits pois frais", status: "Disponible maintenant", color: '#4ADE80' },
    { name: "Fraises des bois", status: "Disponible maintenant", color: '#4ADE80' },
    { name: "Radis roses", status: "Bientot", color: '#D97706' },
    { name: "Courgettes", status: "Dans 3 semaines", color: '#78716C' },
  ],
}

const conservationTips = [
  {
    icon: Apple,
    title: "Fruits & Legumes",
    color: '#166534',
    tips: [
      "Conservez les tomates a temperature ambiante",
      "Les carottes se gardent 3 semaines au frais",
      "Ne lavez pas les fruits avant stockage",
    ],
  },
  {
    icon: Carrot,
    title: "Viandes",
    color: '#92400E',
    tips: [
      "Consommation dans les 3 jours",
      "Congelation a -18°C max 6 mois",
      "Decongelation lente au refrigerateur",
    ],
  },
  {
    icon: Milk,
    title: "Produits Laitiers",
    color: '#D97706',
    tips: [
      "Fromage de chèvre: papier cire + bac legumes",
      "Beurre: conserveur d'origine",
      "Lait: consommation dans 5 jours",
    ],
  },
  {
    icon: Package,
    title: "Faire ses Conserves",
    color: '#166534',
    tips: [
      "Sterilisation a 100°C minimum 30 min",
      "Etiquetage date + contenu",
      "Stockage a l'abri de la lumiere",
    ],
  },
  {
    icon: SnowflakeIcon,
    title: "Bien Congeler",
    color: '#2563EB',
    tips: [
      "Emballage hermetique obligatoire",
      "Datez vos sachets",
      "Decongelez au frais 24h a l'avance",
    ],
  },
  {
    icon: Wheat,
    title: "Pains & Cereales",
    color: '#EAB308',
    tips: [
      "Pain: sac en tissu, jamais plastique",
      "Farine: recipient hermetique",
      "Flocons: consommation dans 3 mois",
    ],
  },
]

const calendarSeasons = [
  {
    key: 'spring' as const,
    months: "Mars–Mai",
    products: ["Asperges", "Petits pois", "Fraises", "Radis", "Epinards", "Artichauts"],
  },
  {
    key: 'summer' as const,
    months: "Juin–Aout",
    products: ["Tomates", "Courgettes", "Peches", "Melons", "Poivrons", "Aubergines"],
  },
  {
    key: 'autumn' as const,
    months: "Sept–Nov",
    products: ["Pommes", "Raisins", "Potimarrons", "Champignons", "Chataignes", "Quetsches"],
  },
  {
    key: 'winter' as const,
    months: "Dec–Fev",
    products: ["Poireaux", "Choux", "Carottes", "Endives", "Agrumes", "Betteraves"],
  },
]

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
/*  RECIPE CARD                                                        */
/* ------------------------------------------------------------------ */
function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="group bg-white rounded-xl border border-[#E7E5E4] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
      <div className="relative aspect-video overflow-hidden">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#F5F5F4] flex items-center justify-center">
            <Leaf size={40} className="text-[#D6D3D1]" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <SeasonBadge season={recipe.season} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-[#1C1917]">
          {recipe.name}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-[13px] text-[#57534E]">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {recipe.time}
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} />
            {recipe.difficulty}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {recipe.servings} pers.
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F5F5F4] text-[#57534E]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN RECIPES PAGE                                                  */
/* ------------------------------------------------------------------ */
export default function Recipes() {
  const [activeFilter, setActiveFilter] = useState("Toutes")
  const [showAllRecipes, setShowAllRecipes] = useState(false)
  const [expandedSeason, setExpandedSeason] = useState<string | null>('spring')
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  /* Filter recipes */
  const filteredRecipes = recipes.filter((r) => {
    switch (activeFilter) {
      case "Printemps": return r.season === "spring"
      case "Ete": return r.season === "summer"
      case "Automne": return r.season === "autumn"
      case "Hiver": return r.season === "winter"
      case "Rapide (<30min)": return parseInt(r.time) < 30
      case "Vegetarien": return r.tags.includes("Vegetarien")
      case "Sans Gluten": return r.tags.includes("Sans Gluten")
      default: return true
    }
  })

  const visibleRecipes = showAllRecipes ? filteredRecipes : filteredRecipes.slice(0, 6)

  /* GSAP animations */
  useGSAP(() => {
    if (!containerRef.current) return

    gsap.from('.recipes-hero-headline', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.2,
    })
    gsap.from('.recipes-hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      delay: 0.3,
    })

    gsap.from('.featured-recipe-anim', {
      scrollTrigger: { trigger: '.featured-recipe-section', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
    })

    gsap.from('.seasonal-context-anim', {
      scrollTrigger: { trigger: '.featured-recipe-section', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'expo.out',
    })

    gsap.from('.recipe-card-anim', {
      scrollTrigger: { trigger: '.recipe-grid-section', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'expo.out',
    })

    gsap.from('.tip-card-anim', {
      scrollTrigger: { trigger: '.tips-section', start: 'top 85%' },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'expo.out',
    })

    gsap.from('.calendar-section-anim', {
      scrollTrigger: { trigger: '.calendar-section', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
    })

    gsap.from('.newsletter-anim', {
      scrollTrigger: { trigger: '.newsletter-section', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
    })
  }, { scope: containerRef })

  const handleSubscribe = () => {
    if (email.includes('@')) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <div ref={containerRef}>
      {/* ========== SECTION 1: PAGE HEADER ========== */}
      <div
        className="relative pt-[160px] pb-20 overflow-hidden"
        style={{
          backgroundImage: 'url(/recette-tarte.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(28,25,23,0.5) 0%, rgba(28,25,23,0.85) 100%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 mb-6 text-[13px]">
            <Link to="/" className="text-white/60 hover:text-white transition-colors duration-200">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/60">Recettes et Conseils</span>
          </div>

          {/* Caption */}
          <span className="inline-block text-[12px] font-medium uppercase tracking-[0.04em] mb-4" style={{ color: '#D97706' }}>
            CUISINE DE SAISON
          </span>

          {/* Headline */}
          <h1 className="recipes-hero-headline font-display text-[40px] lg:text-[72px] font-bold text-white leading-[1.08] tracking-[-0.025em]">
            Recettes & Conseils du Terroir
          </h1>

          {/* Subheadline */}
          <p className="recipes-hero-sub text-[17px] lg:text-[19px] text-white/80 max-w-xl mx-auto mt-4 leading-relaxed">
            Cuisinez les produits TerraFerme avec nos recettes de saison, conseils de conservation et astuces de nos agriculteurs.
          </p>

          {/* Stats */}
          <div className="mt-6 font-mono text-[13px] lg:text-[14px]" style={{ color: '#D97706' }}>
            48 recettes &middot; 12 saisons &middot; Mise a jour mensuelle
          </div>
        </div>
      </div>

      {/* ========== SECTION 2: SEASONAL BANNER & FEATURED RECIPE ========== */}
      <div className="featured-recipe-section bg-white py-16">
        {/* Seasonal banner */}
        {bannerVisible && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-8">
            <div
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-[15px] relative"
              style={{ background: 'rgba(74,222,128,0.08)', color: '#4ADE80' }}
            >
              <span>
                C&apos;est le printemps ! Decouvrez nos recettes aux asperges, petits pois et fraises
              </span>
              <button
                onClick={() => setBannerVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:opacity-70 transition-opacity"
                aria-label="Dismiss banner"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Featured recipe */}
            <div className="featured-recipe-anim">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/recette-tarte.jpg"
                  alt="Tarte Rustique aux Tomates Anciennes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <SeasonBadge season="spring" />
                </div>
              </div>
              <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-[#1C1917] mt-6 leading-tight tracking-tight">
                Tarte Rustique aux Tomates Anciennes
              </h2>
              <div className="flex items-center gap-4 mt-3 text-sm text-[#57534E]">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  45 min
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} />
                  Facile
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  4 personnes
                </span>
              </div>
              <p className="text-[15px] lg:text-base text-[#44403C] mt-4 leading-relaxed">
                Une tarte simple et savoureuse qui met en valeur nos tomates anciennes bio. Parfaite pour un repas d&apos;ete entre amis.
              </p>
              <button className="mt-6 px-8 py-3.5 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95" style={{ background: '#166534' }}>
                Voir la Recette
              </button>
            </div>

            {/* Right — Seasonal context */}
            <div className="seasonal-context-anim">
              <h3 className="font-display text-[22px] lg:text-[28px] font-semibold text-[#1C1917] leading-tight tracking-tight">
                Produits de Printemps
              </h3>
              <div className="mt-6 space-y-4">
                {seasonalProducts.spring.map((product, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-[#E7E5E4]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: product.color }}
                      />
                      <span className="text-sm font-medium text-[#1C1917]">
                        {product.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#57534E]">
                      {product.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mini recipe preview cards */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img src="/recette-soupe.jpg" alt="Veloute de Courge" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-[11px] font-medium text-white/80">Automne</span>
                    <p className="text-xs font-semibold text-white truncate">Veloute de Courge</p>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img src="/recette-tarte.jpg" alt="Gratin d'Ete" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-[11px] font-medium text-white/80">Ete</span>
                    <p className="text-xs font-semibold text-white truncate">Tarte aux Tomates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SECTION 3: RECIPE GRID ========== */}
      <div className="recipe-grid-section bg-[#FAFAF9] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-[#1C1917] leading-tight tracking-tight mb-6">
            Toutes Nos Recettes
          </h2>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveFilter(tab); setShowAllRecipes(false) }}
                className="whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shrink-0"
                style={{
                  background: activeFilter === tab ? '#166534' : '#F5F5F4',
                  color: activeFilter === tab ? '#FFFFFF' : '#44403C',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Recipe cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card-anim">
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>

          {filteredRecipes.length > 6 && !showAllRecipes && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAllRecipes(true)}
                className="px-8 py-3 rounded-md border-[1.5px] border-[#166534] text-[#166534] text-sm font-semibold transition-all duration-200 hover:bg-[#166534] hover:text-white"
              >
                Voir Plus
              </button>
            </div>
          )}

          {visibleRecipes.length === 0 && (
            <div className="text-center py-16">
              <Leaf size={48} className="mx-auto text-[#D6D3D1] mb-4" />
              <p className="text-[#57534E]">Aucune recette ne correspond a ce filtre.</p>
            </div>
          )}
        </div>
      </div>

      {/* ========== SECTION 4: CONSERVATION TIPS ========== */}
      <div className="tips-section bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-[#1C1917] leading-tight tracking-tight">
              Conseils de Conservation
            </h2>
            <p className="text-[15px] lg:text-base text-[#44403C] mt-4 max-w-2xl mx-auto leading-relaxed">
              Prolongez la fraicheur de vos produits TerraFerme avec nos astuces paysannes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {conservationTips.map((tip, i) => {
              const Icon = tip.icon
              return (
                <div
                  key={i}
                  className="tip-card-anim bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] p-8"
                >
                  <Icon size={32} style={{ color: tip.color }} />
                  <h3 className="font-semibold text-lg text-[#1C1917] mt-4">
                    {tip.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {tip.tips.map((t, j) => (
                      <li key={j} className="flex items-start gap-2 text-[15px] text-[#44403C] leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-[#78716C] mt-2.5 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ========== SECTION 5: SEASONAL CALENDAR ========== */}
      <div className="calendar-section bg-[#FAFAF9] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-[28px] lg:text-[40px] font-semibold text-[#1C1917] leading-tight tracking-tight">
              Calendrier des Produits de Saison
            </h2>
            <p className="text-[15px] lg:text-base text-[#44403C] mt-4 max-w-2xl mx-auto leading-relaxed">
              Decouvrez quels produits sont a leur apogee chaque mois.
            </p>
          </div>

          {/* Season tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {calendarSeasons.map((s) => {
              const config = seasonConfig[s.key]
              const Icon = config.icon
              const isActive = expandedSeason === s.key
              return (
                <button
                  key={s.key}
                  onClick={() => setExpandedSeason(isActive ? null : s.key)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    background: isActive ? config.color : 'white',
                    color: isActive ? 'white' : config.color,
                    border: `1.5px solid ${isActive ? config.color : '#E7E5E4'}`,
                  }}
                >
                  <Icon size={14} />
                  {config.label}
                  <span className="text-[11px] opacity-70">({s.months})</span>
                </button>
              )
            })}
          </div>

          {/* Expanded season content */}
          {calendarSeasons.map((s) => {
            if (expandedSeason !== s.key) return null
            const config = seasonConfig[s.key]
            return (
              <div
                key={s.key}
                className="calendar-section-anim bg-white rounded-xl border border-[#E7E5E4] p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `${config.color}18` }}
                  >
                    <config.icon size={20} style={{ color: config.color }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                      {config.label}
                    </h3>
                    <p className="text-sm text-[#57534E]">{s.months}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {s.products.map((product) => (
                    <div
                      key={product}
                      className="flex items-center justify-center px-4 py-3 rounded-md text-xs font-medium"
                      style={{
                        background: `${config.color}15`,
                        color: config.color,
                      }}
                    >
                      {product}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ========== SECTION 6: NEWSLETTER CTA ========== */}
      <section className="newsletter-section py-20" style={{ background: '#166534' }}>
        <div className="max-w-xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <h2 className="newsletter-anim font-display text-[28px] lg:text-[40px] font-semibold text-white leading-tight tracking-tight">
            Recevez Nos Recettes de Saison
          </h2>
          <p className="newsletter-anim text-[17px] lg:text-[19px] text-white/80 mt-4 leading-relaxed">
            Inscrivez-vous a notre newsletter mensuelle: recettes, conseils de conservation et nouveautes produits directement dans votre boite mail.
          </p>

          <div className="newsletter-anim mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              className="w-full sm:flex-1 px-4 py-3.5 rounded-md bg-white text-[#1C1917] text-sm placeholder:text-[#78716C] outline-none focus:ring-2 focus:ring-white/30 transition-shadow duration-200"
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
            />
            <button
              onClick={handleSubscribe}
              className="w-full sm:w-auto px-6 py-3.5 rounded-md text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 shrink-0"
              style={{ background: '#D97706', color: '#1C1917' }}
            >
              {subscribed ? 'Inscrit !' : "S'inscrire"}
            </button>
          </div>

          <p className="mt-4 text-xs text-white/60">
            Desinscription a tout moment. Pas de spam.
          </p>
        </div>
      </section>
    </div>
  )
}
