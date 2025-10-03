'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SearchResult } from '@/types'
import { FileText, AlertTriangle, CheckCircle, Info, ArrowRight } from 'lucide-react'

interface SummaryCardProps {
  result: SearchResult
}

export function SummaryCard({ result }: SummaryCardProps) {
  const { summary, interactions } = result
  
  const seriousInteractions = interactions.filter(i => i.severity === 'serious').length
  const moderateInteractions = interactions.filter(i => i.severity === 'moderate').length
  const minorInteractions = interactions.filter(i => i.severity === 'minor').length
  const safeInteractions = interactions.filter(i => i.severity === 'none').length

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
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">Interaction Summary</span>
          </div>
          {getRiskBadge(summary.riskLevel)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Risk Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              {getRiskIcon(summary.riskLevel)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Overall Risk Assessment</h3>
              <p className="text-lg text-gray-600">
                {summary.riskLevel.charAt(0).toUpperCase() + summary.riskLevel.slice(1)} Risk Level
              </p>
            </div>
          </div>
        </div>

        {/* Interaction Counts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {seriousInteractions > 0 && (
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-red-600 mb-2">{seriousInteractions}</div>
              <div className="text-sm text-red-800 font-semibold uppercase tracking-wide">Serious</div>
              <div className="text-xs text-red-600 mt-1">Requires immediate attention</div>
            </div>
          )}
          {moderateInteractions > 0 && (
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-yellow-600 mb-2">{moderateInteractions}</div>
              <div className="text-sm text-yellow-800 font-semibold uppercase tracking-wide">Moderate</div>
              <div className="text-xs text-yellow-600 mt-1">Monitor closely</div>
            </div>
          )}
          {minorInteractions > 0 && (
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">{minorInteractions}</div>
              <div className="text-sm text-blue-800 font-semibold uppercase tracking-wide">Minor</div>
              <div className="text-xs text-blue-600 mt-1">Low concern</div>
            </div>
          )}
          {safeInteractions > 0 && (
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-green-600 mb-2">{safeInteractions}</div>
              <div className="text-sm text-green-800 font-semibold uppercase tracking-wide">Safe</div>
              <div className="text-xs text-green-600 mt-1">No known issues</div>
            </div>
          )}
        </div>

        {/* Key Points */}
        {summary.keyPoints.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">ℹ</span>
              </div>
              Key Points
            </h4>
            <div className="space-y-3">
              {summary.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <ArrowRight className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {summary.recommendations.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">✓</span>
              </div>
              What to do next
            </h4>
            <div className="space-y-3">
              {summary.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-yellow-900 mb-2">Important Notice</h4>
              <p className="text-yellow-800 leading-relaxed">
                This information is for educational purposes only and should not replace professional medical advice.
                Always consult with your healthcare provider before making any changes to your medications or supplements.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
