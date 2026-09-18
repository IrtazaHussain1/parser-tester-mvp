import type { CustomersSay } from '@/lib/types'

/** Review-theme highlight strip (“Customers say”). */
export function CustomersSay({ data }: { data: CustomersSay }) {
  return (
    <div id="cr-product-insights" className="amz-section amz-customers-say">
      <h2>{data.heading}</h2>
      <p className="amz-customers-say__summary">{data.summary}</p>
      <ul className="amz-customers-say__themes">
        {data.themes.map((theme) => (
          <li key={theme.label} data-sentiment={theme.sentiment}>
            <span className="amz-customers-say__chip">{theme.label}</span>
            <span className="amz-customers-say__sentiment">{theme.sentiment}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
