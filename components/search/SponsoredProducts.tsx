import type { SponsoredProduct } from '@/lib/types'

/** Separately identified sponsored products strip (`sponsoredProducts[]`). */
export function SponsoredProducts({ items }: { items: SponsoredProduct[] }) {
  return (
    <div className="amz-sponsored-products" data-field="sponsoredProducts">
      <h3>Sponsored products related to this search</h3>
      <div className="amz-sponsored-products__track">
        {items.map((item) => (
          <a className="amz-sponsored-products__card" href={item.url} key={item.name}>
            {item.image && <img src={item.image.url} alt={item.image.altText ?? item.name} />}
            <span className="amz-sponsored">Sponsored</span>
            <div className="amz-sponsored-products__name" data-field="name">
              {item.name}
            </div>
            {item.price != null && (
              <div className="amz-sponsored-products__price" data-currency={item.currency ?? 'USD'}>
                ${item.price.toFixed(2)}
              </div>
            )}
            {item.sponsorInfo?.advertiser && (
              <div className="amz-sponsored-products__advertiser">
                by {item.sponsorInfo.advertiser}
                {item.sponsorInfo.campaignType ? ` · ${item.sponsorInfo.campaignType}` : ''}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
