import type { ComponentProps } from 'react'

import { ExperimentalIcon } from '@edgeandnode/gds'
import { NetworkIcon as GdsNetworkIcon } from '@edgeandnode/go'

/**
 * Supported Networks icon.
 *
 * Delegates to the shared `@edgeandnode/go` `NetworkIcon`, which resolves a
 * network's logo from the hard-coded icon set (keyed by CAIP-2 id) and, as a
 * fallback, from web3icons. Some networks in the registry are in neither set,
 * so that component renders an empty icon slot for them.
 *
 * This wrapper fills those gaps with a locally bundled brand mark. Anubis
 * (`eip155:6714` mainnet, `eip155:2526` testnet) is the first such network.
 * Add future local-only marks the same way: draw the badge and match on its
 * CAIP-2 id (or registry `id`) below.
 */

type Props = ComponentProps<typeof GdsNetworkIcon>

const ANUBIS_CAIP2_IDS = new Set(['eip155:6714', 'eip155:2526'])

function isAnubis(network: Props['network']): boolean {
  if (ANUBIS_CAIP2_IDS.has(network.caip2Id)) return true
  const id = (network as { id?: string }).id ?? ''
  return id === 'anubis' || id.startsWith('anubis-')
}

/**
 * Anubis brand mark on a brand-green badge. The mark artwork lives in
 * graph-gtm-kit (design/templates/anubis-chain); the dark "Logo Mark Light"
 * ink (#191818) is paired with the brand-green (#87DB00) surface, and the
 * paths below are that mark centered in a 40x40 badge.
 */
function AnubisIcon({ alt, size, className, style }: Omit<ComponentProps<typeof ExperimentalIcon>, 'children'>) {
  return (
    <ExperimentalIcon alt={alt} size={size} className={className} style={style}>
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#87DB00" />
        <g transform="translate(8 11.9355) scale(0.7108)" fill="#191818">
          <path d="M31.3702 9.0723L33.7649 11.3323L31.3702 13.6076C31.3702 13.6076 30.5879 12.9357 30.1729 12.6456C29.3906 12.0806 28.4966 11.8057 27.5068 11.7905C27.0438 11.7905 26.5808 11.8057 26.1019 11.7752C24.5694 11.714 23.3082 12.2638 22.2385 13.3022C21.552 13.9588 20.8975 14.6613 20.1472 15.2415C18.0398 16.8907 15.1344 16.7533 13.1547 14.9361C12.4364 14.2795 11.7658 13.5771 11.0315 12.9357C10.2013 12.1874 9.17955 11.821 8.04609 11.7752C7.45541 11.7599 6.86473 11.7599 6.27404 11.7752C4.67759 11.7904 3.40043 12.5386 2.41064 13.6381C1.62837 12.8746 0 11.3323 0 11.3323L2.3787 9.05699C2.3787 9.05699 2.47449 9.16395 2.53835 9.20977C3.8155 10.584 5.44388 11.0269 7.32769 10.9811C8.988 10.9506 10.3929 10.4772 11.5264 9.31664C12.0532 8.78212 12.596 8.27823 13.1387 7.77431C15.1982 5.83498 18.3592 5.80443 20.4665 7.69797C21.105 8.27823 21.7276 8.88908 22.3503 9.49986C23.1645 10.2939 24.1383 10.8131 25.3037 10.9047C26.9321 11.0422 28.5765 11.1338 30.0132 10.1413C30.4762 9.83577 31.3702 9.0723 31.3702 9.0723ZM12.9472 11.4545C12.9153 11.4086 12.9312 11.4698 12.9791 11.5003C13.6177 12.1111 14.2563 12.7372 14.9268 13.3327C15.741 14.081 17.1777 14.3711 18.1037 13.7603C19.1255 13.0884 19.9875 12.1874 20.8655 11.4545C20.1312 10.7062 19.5245 10.0496 18.886 9.43882C17.8004 8.41568 16.1561 8.32405 15.0225 9.30134C14.2723 9.92743 13.6655 10.691 12.9472 11.4545Z" />
          <path d="M25.3355 3.25429C21.6796 -0.120457 17.3692 -0.700732 12.6915 0.734683C10.3129 1.46766 8.65257 3.08632 6.96034 4.78133C6.96034 4.78133 5.5395 6.14039 4.8211 6.82756C5.92265 8.12554 8.06188 8.23243 9.24327 7.13296C9.24327 7.13296 10.3288 6.09458 10.8556 5.59066C13.7612 2.79618 18.3909 2.30753 21.7275 4.55228C22.8131 5.26998 23.7071 6.24729 24.6649 7.13296C25.8464 8.23243 27.9855 8.12554 29.0871 6.82756C27.8259 5.6212 26.5966 4.41484 25.3355 3.25429Z" />
          <path d="M18.2152 11.3629C17.0498 12.6304 16.7145 12.6304 15.5492 11.3782C16.6028 10.0802 17.0658 10.0802 18.2152 11.3629Z" />
          <path d="M4.78923 15.9286C5.90674 14.6001 8.06195 14.4933 9.25927 15.608C9.43491 15.7454 9.61045 15.9134 9.78609 16.0966C10.6322 16.9976 11.6061 17.868 12.6916 18.5093C15.4375 20.0975 20.0832 20.0517 22.9249 17.1808C23.5315 16.57 24.1382 15.9439 24.8086 15.3789C24.8885 15.3026 25.0003 15.2415 25.096 15.1957C26.1337 14.6613 27.9217 14.6918 29.0712 15.8371C28.2889 16.5853 26.6445 18.1581 26.5967 18.2193C25.2237 19.6088 23.8189 20.9373 21.8872 21.6551C17.1457 23.4112 12.3564 23.121 8.36526 19.3339C7.75861 18.7537 6.52935 17.6084 6.52935 17.6084C5.95463 17.0434 5.37991 16.4937 4.78923 15.9286Z" />
        </g>
      </svg>
    </ExperimentalIcon>
  )
}

export function NetworkIcon({ network, ...props }: Props) {
  if (isAnubis(network)) {
    return <AnubisIcon alt={network.shortName || network.fullName || 'Anubis'} {...props} />
  }
  return <GdsNetworkIcon network={network} {...props} />
}
NetworkIcon.isGdsIcon = true
