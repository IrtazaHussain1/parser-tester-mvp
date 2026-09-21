export type Rating = {
  stars: number
  count: number
  histogram: [number, number, number, number, number] // [5★%,4★%,3★%,2★%,1★%]
}

export type VariantOption = {
  value: string
  isSelected: boolean
  price?: number
  /** Strike-through list price for this variant, when different from the base product. */
  listPrice?: number
  availability?: string
  /** Main gallery image shown when this variant is selected. */
  image?: string
  /** Optional full product title override for this variant. */
  title?: string
}

export type VariantDimension = {
  dimension: string
  options: VariantOption[]
}

export type Review = {
  author: string
  stars: number
  title: string
  date: string
  body: string
  verified: boolean
  helpfulVotes?: number
  images?: string[]
}

export type CompareRow = {
  label: string
  values: string[]
}

export type QAEntry = {
  question: string
  answer: string
  meta: string
}

export type RelatedProduct = {
  title: string
  image: string
  stars: number
  price: number
}

/** Optional climate / sustainability callout in the buybox. */
export type ClimatePledge = {
  label: string
  detail: string
}

/** Highlight strip summarizing top review themes. */
export type CustomersSay = {
  heading: string
  summary: string
  themes: { label: string; sentiment: 'positive' | 'mixed' | 'negative' }[]
}

/** Bundle row shown on training PDPs. */
export type FrequentlyBoughtItem = {
  title: string
  image: string
  price: number
  checked?: boolean
}

export type FrequentlyBoughtTogether = {
  heading: string
  items: FrequentlyBoughtItem[]
  totalPrice: number
}

export type ProductVideo = {
  title: string
  thumbnail: string
  duration: string
}

/** Extended seller block below the buybox merchant line. */
export type SellerDetail = {
  name: string
  ratingPercent: number
  ratingsCount: number
  shipsFrom: string
  soldBy: string
}

export type ProductPage = {
  slug: string
  title: string
  brand: { name: string; url?: string }
  breadcrumbs: string[]
  images: { main: string; thumbnails: string[] }
  rating: Rating
  price: { current: number; list?: number; currency: string }
  availability: string
  bullets: string[]
  description: string[]
  aplus?: { heading: string; paragraphs: string[] }
  variantOptions?: VariantDimension[]
  specs: { label: string; value: string }[]
  compareTitle?: string
  compareColumns?: string[]
  compareRows?: CompareRow[]
  reviews: Review[]
  qa?: QAEntry[]
  relatedProducts?: RelatedProduct[]
  merchant: { soldBy: string; fulfilledBy: string }
  delivery: { estimate: string; freeShippingNote?: string }
  coupon?: string
  promo?: string
  /** Training-only optional sections (omit on thinner testing fixtures). */
  climatePledge?: ClimatePledge
  customersSay?: CustomersSay
  frequentlyBoughtTogether?: FrequentlyBoughtTogether
  videos?: ProductVideo[]
  sellerDetail?: SellerDetail
}

/** Absolute fixture origin used in search URLs. */
export const SEARCH_FIXTURE_ORIGIN = 'https://www.shopfixture.test'

export type SearchMetadata = {
  query: string
  totalResults?: number
  resultsDisplayed?: number
  searchUrl?: string
  searchType?: 'keyword' | 'category' | 'brand' | 'filtered'
}

export type SearchPagination = {
  currentPage: number
  totalPages?: number
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  nextPageUrl?: string
  previousPageUrl?: string
}

export type SearchBreadcrumb = {
  name: string
  url: string
}

export type RelatedSearch = {
  searchTerm: string
  url: string
}

export type SearchProductImage = {
  url: string
  altText?: string
}

export type SearchAggregateRating = {
  ratingValue: number
  reviewCount?: number
  bestPossibleRating?: number
  worstPossibleRating?: number
}

export type SearchProductShipping = {
  freeShipping?: boolean
  shippingCost?: number
  estimatedDelivery?: string
  prime?: boolean
}

export type SearchProductBadge = {
  type: 'bestseller' | 'choice' | 'deal' | 'new' | 'sponsored' | 'limited_time'
  label: string
  imageUrl?: string
}

export type SearchProductPromotion = {
  type?: string
  description: string
  discountPercentage?: number
  endDate?: string
}

export type SearchProductVariantOption = {
  type: string
  value: string
  imageUrl?: string
}

export type SearchProduct = {
  name: string
  productId?: string
  url: string
  brand?: string
  price?: number
  currency?: string
  preDiscountPrice?: number
  priceRange?: { minPrice: number; maxPrice: number; currency?: string }
  availability?: 'in_stock' | 'out_of_stock' | 'pre_order' | 'discontinued'
  availabilityMessage?: string
  images?: SearchProductImage[]
  additionalImages?: SearchProductImage[]
  aggregateRating?: SearchAggregateRating
  shipping?: SearchProductShipping
  badges?: SearchProductBadge[]
  promotions?: SearchProductPromotion[]
  variants?: {
    variantCount?: number
    visibleOptions?: SearchProductVariantOption[]
  }
  seller?: { name: string; rating?: number; url?: string }
  isSponsored?: boolean
  category?: string
  description?: string
  keyFeatures?: string[]
}

export type SponsoredProduct = {
  name: string
  url: string
  price?: number
  currency?: string
  image?: SearchProductImage
  sponsorInfo?: { advertiser?: string; campaignType?: string }
}

export type SearchRecommendationProduct = {
  name: string
  url: string
  price?: number
  currency?: string
  imageUrl?: string
}

/** UI-only filter chrome (not part of the parser search schema). */
export type SearchFilterGroup = {
  title: string
  options: { label: string; count?: number; checked?: boolean }[]
}

/**
 * Search page fixture.
 * `slug` is for routing only; remaining fields follow the parser search schema.
 */
export type SearchPage = {
  slug: string
  searchMetadata: SearchMetadata
  products: SearchProduct[]
  pagination?: SearchPagination
  breadcrumbs?: SearchBreadcrumb[]
  relatedSearches?: RelatedSearch[]
  sponsoredProducts?: SponsoredProduct[]
  recommendations?: { relatedProducts?: SearchRecommendationProduct[] }
  /** Training-only UI extras (optional; omit on testing pages). */
  filters?: SearchFilterGroup[]
  sortOptions?: string[]
  selectedSort?: string
  editorialBanner?: { title: string; body: string; cta: string }
  brandSpotlight?: { brand: string; tagline: string; cta: string }
}

