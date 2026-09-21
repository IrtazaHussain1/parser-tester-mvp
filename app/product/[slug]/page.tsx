import { notFound } from 'next/navigation'
import { getAllProductSlugs, getProductData, hasProductData } from '@/lib/data'
import { ProductPage } from '@/components/product/ProductPage'

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!hasProductData(slug)) notFound()
  const data = getProductData(slug)
  return <ProductPage data={data} />
}
