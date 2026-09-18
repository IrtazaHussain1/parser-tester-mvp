import type { Rating } from '@/lib/types'

function starGlyphs(stars: number): string {
  const filled = Math.round(stars)
  return '★★★★★'.slice(0, filled) + '☆☆☆☆☆'.slice(0, 5 - filled)
}

export function TitleBlock({
  title,
  brandName,
  brandUrl,
  rating,
}: {
  title: string
  brandName: string
  brandUrl?: string
  rating: Rating
}) {
  const [p5, p4, p3, p2, p1] = rating.histogram
  return (
    <>
      <span id="productTitle" className="a-size-large product-title-word-break amz-title">{title}</span>
      <div className="amz-brand-row">
        Brand: <a id="bylineInfo" className="a-link-normal" href={brandUrl ?? '#'}>Visit the {brandName} Store</a>
      </div>
      <div id="averageCustomerReviews" className="amz-rating-row">
        <span id="acrPopover" className="reviewCountTextLinkedHistogram noUnderline amz-stars" title={`${rating.stars} out of 5 stars`}>
          <span className="a-icon a-icon-star a-star-4-5"><span className="a-icon-alt">{rating.stars} out of 5 stars</span></span>
          {starGlyphs(rating.stars)}
        </span>
        <a href="#reviews" id="acrCustomerReviewText" className="a-size-base count-link">{rating.count.toLocaleString()} ratings</a>
      </div>
      <ul id="histogramTable" className="a-unordered-list" style={{ display: 'none' }}>
        <li><a href="#" aria-label={`${p5} percent of reviews have 5 stars`}>5 star</a></li>
        <li><a href="#" aria-label={`${p4} percent of reviews have 4 stars`}>4 star</a></li>
        <li><a href="#" aria-label={`${p3} percent of reviews have 3 stars`}>3 star</a></li>
        <li><a href="#" aria-label={`${p2} percent of reviews have 2 stars`}>2 star</a></li>
        <li><a href="#" aria-label={`${p1} percent of reviews have 1 stars`}>1 star</a></li>
      </ul>
    </>
  )
}
