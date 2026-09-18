import type { SellerDetail } from '@/lib/types'

/** Extended seller information block. */
export function SellerDetail({ data }: { data: SellerDetail }) {
  return (
    <div id="seller-info" className="amz-section amz-seller-detail">
      <h2>Seller information</h2>
      <div className="amz-seller-detail__card">
        <div className="amz-seller-detail__name">
          Sold by <a href="#">{data.name}</a>
        </div>
        <div className="amz-seller-detail__rating">
          <strong>{data.ratingPercent}%</strong> positive ratings ({data.ratingsCount.toLocaleString()} ratings)
        </div>
        <dl className="amz-seller-detail__meta">
          <div>
            <dt>Ships from</dt>
            <dd>{data.shipsFrom}</dd>
          </div>
          <div>
            <dt>Sold by</dt>
            <dd>{data.soldBy}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
