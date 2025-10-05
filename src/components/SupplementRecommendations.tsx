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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-green-600" />
          <span>Recommended Supplements</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          These supplements may help support your health while taking this medication. Always consult your healthcare provider before starting any new supplements.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((supplement) => (
            <div key={supplement.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">{supplement.name}</h4>
                  <Badge 
                    variant="secondary" 
                    className={`${categoryColors[supplement.category] || 'bg-gray-100 text-gray-800'} flex items-center space-x-1`}
                  >
                    {categoryIcons[supplement.category]}
                    <span>{supplement.category}</span>
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {supplement.reason}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Important Safety Note</h4>
              <p className="text-sm text-blue-800">
                These recommendations are for educational purposes only. Always discuss supplement use with your healthcare provider, especially if you have any medical conditions or are taking other medications. Some supplements may interact with your medication or affect its effectiveness.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
