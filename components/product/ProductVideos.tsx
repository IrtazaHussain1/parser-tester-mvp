import type { ProductVideo } from '@/lib/types'

/** Product video thumbnails strip. */
export function ProductVideos({ videos }: { videos: ProductVideo[] }) {
  return (
    <div id="vse-related-videos" className="amz-section amz-videos">
      <h2>Videos</h2>
      <div className="amz-videos__grid">
        {videos.map((video) => (
          <a href="#" className="amz-videos__card" key={video.title}>
            <div className="amz-videos__thumb">
              <img src={video.thumbnail} alt={video.title} />
              <span className="amz-videos__duration">{video.duration}</span>
            </div>
            <span className="amz-videos__title">{video.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
