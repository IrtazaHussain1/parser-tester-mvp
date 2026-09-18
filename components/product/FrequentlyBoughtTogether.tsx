import type { FrequentlyBoughtTogether } from '@/lib/types'

/** Frequently bought together bundle row. */
export function FrequentlyBoughtTogether({ data }: { data: FrequentlyBoughtTogether }) {
  return (
    <div id="frequentlyBoughtTogether" className="amz-section amz-fbt">
      <h2>{data.heading}</h2>
      <div className="amz-fbt__row">
        {data.items.map((item, index) => (
          <div className="amz-fbt__item" key={item.title}>
            {index > 0 && <span className="amz-fbt__plus">+</span>}
            <label className="amz-fbt__card">
              <input type="checkbox" defaultChecked={item.checked !== false} readOnly />
              <img src={item.image} alt={item.title} />
              <span className="amz-fbt__title">{item.title}</span>
              <span className="amz-fbt__price">${item.price.toFixed(2)}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="amz-fbt__total">
        Total price: <strong>${data.totalPrice.toFixed(2)}</strong>
        <button type="button" className="btn btn-cart amz-fbt__add" disabled>
          Add all to Cart
        </button>
      </div>
    </div>
  )
}
