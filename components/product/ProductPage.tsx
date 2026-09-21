'use client'

import { useState } from 'react'
import type { ProductPage as ProductPageData } from '@/lib/types'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Breadcrumbs } from './Breadcrumbs'
import { Gallery } from './Gallery'
import { TitleBlock } from './TitleBlock'
import { Bullets } from './Bullets'
import { Description } from './Description'
import { SpecsTable } from './SpecsTable'
import { CompareTable } from './CompareTable'
import { Reviews } from './Reviews'
import { QA } from './QA'
import { RelatedProducts } from './RelatedProducts'
import { ClimatePledgeBadge } from './ClimatePledgeBadge'
import { CustomersSay } from './CustomersSay'
import { FrequentlyBoughtTogether } from './FrequentlyBoughtTogether'
import { ProductVideos } from './ProductVideos'
import { SellerDetail } from './SellerDetail'

/**
 * Builds a display title that reflects the active variant value when possible.
 */
function titleForVariant(baseTitle: string, selectedValue?: string, variantTitle?: string): string {
  if (variantTitle) return variantTitle
  if (!selectedValue) return baseTitle
  // Replace a known color/style token already present in the title, otherwise append.
  const tokens = ['Obsidian', 'Porcelain', 'Bay', 'Black', 'Silver', 'Midnight Blue', 'USB-C Case', 'MagSafe Case']
  for (const token of tokens) {
    if (baseTitle.includes(token) && token !== selectedValue) {
      return baseTitle.replace(token, selectedValue)
    }
  }
  if (baseTitle.includes(selectedValue)) return baseTitle
  return `${baseTitle} — ${selectedValue}`
}

/**
 * Interactive product detail page.
 * Selecting a variant updates price, availability, gallery image, and title when those fields exist on the option.
 */
export function ProductPage({ data }: { data: ProductPageData }) {
  const dimension = data.variantOptions?.[0]
  const initialOption = dimension?.options.find((o) => o.isSelected) ?? dimension?.options[0]
  const [selectedValue, setSelectedValue] = useState<string | undefined>(initialOption?.value)
  const selectedOption = dimension?.options.find((o) => o.value === selectedValue)

  const displayPrice = selectedOption?.price ?? data.price.current
  const displayListPrice = selectedOption?.listPrice ?? data.price.list
  const displayAvailability = selectedOption?.availability ?? data.availability
  const displayMainImage = selectedOption?.image ?? data.images.main
  const displayTitle = titleForVariant(data.title, selectedOption?.value, selectedOption?.title)
  const wholePart = Math.floor(displayPrice)
  const fractionPart = displayPrice.toFixed(2).split('.')[1]

  return (
    <>
      <SiteHeader />
      <div className="amz-page">
        <Breadcrumbs items={data.breadcrumbs} />
        <div className="amz-pdp">
          <Gallery main={displayMainImage} thumbnails={data.images.thumbnails} title={displayTitle} />

          <div className="col-center">
            <TitleBlock
              title={displayTitle}
              brandName={data.brand.name}
              brandUrl={data.brand.url}
              rating={data.rating}
            />

            <hr className="amz-divider" />
            <div className="amz-price-inline" data-variant-price={displayPrice}>
              <span className="symbol">$</span>
              {displayPrice.toFixed(2)}
            </div>

            {dimension && (
              <div className="amz-variant-row">
                <span className="a-size-base a-color-secondary amz-variant-row__label">
                  {dimension.dimension}: <span data-field="selected-variant">{selectedOption?.value}</span>
                </span>
                <div id="inline-twister-row-style_name" className="amz-variant-options">
                  <ul
                    className="a-unordered-list a-button-list a-horizontal a-spacing-top-extra-large inline-twister-swatch-list"
                    style={{ listStyle: 'none', display: 'flex', gap: 8, padding: 0, margin: 0 }}
                  >
                    {dimension.options.map((opt) => {
                      const isSelected = opt.value === selectedValue
                      return (
                        <li
                          key={opt.value}
                          data-asin={opt.value}
                          data-initiallyselected={opt.value === initialOption?.value ? 'true' : undefined}
                          className={`a-button${isSelected ? ' a-button-selected is-selected' : ''}`}
                        >
                          <button
                            type="button"
                            className={isSelected ? 'is-selected' : undefined}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedValue(opt.value)}
                          >
                            {opt.image && (
                              <img
                                className="amz-variant-swatch-img"
                                src={opt.image}
                                alt={opt.value}
                                width={36}
                                height={36}
                              />
                            )}
                            <span className="swatch-title-text">{opt.value}</span>
                            {opt.price != null && (
                              <span className="a-price" data-a-color="base">
                                <span aria-hidden="true"> (${opt.price.toFixed(2)})</span>
                                <span className="a-offscreen">${opt.price.toFixed(2)}</span>
                              </span>
                            )}
                            {opt.availability && (
                              <span className="a-size-mini twister-availability"> {opt.availability}</span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )}

            <hr className="amz-divider" />
            <Bullets items={data.bullets} />
            <Description paragraphs={data.description} aplus={data.aplus} />
          </div>

          <div className="col-buybox amz-buybox" id="buybox">
            <div id="corePriceDisplay_desktop_feature_div">
              <span
                className="a-price aok-align-center reinventPricePriceToPayMargin priceToPay price-current"
                data-a-size="xl"
                data-a-color="base"
              >
                <span className="a-offscreen">${displayPrice.toFixed(2)}</span>
                <span aria-hidden="true">
                  <span className="a-price-symbol symbol">$</span>
                  <span className="a-price-whole">{wholePart}</span>
                  <span className="a-price-decimal">.</span>
                  <span className="a-price-fraction">{fractionPart}</span>
                </span>
              </span>
              {displayListPrice != null && (
                <span className="a-price a-text-price price-strike" data-a-strike="true">
                  <span className="a-offscreen">${displayListPrice.toFixed(2)}</span>
                  <span aria-hidden="true">List: ${displayListPrice.toFixed(2)}</span>
                </span>
              )}
            </div>

            {data.coupon && (
              <div id="couponsInBuybox_feature_div" className="promoPriceBlockMessage amz-coupon">
                ☑ {data.coupon}
              </div>
            )}
            {data.promo && (
              <div data-csa-c-owner="PromotionsDiscovery" data-csa-c-item-id="promo-1" className="amz-promo">
                <label>Promotion</label>
                <div id="promoMessage1">{data.promo}</div>
              </div>
            )}

            <div id="availability" className="amz-availability">
              <span className="a-size-medium a-color-success">{displayAvailability}</span>
            </div>

            <div id="deliveryBlockMessage" className="amz-delivery">
              <span data-csa-c-delivery-time={data.delivery.estimate}>
                Delivery <b>{data.delivery.estimate}</b>
              </span>
            </div>
            {data.delivery.freeShippingNote && (
              <div id="mir-layout-DELIVERY_BLOCK-slot-PRIMARY_DELIVERY_MESSAGE_LARGE" className="amz-delivery">
                <span data-csa-c-delivery-condition="Free Shipping">{data.delivery.freeShippingNote}</span>
              </div>
            )}

            <div className="a-box-inner" style={{ marginTop: 12 }}>
              <input
                type="submit"
                id="add-to-cart-button"
                name="submit.add-to-cart"
                className="a-button-input btn btn-cart"
                value="Add to Cart"
                readOnly
              />
              <input
                type="submit"
                id="buy-now-button"
                name="submit.buy-now"
                className="a-button-input btn btn-buy"
                value="Buy Now"
                readOnly
              />
            </div>

            <div className="amz-secure">🔒 Secure transaction</div>

            {data.climatePledge && <ClimatePledgeBadge data={data.climatePledge} />}

            <div id="merchant-info" className="amz-merchant">
              Sold by <a href="#">{data.merchant.soldBy}</a> and {data.merchant.fulfilledBy}.
            </div>
          </div>
        </div>

        {data.customersSay && <CustomersSay data={data.customersSay} />}

        {data.frequentlyBoughtTogether && (
          <FrequentlyBoughtTogether data={data.frequentlyBoughtTogether} />
        )}

        {data.videos && data.videos.length > 0 && <ProductVideos videos={data.videos} />}

        <SpecsTable
          specs={data.specs}
          manufacturer={data.brand.name}
          weight={data.specs.find((s) => s.label === 'Item Weight')?.value ?? ''}
          ratingStars={data.rating.stars}
        />

        {data.compareTitle && data.compareColumns && data.compareRows && (
          <CompareTable title={data.compareTitle} columns={data.compareColumns} rows={data.compareRows} />
        )}

        <Reviews rating={data.rating} reviews={data.reviews} />
        {data.qa && <QA items={data.qa} />}
        {data.relatedProducts && <RelatedProducts items={data.relatedProducts} />}
        {data.sellerDetail && <SellerDetail data={data.sellerDetail} />}
      </div>
      <SiteFooter />
    </>
  )
}
