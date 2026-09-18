/** Editorial promo banner above search results (training pages). */
export function EditorialBanner({
  title,
  body,
  cta,
}: {
  title: string
  body: string
  cta: string
}) {
  return (
    <div className="amz-editorial" data-csa-c-type="banner">
      <div className="amz-editorial__copy">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <a href="#" className="amz-editorial__cta">
        {cta}
      </a>
    </div>
  )
}
