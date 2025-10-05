'use client'

import { useState } from 'react'
import { Supplement } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pill, Heart, Shield, Zap, Leaf, Droplets, ChevronDown, ChevronUp, Info } from 'lucide-react'

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

const getSupplementDetails = (supplement: Supplement) => {
  const details: { [key: string]: any } = {
    'vitamin-b12': {
      description: 'Vitamin B12 (cobalamin) is essential for nerve function, red blood cell formation, and DNA synthesis. It helps prevent anemia and supports brain health.',
      benefits: ['Prevents B12 deficiency anemia', 'Supports nerve function', 'Helps with energy production', 'Important for brain health'],
      dosage: 'Typical dose: 1000-2000 mcg daily (consult your doctor)',
      sources: ['Meat, fish, dairy products', 'Fortified cereals', 'Nutritional yeast'],
      interactions: 'May interact with certain medications like metformin, proton pump inhibitors'
    },
    'folate': {
      description: 'Folate (folic acid) is crucial for cell division, DNA synthesis, and preventing birth defects. It works closely with B12.',
      benefits: ['Prevents neural tube defects', 'Supports red blood cell formation', 'Important for DNA synthesis', 'May reduce heart disease risk'],
      dosage: 'Typical dose: 400-800 mcg daily (consult your doctor)',
      sources: ['Leafy green vegetables', 'Beans, lentils', 'Fortified grains'],
      interactions: 'May interact with methotrexate and certain seizure medications'
    },
    'magnesium': {
      description: 'Magnesium is involved in over 300 enzymatic reactions in the body, including muscle and nerve function, blood sugar control, and bone health.',
      benefits: ['Supports muscle and nerve function', 'Helps with blood sugar control', 'May improve sleep quality', 'Supports bone health'],
      dosage: 'Typical dose: 200-400 mg daily (consult your doctor)',
      sources: ['Nuts, seeds', 'Dark leafy greens', 'Whole grains', 'Dark chocolate'],
      interactions: 'May interact with certain antibiotics and diuretics'
    },
    'n-acetyl-cysteine': {
      description: 'N-Acetyl Cysteine (NAC) is a powerful antioxidant that helps boost glutathione levels and may protect against liver damage.',
      benefits: ['Powerful antioxidant', 'Supports liver health', 'May help with respiratory conditions', 'Supports immune function'],
      dosage: 'Typical dose: 600-1200 mg daily (consult your doctor)',
      sources: ['Supplements only', 'Not found in significant amounts in food'],
      interactions: 'May interact with nitroglycerin and certain blood pressure medications'
    },
    'milk-thistle': {
      description: 'Milk thistle contains silymarin, which has antioxidant and anti-inflammatory properties that may help protect and support liver function.',
      benefits: ['Supports liver health', 'Antioxidant properties', 'May help with liver detoxification', 'Anti-inflammatory effects'],
      dosage: 'Typical dose: 150-300 mg daily (consult your doctor)',
      sources: ['Supplements', 'Tea (less concentrated)'],
      interactions: 'May interact with certain medications metabolized by the liver'
    },
    'glutathione': {
      description: 'Glutathione is the body\'s master antioxidant, crucial for detoxification, immune function, and protecting cells from oxidative stress.',
      benefits: ['Master antioxidant', 'Supports detoxification', 'Boosts immune function', 'Protects against oxidative stress'],
      dosage: 'Typical dose: 250-500 mg daily (consult your doctor)',
      sources: ['Supplements', 'Whey protein', 'Sulfur-rich foods'],
      interactions: 'Generally well-tolerated, but consult your doctor'
    }
  }
  
  return details[supplement.id] || {
    description: `${supplement.name} is a ${supplement.category.toLowerCase()} that may provide health benefits.`,
    benefits: ['Consult your healthcare provider for specific benefits'],
    dosage: 'Consult your healthcare provider for appropriate dosage',
    sources: ['Available in supplement form'],
    interactions: 'Always consult your healthcare provider about potential interactions'
  }
}

export function SupplementRecommendations({ recommendations }: SupplementRecommendationsProps) {
  const [expandedSupplement, setExpandedSupplement] = useState<string | null>(null)
  
  if (!recommendations || recommendations.length === 0) {
    return null
  }

  const toggleSupplement = (supplementId: string) => {
    setExpandedSupplement(expandedSupplement === supplementId ? null : supplementId)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-green-600" />
          <span>Recommended Supplements</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          These supplements may help support your health while taking this medication. Click on any supplement to learn more. Always consult your healthcare provider before starting any new supplements.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((supplement) => {
            const isExpanded = expandedSupplement === supplement.id
            const details = getSupplementDetails(supplement)
            
            return (
              <div key={supplement.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => toggleSupplement(supplement.id)}
                >
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
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {supplement.reason}
                  </p>
                  {!isExpanded && (
                    <p className="text-xs text-gray-500 mt-2">
                      Click to learn more about {supplement.name}
                    </p>
                  )}
                </div>
                
                {isExpanded && (
                  <div className="border-t bg-gray-50 p-4 space-y-4">
                    {/* Description */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">What is {supplement.name}?</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">{details.description}</p>
                    </div>
                    
                    {/* Benefits */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Key Benefits:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {details.benefits.map((benefit: string, index: number) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Dosage */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-1">Typical Dosage:</h5>
                      <p className="text-sm text-blue-800">{details.dosage}</p>
                    </div>
                    
                    {/* Sources */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Food Sources:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {details.sources.map((source: string, index: number) => (
                          <li key={index}>{source}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Interactions */}
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-yellow-900 mb-1">Important:</h5>
                          <p className="text-sm text-yellow-800">{details.interactions}</p>
                        </div>
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
