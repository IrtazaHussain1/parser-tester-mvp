# ShopFixture Self-Heal Test Pages

Static, JSON-driven Amazon-style product and search pages for ScrapeOps
self-heal parser testing. Every page renders through one shared component
tree per page type (`components/product/ProductPage.tsx`,
`components/search/SearchResultsPage.tsx`) — **content differs, DOM structure
stays the same** when a section is present.

The home index (`/`) groups fixtures under **Training Data** and **Testing Data**.

## Fixture layout

### Product pages

| Set | Slugs | URL | Content |
| --- | --- | --- | --- |
| Training | `1` … `5` | `/product/1` … `/product/5` | Full PDP: variants, A+, compare, Q&A, related, climate badge, customers say, FBT, videos, seller detail |
| Testing | `t1` … `t5` | `/product/t1` … `/product/t5` | Same core layout, less copy; optional sections omitted at random |

JSON files live in `data/products/<slug>.json`.

### Search pages

Named queries (not numeric slugs):

| Set | Slugs | URL examples |
| --- | --- | --- |
| Training | `mobile`, `laptop`, `headphones`, `earbuds`, `keyboard` | `/search/mobile` |
| Testing | `t-mobile`, `t-laptop`, `t-headphones`, `t-earbuds`, `t-keyboard` | `/search/t-mobile` |

JSON follows the parser **search schema** in `lib/types.ts` (`SearchPage`):

- Required: `searchMetadata.query`, `products[]` (with `name` + absolute `url`)
- Training also fills: `pagination`, `breadcrumbs`, `relatedSearches`, `sponsoredProducts`, `recommendations`, rich product fields (brand, ratings, shipping, badges, variants, etc.)
- Testing keeps a thin `searchMetadata` + ~4 `products` and minimal `pagination`

| Set | Content |
| --- | --- |
| Training | Full schema + UI extras (filters, sort, editorial banner, brand spotlight) |
| Testing | Schema core only; optional blocks omitted |

## Optional sections

Sections render **only when the field exists** in JSON. Training fixtures include them; testing fixtures leave them out so parsers see thinner pages without DOM drift on the shared blocks.

**Product** (`lib/types.ts` → `ProductPage`): `climatePledge`, `customersSay`, `frequentlyBoughtTogether`, `videos`, `sellerDetail`, plus existing optionals (`aplus`, `variantOptions`, `qa`, `relatedProducts`, compare fields, coupon/promo).

**Search** (`SearchPage`): schema fields `pagination`, `breadcrumbs`, `relatedSearches`, `sponsoredProducts`, `recommendations`, plus rich `products[]` properties. Training-only UI extras: `filters`, `sortOptions` / `selectedSort`, `editorialBanner`, `brandSpotlight`.

## Add a new product page

1. Create `data/products/<slug>.json` matching `ProductPage` in `lib/types.ts`.
2. For training-style pages, include the optional section fields; for testing-style pages, omit them and keep bullets/reviews short.
3. `npm run build` — picked up via `generateStaticParams`.
4. Live at `/product/<slug>`. Add the slug to the lists in `app/page.tsx` if it should appear on the index.

## Add a new search page

1. Create `data/search/<slug>.json` matching `SearchPage` in `lib/types.ts`.
2. Prefer named slugs (`headphones`) and `t-<name>` for the thin testing twin.
3. `npm run build`.
4. Live at `/search/<slug>`. Update `SEARCH_TRAINING` in `app/page.tsx` for the index.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
npm run build
```

Static HTML is emitted to `out/`. Deploy that folder to any static host (S3 + CloudFront, Netlify, nginx, etc.) on your testing domain.

## Why no DOM drift between pages

This project keeps identical selectors/DOM structure across pages when a
section is shown (aligned with `product_page_1.html` / `search_page_1.html`
in `scrapeops-go-parser`). It validates parser output quality across
realistic **content** variety, not structural robustness.

Historical drift-tier fixtures (`product_page_2.html`–`_5.html`,
`search_page_2.html`–`_5.html`) remain in that repo for DOM-drift /
self-heal testing.
