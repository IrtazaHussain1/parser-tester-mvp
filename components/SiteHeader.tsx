export function SiteHeader() {
  return (
    <header className="amz-header">
      <div className="amz-header__row">
        <a className="amz-logo" href="#">Shop<span>Fixture</span></a>
        <div className="amz-deliver">
          <span>📍</span>
          <div className="amz-deliver__text">
            <span className="amz-deliver__line1">Deliver to Alex</span>
            <span className="amz-deliver__line2">New York 10001</span>
          </div>
        </div>
        <div className="amz-search">
          <select className="amz-search__dept"><option>All</option></select>
          <input type="text" className="amz-search__input" readOnly />
          <button className="amz-search__btn">🔍</button>
        </div>
        <div className="amz-lang">🇺🇸 EN</div>
        <div className="amz-account">
          <span className="amz-account__line1">Hello, Alex</span>
          <span className="amz-account__line2">Account &amp; Lists</span>
        </div>
        <div className="amz-orders">
          <span className="amz-orders__line1">Returns</span>
          <span className="amz-orders__line2">&amp; Orders</span>
        </div>
        <div className="amz-cart">🛒 <span className="amz-cart__count">2</span> <span className="amz-cart__label">Cart</span></div>
      </div>
      <nav className="amz-subnav">
        <a href="#">☰ All</a>
        <a href="#">Electronics</a>
        <a href="#">Computers</a>
        <a href="#">Today&apos;s Deals</a>
        <a href="#">Customer Service</a>
        <a href="#">New Releases</a>
        <a href="#">Sell</a>
      </nav>
    </header>
  )
}
