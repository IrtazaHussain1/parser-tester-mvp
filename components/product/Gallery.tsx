'use client'

import { useEffect, useState } from 'react'

/**
 * Product image gallery.
 * Main image follows the selected variant (`main` prop) and can also be switched via thumbnails.
 */
export function Gallery({ main, thumbnails, title }: { main: string; thumbnails: string[]; title: string }) {
  const [activeSrc, setActiveSrc] = useState(main)

  useEffect(() => {
    setActiveSrc(main)
  }, [main])

  const thumbs = thumbnails.includes(main) ? thumbnails : [main, ...thumbnails]

  return (
    <div className="col-images">
      <div className="amz-gallery">
        <div id="altImages" className="amz-gallery__thumbs">
          <ul
            className="a-unordered-list a-nostyle a-horizontal list maintain-height"
            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            {thumbs.map((src, i) => (
              <li className="item" key={`${src}-${i}`}>
                <button
                  type="button"
                  className={`a-button a-button-thumbnail${src === activeSrc ? ' is-active' : ''}`}
                  onClick={() => setActiveSrc(src)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt={`thumb ${i + 1}`} className={src === activeSrc ? 'is-active' : undefined} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div id="imgTagWrapperId" className="amz-gallery__main">
          <img id="landingImage" src={activeSrc} data-old-hires={activeSrc} alt={title} />
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
