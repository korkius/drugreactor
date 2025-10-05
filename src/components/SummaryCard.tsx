'use client'

import { SearchResult } from '@/types'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

interface SummaryCardProps {
  result: SearchResult
}

export function SummaryCard({ result }: SummaryCardProps) {
  const { summary, interactions } = result
  
  const totalInteractions = interactions.length

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <AlertTriangle className="h-6 w-6 text-red-500" />
      case 'medium':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      case 'low':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge variant="serious">High Risk</Badge>
      case 'medium':
        return <Badge variant="moderate">Medium Risk</Badge>
      case 'low':
        return <Badge variant="safe">Low Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border-2 shadow-sm"
           style={{
             borderColor: summary.riskLevel === 'high' ? '#ef4444' : 
                         summary.riskLevel === 'medium' ? '#f59e0b' : '#10b981',
             backgroundColor: summary.riskLevel === 'high' ? '#fef2f2' : 
                             summary.riskLevel === 'medium' ? '#fffbeb' : '#f0fdf4'
           }}
      >
        {getRiskIcon(summary.riskLevel)}
        <div className="text-center">
          <div className="font-bold text-lg" style={{
            color: summary.riskLevel === 'high' ? '#dc2626' : 
                   summary.riskLevel === 'medium' ? '#d97706' : '#059669'
          }}>
            Overall Risk Level: {summary.riskLevel.charAt(0).toUpperCase() + summary.riskLevel.slice(1)}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {totalInteractions} interaction{totalInteractions !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>
    </div>
  )
}
