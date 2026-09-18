import { getAllSearchSlugs, getSearchData } from '@/lib/data'
import { SearchResultsPage } from '@/components/search/SearchResultsPage'

export function generateStaticParams() {
  return getAllSearchSlugs().map((slug) => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = getSearchData(slug)
  return <SearchResultsPage data={data} />
}
