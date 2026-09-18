export function Description({
  paragraphs,
  aplus,
}: {
  paragraphs: string[]
  aplus?: { heading: string; paragraphs: string[] }
}) {
  return (
    <>
      <h2 className="amz-about-heading">Product Description</h2>
      <div id="productDescription" className="amz-description">
        {paragraphs.map((p) => <p key={p}>{p}</p>)}
      </div>
      {aplus && (
        <div id="aplus" className="amz-aplus">
          <h3>{aplus.heading}</h3>
          {aplus.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
      )}
    </>
  )
}
