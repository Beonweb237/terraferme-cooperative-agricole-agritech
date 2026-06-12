import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search,
  FileText,
  Image,
  FolderOpen,
  Mail,
  ArrowRight,
  Clock,
  Calendar,
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
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeExpoOut } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: easeExpoOut },
  },
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type Category = 'Tous' | 'Recoltes' | 'Marche' | 'AgriTech' | 'Cooperative' | 'Durable' | 'Presse'

interface Article {
  id: number
  title: string
  category: Category
  date: string
  readTime: string
  image: string | null
  excerpt?: string
  author?: string
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const categories: Category[] = [
  'Tous',
  'Recoltes',
  'Marche',
  'AgriTech',
  'Cooperative',
  'Durable',
  'Presse',
]

const categoryStyles: Record<string, string> = {
  Recoltes: '#166534',
  Marche: '#D97706',
  AgriTech: '#2563EB',
  Cooperative: '#92400E',
  Durable: '#059669',
  Presse: '#991B1B',
}

const allArticles: Article[] = [
  {
    id: 1,
    title: 'Les Premiers Signes du Printemps dans Nos Vignes',
    category: 'Recoltes',
    date: '10 Mars 2026',
    readTime: '4 min',
    image: '/season-spring.jpg',
    excerpt: 'Les bourgeons commencent a pointer sur nos ceps de Cabernet Franc a Bourgueil.',
  },
  {
    id: 2,
    title: 'Prix des Cereales: Tendances du Premier Trimestre 2026',
    category: 'Marche',
    date: '8 Mars 2026',
    readTime: '6 min',
    image: null,
    excerpt: 'Analyse des marches cerealiers et perspectives pour les mois a venir.',
  },
  {
    id: 3,
    title: 'Notre Partenariat avec l\'INRAE sur l\'Agroecologie',
    category: 'AgriTech',
    date: '5 Mars 2026',
    readTime: '5 min',
    image: null,
    excerpt: 'Un partenariat de recherche pour developper les pratiques agroecologiques.',
  },
  {
    id: 4,
    title: 'Assemblee Generale 2026: Les Decisions Cles',
    category: 'Cooperative',
    date: '1 Mars 2026',
    readTime: '3 min',
    image: null,
    excerpt: 'Retour sur les decisions majeures votees par nos membres.',
  },
  {
    id: 5,
    title: 'Objectif Neutralite Carbone: Bilan a Mi-Parcours',
    category: 'Durable',
    date: '25 Fev 2026',
    readTime: '7 min',
    image: null,
    excerpt: 'Ou en sommes-nous dans notre trajectoire vers la neutralite carbone ?',
  },
  {
    id: 6,
    title: 'TerraFerme dans le Top 10 des Cooperatives Innovantes',
    category: 'Presse',
    date: '20 Fev 2026',
    readTime: '2 min',
    image: null,
    excerpt: 'Classement national des cooperatives les plus innovantes.',
  },
  {
    id: 7,
    title: 'Recette: la Tarte aux Pommes Reinettes TerraFerme',
    category: 'Recoltes',
    date: '18 Fev 2026',
    readTime: '4 min',
    image: '/recette-tarte.jpg',
    excerpt: 'Une recette simple et gourmande avec nos pommes de saison.',
  },
  {
    id: 8,
    title: 'Nouveau Drone de Surveillance: Test en Conditions Reelles',
    category: 'AgriTech',
    date: '15 Fev 2026',
    readTime: '5 min',
    image: '/agritech-drone.jpg',
    excerpt: 'Notre nouveau drone autonome passe le test sur le terrain.',
  },
  {
    id: 9,
    title: 'Journee Portes Ouvertes: 500 Visiteurs a la Ferme',
    category: 'Cooperative',
    date: '10 Fev 2026',
    readTime: '3 min',
    image: null,
    excerpt: 'Un grand succes pour notre premiere journee portes ouvertes de l\'annee.',
  },
  {
    id: 10,
    title: 'Semis de Printemps: Retour sur les Nouvelles Varietes',
    category: 'Recoltes',
    date: '5 Fev 2026',
    readTime: '4 min',
    image: null,
    excerpt: 'Nos essais de nouvelles varietes de legumes pour la saison a venir.',
  },
  {
    id: 11,
    title: 'Marche des Legumes Bio: Hausse de la Demande',
    category: 'Marche',
    date: '2 Fev 2026',
    readTime: '5 min',
    image: null,
    excerpt: 'Le marche des legumes biologiques continue sa croissance.',
  },
  {
    id: 12,
    title: 'Capteurs IoT de Nouvelle Generation Deployes',
    category: 'AgriTech',
    date: '28 Jan 2026',
    readTime: '4 min',
    image: '/agritech-capteurs.jpg',
    excerpt: 'De nouveaux capteurs plus precis et plus autonomes rejoignent notre reseau.',
  },
  {
    id: 13,
    title: 'Charte Qualite TerraFerme 2026 Signee',
    category: 'Cooperative',
    date: '22 Jan 2026',
    readTime: '3 min',
    image: null,
    excerpt: 'Nos membres ont vote a l\'unanimité notre nouvelle charte qualite.',
  },
  {
    id: 14,
    title: 'Biodiversite: 12 km de Haies Plantees',
    category: 'Durable',
    date: '18 Jan 2026',
    readTime: '6 min',
    image: '/biodiversity-field.jpg',
    excerpt: 'Notre programme de plantation de haies bat son plein.',
  },
  {
    id: 15,
    title: 'Prix de l\'Innovation Agricole 2026',
    category: 'Presse',
    date: '12 Jan 2026',
    readTime: '2 min',
    image: null,
    excerpt: 'TerraFerme lauréate du prix de l\'innovation agricole regionale.',
  },
]

const featuredArticle = {
  category: 'AGRICULTURE DE PRECISION',
  title: 'TerraFerme Deploye 50 Nouveaux Capteurs IoT sur ses Parcelles de Vigne',
  excerpt: 'La cooperative agricole TerraFerme annonce le deploiement de 50 capteurs IoT supplementaires sur ses parcelles viticoles de Bourgueil et Chinon, renforcant son reseau de precision agriculture.',
  date: '15 Mars 2026',
  readTime: '5 min',
  author: 'Camille Rousseau',
  image: '/agritech-precision.jpg',
}

const pressResources = [
  {
    icon: FileText,
    title: 'Communiques',
    desc: 'Tous les communiques officiels de TerraFerme depuis 2020.',
    cta: 'Telecharger',
  },
  {
    icon: Image,
    title: 'Banque d\'Images',
    desc: 'Photos haute resolution de nos fermes, produits et technologies. Usage mediatique autorise.',
    cta: 'Acceder',
  },
  {
    icon: FolderOpen,
    title: 'Dossier Complet',
    desc: 'Presentation de la cooperative, chiffres cles, interviews et bios.',
    cta: 'Telecharger le PDF',
  },
  {
    icon: Mail,
    title: 'Contact Presse',
    desc: 'contact.presse@terraferme.coop · 02 47 XX XX XX',
    cta: 'Nous Ecrire',
  },
]

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */
export default function News() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(9)
  const [email, setEmail] = useState('')
  const filteredArticles = useMemo(() => {
    let filtered = allArticles
    if (activeCategory !== 'Tous') {
      filtered = filtered.filter((a) => a.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.excerpt?.toLowerCase().includes(q) ?? false)
      )
    }
    return filtered
  }, [activeCategory, searchQuery])

  const visibleArticles = filteredArticles.slice(0, visibleCount)
  const hasMore = visibleCount < filteredArticles.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat)
    setVisibleCount(9)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setVisibleCount(9)
  }

  /* Fallback gradient for articles without images */
  const articleGradient = (id: number): string => {
    const gradients = [
      'linear-gradient(135deg, #166534 0%, #14532d 100%)',
      'linear-gradient(135deg, #92400E 0%, #78350f 100%)',
      'linear-gradient(135deg, #1e3a5f 0%, #0F172A 100%)',
      'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
    ]
    return gradients[id % gradients.length]
  }

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* SECTION 1 — Page Header                                       */}
      {/* ============================================================ */}
      <section
        className="w-full pt-36 md:pt-44 pb-16 md:pb-20 px-4 sm:px-8 lg:px-12"
        style={{ background: '#1C1917' }}
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
            <span>Actualites</span>
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-display font-bold text-white mb-4"
            style={{
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: easeExpoOut }}
          >
            L&apos;Actualite TerraFerme
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="font-body text-lg max-w-xl mx-auto mb-6"
            style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeExpoOut, delay: 0.3 }}
          >
            Suivez nos recoltes, nos innovations et l&apos;actualite du monde agricole.
          </motion.p>

          {/* Stats */}
          <motion.p
            className="font-mono text-sm text-[#D97706]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            3 articles/semaine · Couverture regionale · depuis 2018
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Category Filters (sticky)                         */}
      {/* ============================================================ */}
      <section
        className="w-full py-5 px-4 sm:px-8 lg:px-12 bg-white border-b border-[#E7E5E4] sticky z-30"
        style={{ top: '64px' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          {/* Category pills */}
          <motion.div
            className="flex flex-wrap gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="px-4 py-2 rounded-md font-body text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? '#166534' : '#F5F5F4',
                  color: activeCategory === cat ? '#FFFFFF' : '#44403C',
                }}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
                type="button"
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534E]"
            />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-9 pr-4 py-2 w-[200px] border border-[#E7E5E4] rounded-md font-body text-sm focus:outline-none focus:border-[#166534] focus:ring-[3px] focus:ring-[rgba(22,101,52,0.1)] transition-all"
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Featured Article                                  */}
      {/* ============================================================ */}
      <section className="w-full py-12 md:py-16 px-4 sm:px-8 lg:px-12" style={{ background: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12 items-center">
            {/* Image */}
            <motion.div
              className="relative rounded-xl overflow-hidden"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-auto object-cover aspect-video"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 rounded-md">
                <span className="font-body text-xs text-[#1C1917]">{featuredArticle.date}</span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeExpoOut, delay: 0.2 }}
            >
              <span
                className="inline-block font-body text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded mb-3"
                style={{ background: '#D97706', color: '#1C1917' }}
              >
                {featuredArticle.category}
              </span>
              <h2
                className="font-display font-semibold text-[#1C1917] mb-4"
                style={{
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.015em',
                }}
              >
                {featuredArticle.title}
              </h2>
              <p
                className="font-body text-lg text-[#44403C] mb-4"
                style={{ lineHeight: 1.65 }}
              >
                {featuredArticle.excerpt}
              </p>
              <p className="font-body text-[13px] text-[#57534E] mb-6">
                {featuredArticle.readTime} de lecture · Par {featuredArticle.author}
              </p>
              <button
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#166534] text-white rounded-md font-body text-sm font-semibold tracking-[0.02em] transition-all duration-200 hover:bg-[#14532D] hover:scale-[1.02]"
                type="button"
              >
                Lire l&apos;Article
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Article Grid                                      */}
      {/* ============================================================ */}
      <section className="w-full py-12 md:py-16 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: easeExpoOut }}
          >
            <h2
              className="font-display font-semibold text-[#1C1917]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
            >
              {activeCategory === 'Tous' ? 'Tous les Articles' : activeCategory}
            </h2>
            <span className="font-body text-xs font-medium uppercase tracking-wider text-[#57534E]">
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
            </span>
          </motion.div>

          {/* Grid */}
          {visibleArticles.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {visibleArticles.map((article) => (
                <motion.article
                  key={article.id}
                  className="group cursor-pointer"
                  variants={staggerChild}
                >
                  {/* Thumbnail */}
                  <div className="rounded-lg overflow-hidden mb-4 aspect-video">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: articleGradient(article.id) }}
                      >
                        <FileText size={32} className="text-white/40" />
                      </div>
                    )}
                  </div>

                  {/* Category tag */}
                  <span
                    className="inline-block font-body text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded mb-2"
                    style={{
                      background: (categoryStyles[article.category] || '#166534') + '15',
                      color: categoryStyles[article.category] || '#166534',
                    }}
                  >
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-body text-base font-semibold text-[#1C1917] mb-2 transition-colors duration-200 group-hover:text-[#166534] leading-snug">
                    {article.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-[#57534E]">
                    <span className="flex items-center gap-1 font-body text-[13px]">
                      <Calendar size={13} />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1 font-body text-[13px]">
                      <Clock size={13} />
                      {article.readTime}
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-body text-[#57534E]">Aucun article ne correspond a votre recherche.</p>
            </motion.div>
          )}

          {/* Pagination */}
          {hasMore && (
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={handleLoadMore}
                className="px-8 py-3.5 border-[1.5px] border-[#166534] text-[#166534] rounded-md font-body text-sm font-semibold tracking-[0.02em] transition-all duration-200 hover:bg-[#166534] hover:text-white"
                type="button"
              >
                Charger Plus
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Press Kit & Media                                 */}
      {/* ============================================================ */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-8 lg:px-12" style={{ background: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: easeExpoOut }}
          >
            <h2
              className="font-display font-semibold text-[#1C1917] mb-3"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
            >
              Espace Presse
            </h2>
            <p className="font-body text-[15px] text-[#44403C] max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
              Communiques de presse, photos haute resolution et informations pour les journalistes.
            </p>
          </motion.div>

          {/* Resource cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {pressResources.map((res) => (
              <motion.div
                key={res.title}
                className="bg-white border border-[#E7E5E4] rounded-xl p-8 transition-all duration-300 hover:border-[#166534] cursor-default"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeExpoOut } },
                }}
              >
                <res.icon size={32} className="text-[#166534] mb-4" />
                <h4 className="font-body text-base font-semibold text-[#1C1917] mb-2">
                  {res.title}
                </h4>
                <p className="font-body text-[15px] text-[#44403C] mb-4" style={{ lineHeight: 1.7 }}>
                  {res.desc}
                </p>
                <button
                  className="font-body text-sm font-medium text-[#166534] underline underline-offset-4 transition-all duration-200 hover:underline-offset-8"
                  type="button"
                >
                  {res.cta}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — Newsletter CTA                                    */}
      {/* ============================================================ */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-8 lg:px-12" style={{ background: '#166534' }}>
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: easeExpoOut }}
        >
          <h2
            className="font-display font-semibold text-white mb-3"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
          >
            Restez Informe
          </h2>
          <p
            className="font-body text-lg mb-8"
            style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}
          >
            Recevez nos actualites directement dans votre boite mail. Hebdomadaire, desinscription a tout moment.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 justify-center mb-4"
            onSubmit={(e) => {
              e.preventDefault()
              setEmail('')
            }}
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3.5 rounded-md font-body text-sm bg-white border border-[#166534] text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:ring-[3px] focus:ring-[rgba(255,255,255,0.2)] w-full sm:w-[280px]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#D97706] text-[#1C1917] rounded-md font-body text-sm font-semibold tracking-[0.02em] transition-all duration-200 hover:scale-[1.02] shrink-0"
            >
              S&apos;inscrire
            </button>
          </form>

          <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Pas de spam. Un email par semaine maximum.
          </p>
        </motion.div>
      </section>
    </div>
  )
}
