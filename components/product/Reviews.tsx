import type { Rating, Review } from '@/lib/types'

function starGlyphs(stars: number): string {
  const filled = Math.round(stars)
  return '★★★★★'.slice(0, filled) + '☆☆☆☆☆'.slice(0, 5 - filled)
}

export function Reviews({ rating, reviews }: { rating: Rating; reviews: Review[] }) {
  const labels = ['5 star', '4 star', '3 star', '2 star', '1 star']
  return (
    <div className="amz-section" id="reviews">
      <h2>Customer reviews</h2>
      <div className="amz-reviews-summary">
        <div className="amz-reviews-summary__score">
          <div className="big">{rating.stars} out of 5</div>
          <div className="amz-stars">{starGlyphs(rating.stars)}</div>
          <div>{rating.count.toLocaleString()} global ratings</div>
        </div>
        <div className="amz-histogram">
          {rating.histogram.map((pct, i) => (
            <div className="amz-histogram__row" key={labels[i]}>
              <a href="#">{labels[i]}</a>
              <div className="amz-histogram__bar"><div className="amz-histogram__bar-fill" style={{ width: `${pct}%` }} /></div>
              <span className="amz-histogram__pct">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div id="customer-reviews-content">
        {reviews.map((r) => (
          <div className="review amz-review" data-hook="review" key={r.title}>
            <div className="amz-review__profile">
              <span className="amz-review__avatar">{r.author.charAt(0).toUpperCase()}</span>
              <a className="a-profile" href="#"><span className="a-profile-name">{r.author}</span></a>
            </div>
            <i className="review-rating amz-review__stars">
              <span className="a-icon-alt">{r.stars.toFixed(1)} out of 5 stars</span>{starGlyphs(r.stars)}
            </i>
            <a className="review-title amz-review__title" href="#">{r.stars.toFixed(1)} out of 5 stars {r.title}</a>
            <div className="review-date amz-review__meta">
              Reviewed in the United States on {r.date}{r.verified && <> · <span className="amz-verified">Verified Purchase</span></>}
            </div>
            <div data-hook="review-body" className="amz-review__body"><span>{r.body}</span></div>
            {r.images && r.images.length > 0 && (
              <div className="amz-review__images">
                {r.images.map((src) => <img src={src} key={src} alt="" />)}
              </div>
            )}
            {r.helpfulVotes != null && (
              <div className="cr-vote-text amz-helpful">👍 {r.helpfulVotes} people found this helpful</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
