export function Bullets({ items }: { items: string[] }) {
  return (
    <>
      <h2 className="amz-about-heading">About this item</h2>
      <div id="feature-bullets">
        <ul className="a-unordered-list a-vertical a-spacing-mini amz-bullets">
          {items.map((text) => (
            <li key={text}><span className="a-list-item">{text}</span></li>
          ))}
        </ul>
      </div>
    </>
  )
}
