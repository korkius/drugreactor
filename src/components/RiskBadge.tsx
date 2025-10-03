'use client'

import { XCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { RiskBadgeProps } from '@/types'

const riskConfig = {
  serious: {
    icon: XCircle,
    variant: 'serious' as const,
    label: 'Serious',
    description: 'High risk - consult healthcare provider immediately'
  },
  moderate: {
    icon: AlertTriangle,
    variant: 'moderate' as const,
    label: 'Caution',
    description: 'Moderate risk - monitor closely'
  },
  minor: {
    icon: Info,
    variant: 'minor' as const,
    label: 'Minor',
    description: 'Low risk - be aware'
  },
  none: {
    icon: CheckCircle,
    variant: 'safe' as const,
    label: 'Safe',
    description: 'No known issues'
  }
}

export function RiskBadge({ severity, size = 'md' }: RiskBadgeProps) {
  const config = riskConfig[severity]
  const Icon = config.icon
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  return (
    <Badge
      variant={config.variant}
      className={`${sizeClasses[size]} flex items-center gap-1.5`}
      title={config.description}
    >
      <Icon className="h-3 w-3" />
      <span>{config.label}</span>
    </Badge>
  )
}
