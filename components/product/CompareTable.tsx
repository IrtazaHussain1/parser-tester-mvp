import type { CompareRow } from '@/lib/types'

export function CompareTable({
  title,
  columns,
  rows,
}: {
  title: string
  columns: string[]
  rows: CompareRow[]
}) {
  return (
    <div className="amz-section">
      <h2>{title}</h2>
      <table className="amz-compare">
        <thead>
          <tr>
            <th></th>
            {columns.map((c) => (
              <th key={c}>{c.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              {row.values.map((v, i) => <td key={i}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
