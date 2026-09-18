export function SpecsTable({
  specs,
  manufacturer,
  weight,
  ratingStars,
}: {
  specs: { label: string; value: string }[]
  manufacturer: string
  weight: string
  ratingStars: number
}) {
  return (
    <div className="amz-section">
      <h2>Product information</h2>
      <table id="productDetails_detailBullets_sections1" className="amz-spec-table" style={{ display: 'none' }}>
        <tbody>
          <tr><th>Manufacturer</th><td>{manufacturer}</td></tr>
          <tr><th>Item Weight</th><td>{weight}</td></tr>
          <tr><th>Customer Reviews</th><td></td></tr>
        </tbody>
      </table>
      <div id="detailBullets_feature_div">
        <ul className="detail-bullet-list amz-spec-table" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {specs.map(({ label, value }) => (
            <li key={label} style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '8px 12px' }}>
              <span className="a-list-item">
                <span className="a-text-bold" style={{ width: 220, display: 'inline-block', color: 'var(--amz-text-secondary)' }}>{label}&nbsp;:&nbsp;</span>
                <span className="a-list-item">{value}</span>
              </span>
            </li>
          ))}
          <li style={{ display: 'flex', padding: '8px 12px' }}>
            <span className="a-list-item">
              <span className="a-text-bold" style={{ width: 220, display: 'inline-block', color: 'var(--amz-text-secondary)' }}>Customer Reviews&nbsp;:&nbsp;</span>
              <span className="a-list-item">{ratingStars} out of 5 stars</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
