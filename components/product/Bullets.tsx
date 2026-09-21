/** About-this-item bullets. Thin mode omits #feature-bullets so Go `features` stays empty. */
export function Bullets({ items, thin = false }: { items: string[]; thin?: boolean }) {
  if (thin) {
    return (
      <ul className="sf-bullets">
        {items.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <h2 className="amz-about-heading">About this item</h2>
      <div id="feature-bullets">
        <ul className="a-unordered-list a-vertical a-spacing-mini amz-bullets">
          {items.map((text) => (
            <li key={text}>
              <span className="a-list-item">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
