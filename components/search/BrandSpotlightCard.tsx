/** Sponsored brand spotlight card on search pages. */
export function BrandSpotlightCard({
  brand,
  tagline,
  cta,
}: {
  brand: string
  tagline: string
  cta: string
}) {
  return (
    <div className="amz-brand-spotlight" data-component="brand-spotlight">
      <span className="amz-sponsored">Sponsored</span>
      <div className="amz-brand-spotlight__brand">{brand}</div>
      <p className="amz-brand-spotlight__tagline">{tagline}</p>
      <a href="#" className="amz-brand-spotlight__cta">
        {cta}
      </a>
    </div>
  )
}
