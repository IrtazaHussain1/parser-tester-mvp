/** Breadcrumb trail. Thin mode drops #wayfinding-breadcrumbs / .amz-breadcrumb hooks used by the Go extractor. */
export function Breadcrumbs({ items, thin = false }: { items: string[]; thin?: boolean }) {
  if (thin) {
    return (
      <div className="sf-crumbs">
        {items.map((item, i) => (
          <span key={item}>
            {i > 0 && ' / '}
            {item}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div id="wayfinding-breadcrumbs_feature_div" className="amz-breadcrumb">
      <ul
        className="a-unordered-list a-horizontal a-size-small"
        style={{ listStyle: 'none', display: 'inline', padding: 0, margin: 0 }}
      >
        {items.map((item, i) => (
          <li key={item} style={{ display: 'inline' }}>
            <a href="#">{item}</a>
            {i < items.length - 1 ? ' › ' : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}
