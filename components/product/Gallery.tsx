export function Gallery({ main, thumbnails, title }: { main: string; thumbnails: string[]; title: string }) {
  return (
    <div className="col-images">
      <div className="amz-gallery">
        <div id="altImages" className="amz-gallery__thumbs">
          <ul className="a-unordered-list a-nostyle a-horizontal list maintain-height" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {thumbnails.map((src, i) => (
              <li className="item" key={src}>
                <span className="a-button a-button-thumbnail"><img src={src} alt={`thumb ${i + 1}`} /></span>
              </li>
            ))}
          </ul>
        </div>
        <div id="imgTagWrapperId" className="amz-gallery__main">
          <img id="landingImage" src={main} data-old-hires={main} alt={title} />
        </div>
      </div>
      <div className="amz-gallery__actions">
        <span>🔗 Share</span>
        <span>❤ Add to List</span>
        <span>🖼 See more images</span>
      </div>
    </div>
  )
}
