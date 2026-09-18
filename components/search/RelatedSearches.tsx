import type { RelatedSearch } from '@/lib/types'

/** Related search chips (`relatedSearches[]` schema). */
export function RelatedSearches({ items }: { items: RelatedSearch[] }) {
  return (
    <div className="amz-related-searches" id="relatedSearches" data-field="relatedSearches">
      <h3>Related searches</h3>
      <ul>
        {items.map((item) => (
          <li key={item.searchTerm}>
            <a href={item.url} data-field="searchTerm">
              {item.searchTerm}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
