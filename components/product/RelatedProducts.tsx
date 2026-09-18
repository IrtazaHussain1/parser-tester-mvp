import type { RelatedProduct } from '@/lib/types'

function starGlyphs(stars: number): string {
  const filled = Math.round(stars)
  return '★★★★★'.slice(0, filled) + '☆☆☆☆☆'.slice(0, 5 - filled)
}

export function RelatedProducts({ items }: { items: RelatedProduct[] }) {
  return (
    <div className="amz-section">
      <h2>Products related to this item</h2>
      <div className="amz-related">
        {items.map((item) => (
          <div className="amz-related__card" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div className="title">{item.title}</div>
            <div className="amz-stars">{starGlyphs(item.stars)}</div>
            <div className="price">${item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
