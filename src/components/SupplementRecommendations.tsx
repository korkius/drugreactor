'use client'

import { Supplement } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pill, Heart, Shield, Zap, Leaf, Droplets } from 'lucide-react'

interface SupplementRecommendationsProps {
  recommendations: Supplement[]
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Vitamin': <Pill className="h-4 w-4" />,
  'Mineral': <Shield className="h-4 w-4" />,
  'Antioxidant': <Zap className="h-4 w-4" />,
  'Fatty Acid': <Droplets className="h-4 w-4" />,
  'Anti-inflammatory': <Leaf className="h-4 w-4" />,
  'Liver Support': <Heart className="h-4 w-4" />
}

const categoryColors: { [key: string]: string } = {
  'Vitamin': 'bg-blue-100 text-blue-800',
  'Mineral': 'bg-green-100 text-green-800',
  'Antioxidant': 'bg-purple-100 text-purple-800',
  'Fatty Acid': 'bg-orange-100 text-orange-800',
  'Anti-inflammatory': 'bg-red-100 text-red-800',
  'Liver Support': 'bg-pink-100 text-pink-800'
}

export function SupplementRecommendations({ recommendations }: SupplementRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return null
  }

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/30 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Heart className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold">Recommended Supplements</span>
        </CardTitle>
        <p className="text-purple-100 mt-2">
          These supplements may help support your health while taking this medication. Always consult your healthcare provider before starting any new supplements.
        </p>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((supplement) => (
            <div key={supplement.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {categoryIcons[supplement.category]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{supplement.name}</h4>
                    <Badge 
                      className={`${categoryColors[supplement.category] || 'bg-gray-100 text-gray-800'} flex items-center space-x-1`}
                    >
                      {categoryIcons[supplement.category]}
                      <span>{supplement.category}</span>
                    </Badge>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {supplement.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Important Safety Note</h4>
              <p className="text-blue-800 leading-relaxed">
                These recommendations are for educational purposes only. Always discuss supplement use with your healthcare provider, especially if you have any medical conditions or are taking other medications. Some supplements may interact with your medication or affect its effectiveness.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
