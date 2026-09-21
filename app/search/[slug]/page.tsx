import { notFound } from 'next/navigation'
import { getAllSearchSlugs, getSearchData, hasSearchData } from '@/lib/data'
import { SearchResultsPage } from '@/components/search/SearchResultsPage'

export function generateStaticParams() {
  return getAllSearchSlugs().map((slug) => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!hasSearchData(slug)) notFound()
  const data = getSearchData(slug)
  return <SearchResultsPage data={data} />
}
