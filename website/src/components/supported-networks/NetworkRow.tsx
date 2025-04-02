import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { memo } from 'react'

import { ExperimentalCopyButton, Skeleton, Text } from '@edgeandnode/gds'
import { Check } from '@edgeandnode/gds/icons'
import { NetworkIcon } from '@edgeandnode/go'

import { getIconVariant, shouldShowSkeleton } from '@/utils/networkUtils'

const MotionTR = motion.tr

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
    <NextLink href={`/${locale}/supported-networks/${network.id}`} legacyBehavior passHref>
      <MotionTR
        className="group h-16 cursor-pointer transition-colors hover:bg-space-1600"
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
        <td className="w-48">
          <div className="flex items-center gap-2">
            {shouldShowSkeleton(network.id) ? (
              <Skeleton borderRadius="FULL" height="20px" width="20px" />
            ) : (
              <NetworkIcon variant={getIconVariant(network.id)} caip2Id={network.caip2Id as any} size={5} />
            )}
            <Text.P14>{network.shortName}</Text.P14>
          </div>
        </td>
        <td className="w-48">
          <div className="flex w-full items-center justify-between gap-2">
            <Text.P14 className="!mb-0">{network.id}</Text.P14>
            <div className="opacity-0 transition-opacity group-hover:opacity-100">
              <div
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <ExperimentalCopyButton size="small" variant="tertiary" value={network.id} />
              </div>
            </div>
          </div>
        </td>
        <td align="center">{network.subgraphs ? <Check size={4} alt="Checkmark" /> : null}</td>
        <td align="center">{network.substreams ? <Check size={4} alt="Checkmark" /> : null}</td>
        <td align="center">{network.firehose ? <Check size={4} alt="Checkmark" /> : null}</td>
        <td align="center">{network.tokenapi ? <Check size={4} alt="Checkmark" /> : null}</td>
      </MotionTR>
    </NextLink>
  )
})
