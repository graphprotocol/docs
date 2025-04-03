import { motion } from 'framer-motion'
import { memo } from 'react'

import { ButtonOrLink, ExperimentalCopyButton, Skeleton } from '@edgeandnode/gds'
import { Check } from '@edgeandnode/gds/icons'
import { NetworkIcon } from '@edgeandnode/go'

import { getIconVariant, shouldShowSkeleton } from '@/supportedNetworks/utils'

interface NetworkRowProps {
  network: {
    id: string
    shortName: string
    caip2Id: string
    subgraphs: boolean
    substreams: boolean
    firehose: boolean
    tokenapi: boolean
  }
  locale: string
}

export const NetworkRow = memo(({ network, locale }: NetworkRowProps) => {
  return (
    <motion.tr
      className="group/table-row isolate -outline-offset-1 transition hocus-visible-within:bg-space-1600 has-[a:focus-visible]:outline-focus"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: -16,
        transition: {
          duration: 0.1,
          ease: 'easeIn',
        },
      }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
      layoutId={network.id}
    >
      <td>
        <ButtonOrLink href={`/${locale}/supported-networks/${network.id}`} className="static outline-none">
          <span className="flex items-center gap-2">
            {shouldShowSkeleton(network.id) ? (
              <Skeleton borderRadius="FULL" height="20px" width="20px" />
            ) : (
              <NetworkIcon variant={getIconVariant(network.id)} caip2Id={network.caip2Id as any} size={5} />
            )}
            <span className="text-body-xsmall">{network.shortName}</span>
          </span>
          <span className="absolute inset-y-0 start-0 z-10 w-[1999px]" />
        </ButtonOrLink>
      </td>
      <td>
        <div className="flex items-center justify-between gap-2">
          <span className="text-body-xsmall">{network.id}</span>
          <div className="z-20 shrink-0 opacity-0 transition group-focus-within/table-row:opacity-100 group-hover/table-row:opacity-100">
            <ExperimentalCopyButton size="small" variant="tertiary" value={network.id} />
          </div>
        </div>
      </td>
      <td align="center">{network.subgraphs ? <Check size={4} alt="Checkmark" /> : null}</td>
      <td align="center">{network.substreams ? <Check size={4} alt="Checkmark" /> : null}</td>
      <td align="center">{network.firehose ? <Check size={4} alt="Checkmark" /> : null}</td>
      <td align="center">{network.tokenapi ? <Check size={4} alt="Checkmark" /> : null}</td>
    </motion.tr>
  )
})
