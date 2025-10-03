'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { SupplementGuidance } from '@/types'
import { Pill, TrendingUp, TrendingDown, Eye } from 'lucide-react'

interface SupplementGuidanceProps {
  guidance: SupplementGuidance[]
}

export function SupplementGuidanceComponent({ guidance }: SupplementGuidanceProps) {
  if (guidance.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-6 w-6 text-purple-500" />
          Supplement Guidance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {guidance.map((item, index) => (
            <div key={index} className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-800">
                {item.drug}
              </h4>
              
              {/* Helpful Supplements */}
              {item.helpful.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-medium text-green-800 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Helpful Additions
                  </h5>
                  <div className="grid gap-3">
                    {item.helpful.map((supplement, suppIndex) => (
                      <div
                        key={suppIndex}
                        className="border border-green-200 bg-green-50 rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Pill className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-900">{supplement.name}</span>
                          </div>
                          <EvidenceBadge level={supplement.evidence} />
                        </div>
                        
                        <p className="text-green-800 text-sm">
                          {supplement.reason}
                        </p>
                        
                        <div className="bg-green-100 p-3 rounded-md">
                          <p className="text-sm font-medium text-green-900 mb-1">
                            Recommendation:
                          </p>
                          <p className="text-sm text-green-800">
                            {supplement.recommendation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Avoid Supplements */}
              {item.avoid.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-medium text-red-800 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    Use with Caution/Avoid
                  </h5>
                  <div className="grid gap-3">
                    {item.avoid.map((supplement, suppIndex) => (
                      <div
                        key={suppIndex}
                        className="border border-red-200 bg-red-50 rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Pill className="h-4 w-4 text-red-600" />
                            <span className="font-medium text-red-900">{supplement.name}</span>
                          </div>
                          <EvidenceBadge level={supplement.evidence} />
                        </div>
                        
                        <p className="text-red-800 text-sm">
                          {supplement.reason}
                        </p>
                        
                        <div className="bg-red-100 p-3 rounded-md">
                          <p className="text-sm font-medium text-red-900 mb-1">
                            Recommendation:
                          </p>
                          <p className="text-sm text-red-800">
                            {supplement.recommendation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Monitoring Tips */}
              {item.monitoring.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-medium text-blue-800 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Monitoring Tips
                  </h5>
                  <div className="grid gap-3">
                    {item.monitoring.map((tip, tipIndex) => (
                      <div
                        key={tipIndex}
                        className="border border-blue-200 bg-blue-50 rounded-lg p-4"
                      >
                        <div className="space-y-2">
                          <p className="font-medium text-blue-900">{tip.what}</p>
                          <p className="text-blue-800 text-sm">{tip.how}</p>
                          <p className="text-blue-700 text-sm font-medium">
                            Frequency: {tip.frequency}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
