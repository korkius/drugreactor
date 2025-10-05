'use client'

import { Supplement } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pill, Heart, Shield, Zap, Leaf, Droplets, Clock, Utensils, Sun, Moon, AlertCircle } from 'lucide-react'

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

// Detailed supplement information for better effectiveness
const getSupplementDetails = (supplementName: string) => {
  const details: { [key: string]: any } = {
    'Vitamin B12': {
      timing: 'Morning with breakfast',
      withFood: 'Take with food for better absorption',
      dosage: '1000-2000 mcg daily',
      tips: ['Sublingual form may be better absorbed', 'Avoid taking with coffee or tea', 'May take 2-3 months to see benefits'],
      interactions: 'Avoid taking with metformin at the same time'
    },
    'Folate': {
      timing: 'Morning with breakfast',
      withFood: 'Take with food',
      dosage: '400-800 mcg daily',
      tips: ['Folic acid is synthetic form', 'Methylfolate is more bioavailable', 'Take with B12 for better absorption'],
      interactions: 'Works synergistically with B12'
    },
    'Magnesium': {
      timing: 'Evening before bed',
      withFood: 'Can take with or without food',
      dosage: '200-400 mg daily',
      tips: ['Magnesium glycinate is best absorbed', 'May cause loose stools if dose too high', 'Helps with sleep and muscle relaxation'],
      interactions: 'May enhance metformin effectiveness'
    },
    'N-Acetyl Cysteine (NAC)': {
      timing: 'Morning on empty stomach',
      withFood: 'Take 30 minutes before meals',
      dosage: '600-1200 mg daily',
      tips: ['Best absorbed on empty stomach', 'May help with liver protection', 'Can cause nausea if taken with food'],
      interactions: 'May help protect liver from acetaminophen'
    },
    'Milk Thistle': {
      timing: 'With meals',
      withFood: 'Take with food to reduce stomach upset',
      dosage: '150-300 mg daily',
      tips: ['Standardized to 80% silymarin', 'May take 2-3 months for full effect', 'Helps support liver function'],
      interactions: 'May help with liver health'
    },
    'Glutathione': {
      timing: 'Morning on empty stomach',
      withFood: 'Take 30 minutes before meals',
      dosage: '250-500 mg daily',
      tips: ['Liposomal form is best absorbed', 'May help with antioxidant support', 'Can be taken with vitamin C'],
      interactions: 'Important for liver detoxification'
    },
    'Coenzyme Q10': {
      timing: 'With meals containing fat',
      withFood: 'Take with fatty foods for better absorption',
      dosage: '100-200 mg daily',
      tips: ['Ubiquinol form is more bioavailable', 'May help with statin side effects', 'Best absorbed with fat'],
      interactions: 'May help with statin-induced muscle pain'
    },
    'Omega-3': {
      timing: 'With meals',
      withFood: 'Take with food to reduce fishy aftertaste',
      dosage: '1000-2000 mg daily',
      tips: ['Look for high EPA/DHA content', 'May help with inflammation', 'Store in refrigerator'],
      interactions: 'May help with cardiovascular health'
    },
    'Vitamin D3': {
      timing: 'Morning with breakfast',
      withFood: 'Take with fatty foods for better absorption',
      dosage: '1000-4000 IU daily',
      tips: ['Take with magnesium for better absorption', 'Get blood levels checked', 'May take 2-3 months to see benefits'],
      interactions: 'Works with calcium and magnesium'
    },
    'Probiotics': {
      timing: 'Morning on empty stomach or with meals',
      withFood: 'Can take with or without food',
      dosage: '10-50 billion CFU daily',
      tips: ['Refrigerate for best potency', 'Take consistently for best results', 'May help with digestive health'],
      interactions: 'May help with antibiotic-related digestive issues'
    }
  }
  
  return details[supplementName] || {
    timing: 'As directed on label',
    withFood: 'Check label for food requirements',
    dosage: 'Follow label instructions',
    tips: ['Consult healthcare provider for dosing', 'Take consistently for best results'],
    interactions: 'Discuss with healthcare provider'
  }
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
        <div className="space-y-6">
          {recommendations.map((supplement) => {
            const details = getSupplementDetails(supplement.name)
            return (
              <div key={supplement.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 text-lg">{supplement.name}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`${categoryColors[supplement.category] || 'bg-gray-100 text-gray-800'} flex items-center space-x-1`}
                    >
                      {categoryIcons[supplement.category]}
                      <span>{supplement.category}</span>
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {supplement.reason}
                </p>

                {/* How to Take for Better Effectiveness */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900">Best Time:</span>
                    </div>
                    <p className="text-sm text-gray-700 ml-6">{details.timing}</p>

                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-gray-900">With Food:</span>
                    </div>
                    <p className="text-sm text-gray-700 ml-6">{details.withFood}</p>

                    <div className="flex items-center space-x-2">
                      <Pill className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-gray-900">Dosage:</span>
                    </div>
                    <p className="text-sm text-gray-700 ml-6">{details.dosage}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-gray-900">Effectiveness Tips:</span>
                    </div>
                    <ul className="text-sm text-gray-700 ml-6 space-y-1">
                      {details.tips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Interaction Note */}
                {details.interactions && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-yellow-900 text-sm">Interaction Note:</h5>
                        <p className="text-sm text-yellow-800">{details.interactions}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
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
