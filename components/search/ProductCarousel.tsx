import type { SearchRecommendationProduct } from '@/lib/types'

/** Recommendations carousel from schema `recommendations.relatedProducts`. */
export function ProductCarousel({
  heading,
  items,
}: {
  heading: string
  items: SearchRecommendationProduct[]
}) {
  return (
    <div className="amz-section amz-carousel" data-field="recommendations">
      <h2>{heading}</h2>
      <div className="amz-carousel__track">
        {items.map((item) => (
          <a className="amz-carousel__card" href={item.url} key={item.name}>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
            <div className="amz-carousel__title" data-field="name">
              {item.name}
            </div>
            {item.price != null && (
              <div className="amz-carousel__price" data-field="price" data-currency={item.currency ?? 'USD'}>
                ${(item.price).toFixed(2)}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
