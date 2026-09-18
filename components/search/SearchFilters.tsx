import type { SearchFilterGroup } from '@/lib/types'

/** Left-rail filter groups for search results. */
export function SearchFilters({ groups }: { groups: SearchFilterGroup[] }) {
  return (
    <aside className="amz-filters" id="s-refinements">
      {groups.map((group) => (
        <div className="amz-filters__group" key={group.title}>
          <h3>{group.title}</h3>
          {group.options.map((opt) => (
            <label key={opt.label}>
              <input type="checkbox" defaultChecked={!!opt.checked} readOnly /> {opt.label}
              {opt.count != null && <span className="amz-filters__count">({opt.count.toLocaleString()})</span>}
            </label>
          ))}
        </div>
      ))}
    </aside>
  )
}
