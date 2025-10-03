'use client'

import { Badge } from '@/components/ui/badge'
import { EvidenceBadgeProps } from '@/types'

const evidenceConfig = {
  strong: {
    variant: 'evidence' as const,
    label: 'Strong Evidence',
    description: 'Well-established scientific evidence'
  },
  moderate: {
    variant: 'evidence' as const,
    label: 'Moderate Evidence',
    description: 'Some scientific evidence available'
  },
  limited: {
    variant: 'evidence' as const,
    label: 'Limited Evidence',
    description: 'Limited or preliminary evidence'
  }
}

export function EvidenceBadge({ level }: EvidenceBadgeProps) {
  const config = evidenceConfig[level]

  return (
    <Badge
      variant={config.variant}
      className="text-xs px-2 py-1"
      title={config.description}
    >
      {config.label}
    </Badge>
  )
}
