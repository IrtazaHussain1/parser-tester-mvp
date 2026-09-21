import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

/**
 * Shown for unknown routes and when `notFound()` is called (e.g. missing product/search slug).
 * With `output: 'export'`, Next.js also emits `out/404.html` for static hosts / Vercel.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="sf-not-found">
        <p className="sf-not-found__code">404</p>
        <h1>Page not found</h1>
        <p className="sf-not-found__lede">
          That URL is unknown or the fixture is unavailable. Check the slug, or go back to the
          test-page index.
        </p>
        <div className="sf-not-found__actions">
          <Link href="/" className="sf-not-found__btn sf-not-found__btn--primary">
            Back to home
          </Link>
          <Link href="/search/laptop/" className="sf-not-found__btn">
            Sample search
          </Link>
          <Link href="/product/1/" className="sf-not-found__btn">
            Sample product
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
