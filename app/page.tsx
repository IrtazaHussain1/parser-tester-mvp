import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { getAllProductSlugs, getAllSearchSlugs } from '@/lib/data'

/** Training product slugs are numeric pages 1–5. */
const PRODUCT_TRAINING = ['1', '2', '3', '4', '5'] as const
/** Testing product slugs are t1–t5 (thinner content, optional sections omitted). */
const PRODUCT_TESTING = ['t1', 't2', 't3', 't4', 't5'] as const

/**
 * Named search queries — training order maps to Page 1–5 on the index.
 * Testing uses the same names with a `t-` prefix.
 */
const SEARCH_TRAINING = ['mobile', 'laptop', 'headphones', 'earbuds', 'keyboard'] as const

interface IndexLink {
  href: string
  label: string
  meta?: string
  available: boolean
}

/**
 * Renders a Training or Testing link grid inside an index panel.
 */
function LinkPanel({
  title,
  tone,
  links,
}: {
  title: string
  tone: 'training' | 'testing'
  links: IndexLink[]
}) {
  return (
    <div className={`sf-index-panel sf-index-panel--${tone}`}>
      <div className="sf-index-panel__head">
        <h3>{title}</h3>
        <span className="sf-index-panel__count">{links.length} pages</span>
      </div>
      <ul className="sf-index-links">
        {links.map((link) => (
          <li key={link.href}>
            {link.available ? (
              <Link href={link.href} className="sf-index-link">
                <span className="sf-index-link__label">{link.label}</span>
                {link.meta && <span className="sf-index-link__meta">{link.meta}</span>}
                <span className="sf-index-link__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : (
              <span className="sf-index-link sf-index-link--missing">
                <span className="sf-index-link__label">{link.label}</span>
                <span className="sf-index-link__meta">missing</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Home index for ShopFixture pages.
 * Lists product and search fixtures under Training Data / Testing Data.
 */
export default function Home() {
  const productSlugs = new Set(getAllProductSlugs())
  const searchSlugs = new Set(getAllSearchSlugs())

  const productTraining: IndexLink[] = PRODUCT_TRAINING.map((slug, i) => ({
    href: `/product/${slug}`,
    label: `Page ${i + 1}`,
    meta: `/product/${slug}`,
    available: productSlugs.has(slug),
  }))

  const productTesting: IndexLink[] = PRODUCT_TESTING.map((slug, i) => ({
    href: `/product/${slug}`,
    label: `Page ${i + 1}`,
    meta: `/product/${slug}`,
    available: productSlugs.has(slug),
  }))

  const searchTraining: IndexLink[] = SEARCH_TRAINING.map((slug, i) => ({
    href: `/search/${slug}`,
    label: `Page ${i + 1}`,
    meta: slug,
    available: searchSlugs.has(slug),
  }))

  const searchTesting: IndexLink[] = SEARCH_TRAINING.map((slug, i) => {
    const testSlug = `t-${slug}`
    return {
      href: `/search/${testSlug}`,
      label: `Page ${i + 1}`,
      meta: testSlug,
      available: searchSlugs.has(testSlug),
    }
  })

  return (
    <>
      <SiteHeader />
      <main className="sf-index">
        <header className="sf-index-hero">
          <p className="sf-index-hero__eyebrow">ScrapeOps · Parser fixtures</p>
          <h1>ShopFixture Test Pages</h1>
          <p className="sf-index-hero__lede">
            JSON-driven product and search pages with a shared DOM. Training pages are fully
            populated; testing pages use the same structure with less content and optional
            sections omitted.
          </p>
        </header>

        <section className="sf-index-section" aria-labelledby="product-pages-heading">
          <div className="sf-index-section__title">
            <h2 id="product-pages-heading">Product Pages</h2>
            <p>Same PDP layout · different catalog content</p>
          </div>
          <div className="sf-index-grid">
            <LinkPanel title="Training Data" tone="training" links={productTraining} />
            <LinkPanel title="Testing Data" tone="testing" links={productTesting} />
          </div>
        </section>

        <section className="sf-index-section" aria-labelledby="search-pages-heading">
          <div className="sf-index-section__title">
            <h2 id="search-pages-heading">Search Pages</h2>
            <p>Named queries · training vs thinner testing result sets</p>
          </div>
          <div className="sf-index-grid">
            <LinkPanel title="Training Data" tone="training" links={searchTraining} />
            <LinkPanel title="Testing Data" tone="testing" links={searchTesting} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
