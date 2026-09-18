import type { QAEntry } from '@/lib/types'

export function QA({ items }: { items: QAEntry[] }) {
  return (
    <div className="amz-section">
      <h2>Customer questions &amp; answers</h2>
      {items.map((qa) => (
        <div className="amz-qa" key={qa.question}>
          <div className="amz-qa__q">Q: {qa.question}</div>
          <div className="amz-qa__a">A: {qa.answer}</div>
          <div className="amz-qa__meta">{qa.meta}</div>
        </div>
      ))}
    </div>
  )
}
