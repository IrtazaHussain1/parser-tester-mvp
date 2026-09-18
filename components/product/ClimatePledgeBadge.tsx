import type { ClimatePledge } from '@/lib/types'

/** Climate / sustainability badge shown in the buybox when present. */
export function ClimatePledgeBadge({ data }: { data: ClimatePledge }) {
  return (
    <div id="climatePledgeFriendly" className="amz-climate" data-csa-c-type="widget">
      <span className="amz-climate__icon" aria-hidden="true">
        ♻
      </span>
      <div>
        <div className="amz-climate__label">{data.label}</div>
        <div className="amz-climate__detail">{data.detail}</div>
      </div>
    </div>
  )
}
