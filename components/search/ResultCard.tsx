import type { SearchProduct } from '@/lib/types'

function starGlyphs(stars: number): string {
  const filled = Math.round(stars)
  return '★★★★★'.slice(0, filled) + '☆☆☆☆☆'.slice(0, 5 - filled)
}

const AVAILABILITY_LABEL: Record<NonNullable<SearchProduct['availability']>, string> = {
  in_stock: 'In Stock',
  out_of_stock: 'Out of Stock',
  pre_order: 'Pre-order',
  discontinued: 'Discontinued',
}

/** Single organic search result card rendered from schema `products[]`. */
export function ResultCard({ product }: { product: SearchProduct }) {
  const primaryImage = product.images?.[0]
  const rating = product.aggregateRating
  const wholePart = product.price != null ? Math.floor(product.price) : undefined
  const fractionPart = product.price != null ? product.price.toFixed(2).split('.')[1] : undefined
  const currencySymbol = product.currency === 'USD' || !product.currency ? '$' : `${product.currency} `
  /**
   * Full cards keep parser hooks (`.amz-result-card`, `.s-result-item`, …).
   * Thin testing cards must NOT use those classes — the Go extractor fills
   * availability/currency/shipping/variants with defaults for every match,
   * which keeps coverage ~84% even with almost no content.
   */
  const isFullCard =
    product.price != null ||
    product.preDiscountPrice != null ||
    Boolean(rating) ||
    Boolean(product.shipping) ||
    Boolean(product.badges?.length)

  if (!isFullCard) {
    return (
      <div className="sf-hit">
        <a className="sf-hit__link" href={product.url}>
          {product.name}
        </a>
      </div>
    )
  }

  return (
    <div
      className="s-result-item amz-result-card"
      data-component-type="s-search-result"
      data-asin={product.productId}
      data-sponsored={product.isSponsored ? 'true' : undefined}
    >
      {primaryImage && (
        <div className="amz-result-card__image">
          <img className="s-image" src={primaryImage.url} alt={primaryImage.altText ?? product.name} />
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="amz-result-card__extra-images" aria-hidden="true">
              {product.additionalImages.slice(0, 3).map((img) => (
                <img key={img.url} src={img.url} alt={img.altText ?? ''} />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="amz-result-card__body">
        {product.isSponsored && <span className="amz-sponsored">Sponsored</span>}
        {product.badges?.map((badge) => (
          <span className="amz-badge" data-badge-type={badge.type} key={`${badge.type}-${badge.label}`}>
            {badge.label}
          </span>
        ))}
        {product.brand && (
          <div className="amz-result-card__brand" data-field="brand">
            {product.brand}
          </div>
        )}
        <h2>
          <a className="a-link-normal s-no-outline" href={product.url} data-field="url">
            <span className="a-text-normal amz-result-card__title" data-field="name">
              {product.name}
            </span>
          </a>
        </h2>
        {product.category && (
          <div className="amz-result-card__category" data-field="category">
            {product.category}
          </div>
        )}
        {rating && (
          <div className="amz-result-card__rating" data-field="aggregateRating">
            <i className="a-icon a-icon-star-small">
              <span className="a-icon-alt">
                {rating.ratingValue} out of {rating.bestPossibleRating ?? 5} stars
              </span>
            </i>
            <span className="amz-stars">{starGlyphs(rating.ratingValue)}</span>
            {rating.reviewCount != null && (
              <div data-cy="reviews-block">
                <a href="#reviews" aria-label={`${rating.reviewCount.toLocaleString()} ratings`}>
                  <span className="a-size-mini s-underline-text">{rating.reviewCount.toLocaleString()}</span>
                </a>
              </div>
            )}
          </div>
        )}
        {product.description && (
          <p className="amz-result-card__desc" data-field="description">
            {product.description}
          </p>
        )}
        {product.keyFeatures && product.keyFeatures.length > 0 && (
          <ul className="amz-result-card__features" data-field="keyFeatures">
            {product.keyFeatures.map((f) => {
              const [label, ...rest] = f.split(':')
              const value = rest.join(':').trim()
              return (
                <li key={f}>
                  {value ? (
                    <>
                      <span className="amz-result-card__feat-label">{label}:</span> {value}
                    </>
                  ) : (
                    f
                  )}
                </li>
              )
            })}
          </ul>
        )}
        {/* Only emit price DOM when a price exists — empty wrappers inflate parser coverage. */}
        {(product.price != null || product.preDiscountPrice != null || product.priceRange) && (
          <div className="amz-result-card__price" data-field="price">
            {product.price != null && (
              <span className="a-price" data-a-color="base" data-currency={product.currency ?? 'USD'}>
                <span className="a-offscreen">
                  {currencySymbol}
                  {product.price.toFixed(2)}
                </span>
                <span aria-hidden="true">
                  <span className="a-price-symbol">{currencySymbol}</span>
                  <span className="a-price-whole">{wholePart}</span>
                  <span className="a-price-fraction">{fractionPart}</span>
                </span>
              </span>
            )}
            {product.preDiscountPrice != null && (
              <span
                className="a-price a-text-price price-strike amz-result-card__price-strike"
                data-a-strike="true"
                data-field="preDiscountPrice"
              >
                <span className="a-offscreen">${product.preDiscountPrice.toFixed(2)}</span>
                <span aria-hidden="true">${product.preDiscountPrice.toFixed(2)}</span>
              </span>
            )}
            {product.priceRange && (
              <span className="amz-result-card__price-range" data-field="priceRange">
                ${product.priceRange.minPrice.toFixed(2)} – ${product.priceRange.maxPrice.toFixed(2)}
              </span>
            )}
          </div>
        )}
        {product.promotions?.map((promo) => (
          <div className="amz-result-card__promo" data-field="promotions" key={promo.description}>
            {promo.description}
            {promo.discountPercentage != null && ` (−${promo.discountPercentage}%)`}
          </div>
        ))}
        {product.availability && (
          <div className="amz-result-card__availability" data-field="availability" data-status={product.availability}>
            {AVAILABILITY_LABEL[product.availability]}
            {product.availabilityMessage && ` · ${product.availabilityMessage}`}
          </div>
        )}
        {product.shipping && (
          <div className="a-row a-size-base a-color-secondary" data-field="shipping">
            {product.shipping.prime && <span className="amz-prime">✓ prime </span>}
            {product.shipping.freeShipping && <span>FREE shipping </span>}
            {product.shipping.shippingCost != null && !product.shipping.freeShipping && (
              <span>${product.shipping.shippingCost.toFixed(2)} shipping </span>
            )}
            {product.shipping.estimatedDelivery && (
              <span className="a-color-base">{product.shipping.estimatedDelivery}</span>
            )}
          </div>
        )}
        {product.variants?.visibleOptions && product.variants.visibleOptions.length > 0 && (
          <div className="amz-result-card__variants" data-field="variants">
            {product.variants.variantCount != null && (
              <span className="amz-result-card__variant-count">{product.variants.variantCount} options</span>
            )}
            <div className="amz-result-card__swatches">
              {product.variants.visibleOptions.map((opt) => (
                <span className="amz-result-card__swatch" key={`${opt.type}-${opt.value}`} title={`${opt.type}: ${opt.value}`}>
                  {opt.imageUrl ? <img src={opt.imageUrl} alt={opt.value} /> : opt.value}
                </span>
              ))}
            </div>
          </div>
        )}
        {product.seller && (
          <div className="amz-result-card__seller" data-field="seller">
            Sold by{' '}
            {product.seller.url ? (
              <a href={product.seller.url}>{product.seller.name}</a>
            ) : (
              product.seller.name
            )}
            {product.seller.rating != null && ` · ${product.seller.rating}% positive`}
          </div>
        )}
      </div>
    </div>
  )
}
