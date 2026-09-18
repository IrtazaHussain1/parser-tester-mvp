/** Sort dropdown bar above search results. */
export function SortBar({ options, selected }: { options: string[]; selected: string }) {
  return (
    <div className="amz-sort-bar" id="s-result-sort-select-container">
      <label htmlFor="s-result-sort-select">
        Sort by:{' '}
        <select id="s-result-sort-select" defaultValue={selected} disabled>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
