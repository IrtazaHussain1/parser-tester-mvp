export function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <div id="wayfinding-breadcrumbs_feature_div" className="amz-breadcrumb">
      <ul className="a-unordered-list a-horizontal a-size-small" style={{ listStyle: 'none', display: 'inline', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={item} style={{ display: 'inline' }}>
            <a href="#">{item}</a>{i < items.length - 1 ? ' › ' : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}
