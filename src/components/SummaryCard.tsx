'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SearchResult } from '@/types'
import { FileText, AlertTriangle, CheckCircle, Info, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

interface SummaryCardProps {
  result: SearchResult
}

export function SummaryCard({ result }: SummaryCardProps) {
  const { summary, interactions } = result
  const [isExpanded, setIsExpanded] = useState(false)
  
  const seriousInteractions = interactions.filter(i => i.severity === 'serious').length
  const moderateInteractions = interactions.filter(i => i.severity === 'moderate').length
  const minorInteractions = interactions.filter(i => i.severity === 'minor').length
  const safeInteractions = interactions.filter(i => i.severity === 'none').length
  
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
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
           style={{
             borderColor: summary.riskLevel === 'high' ? '#ef4444' : 
                         summary.riskLevel === 'medium' ? '#f59e0b' : '#10b981',
             backgroundColor: summary.riskLevel === 'high' ? '#fef2f2' : 
                             summary.riskLevel === 'medium' ? '#fffbeb' : '#f0fdf4'
           }}
           onClick={() => setIsExpanded(!isExpanded)}
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
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="mt-4 w-full">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="space-y-6 pt-6">
              {/* Interaction Counts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {seriousInteractions > 0 && (
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-3xl font-bold text-red-600">{seriousInteractions}</div>
                    <div className="text-sm text-red-800 font-medium">Serious</div>
                  </div>
                )}
                {moderateInteractions > 0 && (
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl font-bold text-yellow-600">{moderateInteractions}</div>
                    <div className="text-sm text-yellow-800 font-medium">Moderate</div>
                  </div>
                )}
                {minorInteractions > 0 && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600">{minorInteractions}</div>
                    <div className="text-sm text-blue-800 font-medium">Minor</div>
                  </div>
                )}
                {safeInteractions > 0 && (
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600">{safeInteractions}</div>
                    <div className="text-sm text-green-800 font-medium">Safe</div>
                  </div>
                )}
              </div>

              {/* Key Points */}
              {summary.keyPoints.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-lg">Key Points:</h4>
                  <ul className="space-y-2">
                    {summary.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {summary.recommendations.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                  <h4 className="font-semibold text-gray-900 text-lg">What to do next:</h4>
                  <ul className="space-y-2">
                    {summary.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      This information is for educational purposes only and should not replace professional medical advice.
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Always consult with your healthcare provider before making any changes to your medications or supplements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
