import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse, SearchResult, DrugInteraction, SupplementGuidance, Drug, Supplement } from '@/types'

// Mock data for demonstration - in production, this would call real APIs
const mockInteractions: DrugInteraction[] = [
  {
    id: '1',
    drug1: 'Metformin',
    drug2: 'Lisinopril',
    severity: 'moderate',
    description: 'ACE inhibitors like Lisinopril may increase the risk of lactic acidosis when taken with Metformin.',
    clinicalEffect: 'Increased risk of lactic acidosis, especially in patients with kidney problems.',
    management: 'Monitor kidney function regularly and watch for symptoms of lactic acidosis.',
    evidenceLevel: 'strong',
    sources: ['RxNav (NIH)', 'MedlinePlus']
  },
  {
    id: '2',
    drug1: 'Lisinopril',
    drug2: 'Ibuprofen',
    severity: 'serious',
    description: 'NSAIDs like Ibuprofen can reduce the effectiveness of ACE inhibitors and increase the risk of kidney problems.',
    clinicalEffect: 'May cause acute kidney injury and reduce blood pressure control.',
    management: 'Use alternative pain relief when possible. If NSAIDs are necessary, monitor kidney function closely.',
    evidenceLevel: 'strong',
    sources: ['RxNav (NIH)', 'FDA Drug Interactions']
  },
  {
    id: '3',
    drug1: 'Metformin',
    drug2: 'Vitamin B12',
    severity: 'minor',
    description: 'Metformin may reduce Vitamin B12 absorption over time.',
    clinicalEffect: 'Long-term use may lead to Vitamin B12 deficiency.',
    management: 'Consider periodic B12 monitoring and supplementation if needed.',
    evidenceLevel: 'moderate',
    sources: ['NIH Office of Dietary Supplements']
  },
  {
    id: '4',
    drug1: 'Warfarin',
    drug2: 'Ibuprofen',
    severity: 'serious',
    description: 'NSAIDs like Ibuprofen can increase the risk of bleeding when taken with Warfarin.',
    clinicalEffect: 'Increased risk of serious bleeding, including gastrointestinal bleeding and intracranial hemorrhage.',
    management: 'Avoid NSAIDs if possible. If pain relief is needed, use acetaminophen instead. Monitor INR more frequently if NSAIDs must be used.',
    evidenceLevel: 'strong',
    sources: ['RxNav (NIH)', 'FDA Drug Interactions', 'American Heart Association']
  },
  {
    id: '5',
    drug1: 'Coumadin',
    drug2: 'Advil',
    severity: 'serious',
    description: 'NSAIDs like Advil can increase the risk of bleeding when taken with Coumadin.',
    clinicalEffect: 'Increased risk of serious bleeding, including gastrointestinal bleeding and intracranial hemorrhage.',
    management: 'Avoid NSAIDs if possible. If pain relief is needed, use acetaminophen instead. Monitor INR more frequently if NSAIDs must be used.',
    evidenceLevel: 'strong',
    sources: ['RxNav (NIH)', 'FDA Drug Interactions', 'American Heart Association']
  }
]

// Function to get supplement recommendations for specific medications
function getSupplementRecommendations(drug: Drug): Supplement[] {
  // Common supplement recommendations based on medication categories
  const supplementMap: { [key: string]: Supplement[] } = {
    // Diabetes medications
    'metformin': [
      { id: 'vitamin-b12', name: 'Vitamin B12', type: 'supplement', category: 'Vitamin', reason: 'Metformin can deplete B12 levels' },
      { id: 'folate', name: 'Folate', type: 'supplement', category: 'Vitamin', reason: 'Supports B12 absorption and reduces deficiency risk' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with blood sugar control and reduce side effects' }
    ],
    'glucophage': [
      { id: 'vitamin-b12', name: 'Vitamin B12', type: 'supplement', category: 'Vitamin', reason: 'Metformin can deplete B12 levels' },
      { id: 'folate', name: 'Folate', type: 'supplement', category: 'Vitamin', reason: 'Supports B12 absorption and reduces deficiency risk' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with blood sugar control and reduce side effects' }
    ],
    
    // Blood pressure medications
    'lisinopril': [
      { id: 'potassium', name: 'Potassium', type: 'supplement', category: 'Mineral', reason: 'ACE inhibitors can increase potassium levels - monitor with doctor' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with blood pressure control' },
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'May help with heart health and reduce side effects' }
    ],
    'prinivil': [
      { id: 'potassium', name: 'Potassium', type: 'supplement', category: 'Mineral', reason: 'ACE inhibitors can increase potassium levels - monitor with doctor' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with blood pressure control' },
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'May help with heart health and reduce side effects' }
    ],
    'zestril': [
      { id: 'potassium', name: 'Potassium', type: 'supplement', category: 'Mineral', reason: 'ACE inhibitors can increase potassium levels - monitor with doctor' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with blood pressure control' },
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'May help with heart health and reduce side effects' }
    ],
    'amlodipine': [
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with blood pressure control and reduce side effects' },
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'May help with heart health' },
      { id: 'grape-seed-extract', name: 'Grape Seed Extract', type: 'supplement', category: 'Antioxidant', reason: 'May help with circulation' }
    ],
    'norvasc': [
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with blood pressure control and reduce side effects' },
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'May help with heart health' },
      { id: 'grape-seed-extract', name: 'Grape Seed Extract', type: 'supplement', category: 'Antioxidant', reason: 'May help with circulation' }
    ],
    
    // Cholesterol medications
    'atorvastatin': [
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'Statins can deplete CoQ10 levels' },
      { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin', reason: 'May help with bone health and immune function' },
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with heart health and reduce inflammation' }
    ],
    'lipitor': [
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'Statins can deplete CoQ10 levels' },
      { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin', reason: 'May help with bone health and immune function' },
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with heart health and reduce inflammation' }
    ],
    'simvastatin': [
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'Statins can deplete CoQ10 levels' },
      { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin', reason: 'May help with bone health and immune function' },
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with heart health and reduce inflammation' }
    ],
    'zocor': [
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'Statins can deplete CoQ10 levels' },
      { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin', reason: 'May help with bone health and immune function' },
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with heart health and reduce inflammation' }
    ],
    
    // Stomach medications
    'omeprazole': [
      { id: 'vitamin-b12', name: 'Vitamin B12', type: 'supplement', category: 'Vitamin', reason: 'PPIs can reduce B12 absorption' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'PPIs can reduce magnesium absorption' },
      { id: 'calcium', name: 'Calcium', type: 'supplement', category: 'Mineral', reason: 'PPIs can reduce calcium absorption' }
    ],
    'prilosec': [
      { id: 'vitamin-b12', name: 'Vitamin B12', type: 'supplement', category: 'Vitamin', reason: 'PPIs can reduce B12 absorption' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'PPIs can reduce magnesium absorption' },
      { id: 'calcium', name: 'Calcium', type: 'supplement', category: 'Mineral', reason: 'PPIs can reduce calcium absorption' }
    ],
    
    // Heart medications
    'metoprolol': [
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'May help with heart health and energy' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with heart rhythm and blood pressure' },
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with heart health' }
    ],
    'lopressor': [
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'May help with heart health and energy' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with heart rhythm and blood pressure' },
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with heart health' }
    ],
    'toprol': [
      { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant', reason: 'May help with heart health and energy' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with heart rhythm and blood pressure' },
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with heart health' }
    ],
    
    // Blood thinners
    'warfarin': [
      { id: 'vitamin-k', name: 'Vitamin K', type: 'supplement', category: 'Vitamin', reason: 'Important for blood clotting - discuss with doctor first' },
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with heart health - monitor with doctor' }
    ],
    'coumadin': [
      { id: 'vitamin-k', name: 'Vitamin K', type: 'supplement', category: 'Vitamin', reason: 'Important for blood clotting - discuss with doctor first' },
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with heart health - monitor with doctor' }
    ],
    
    // Thyroid medications
    'levothyroxine': [
      { id: 'selenium', name: 'Selenium', type: 'supplement', category: 'Mineral', reason: 'Important for thyroid function' },
      { id: 'zinc', name: 'Zinc', type: 'supplement', category: 'Mineral', reason: 'Supports thyroid hormone production' },
      { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin', reason: 'May help with thyroid function and bone health' }
    ],
    'synthroid': [
      { id: 'selenium', name: 'Selenium', type: 'supplement', category: 'Mineral', reason: 'Important for thyroid function' },
      { id: 'zinc', name: 'Zinc', type: 'supplement', category: 'Mineral', reason: 'Supports thyroid hormone production' },
      { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin', reason: 'May help with thyroid function and bone health' }
    ],
    'levoxyl': [
      { id: 'selenium', name: 'Selenium', type: 'supplement', category: 'Mineral', reason: 'Important for thyroid function' },
      { id: 'zinc', name: 'Zinc', type: 'supplement', category: 'Mineral', reason: 'Supports thyroid hormone production' },
      { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin', reason: 'May help with thyroid function and bone health' }
    ],
    
    // Mental health medications
    'sertraline': [
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with mood and brain health' },
      { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin', reason: 'May help with mood and depression' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with anxiety and sleep' }
    ],
    'zoloft': [
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help with mood and brain health' },
      { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin', reason: 'May help with mood and depression' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with anxiety and sleep' }
    ],
    
    // Pain medications
    'ibuprofen': [
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help reduce inflammation naturally' },
      { id: 'curcumin', name: 'Curcumin', type: 'supplement', category: 'Anti-inflammatory', reason: 'Natural anti-inflammatory properties' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with muscle relaxation and pain' }
    ],
    'advil': [
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help reduce inflammation naturally' },
      { id: 'curcumin', name: 'Curcumin', type: 'supplement', category: 'Anti-inflammatory', reason: 'Natural anti-inflammatory properties' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with muscle relaxation and pain' }
    ],
    'motrin': [
      { id: 'omega-3', name: 'Omega-3 Fatty Acids', type: 'supplement', category: 'Fatty Acid', reason: 'May help reduce inflammation naturally' },
      { id: 'curcumin', name: 'Curcumin', type: 'supplement', category: 'Anti-inflammatory', reason: 'Natural anti-inflammatory properties' },
      { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral', reason: 'May help with muscle relaxation and pain' }
    ],
    'acetaminophen': [
      { id: 'n-acetyl-cysteine', name: 'N-Acetyl Cysteine (NAC)', type: 'supplement', category: 'Antioxidant', reason: 'May help protect liver from acetaminophen toxicity' },
      { id: 'milk-thistle', name: 'Milk Thistle', type: 'supplement', category: 'Liver Support', reason: 'May help support liver health' },
      { id: 'glutathione', name: 'Glutathione', type: 'supplement', category: 'Antioxidant', reason: 'Important antioxidant for liver function' }
    ],
    'tylenol': [
      { id: 'n-acetyl-cysteine', name: 'N-Acetyl Cysteine (NAC)', type: 'supplement', category: 'Antioxidant', reason: 'May help protect liver from acetaminophen toxicity' },
      { id: 'milk-thistle', name: 'Milk Thistle', type: 'supplement', category: 'Liver Support', reason: 'May help support liver health' },
      { id: 'glutathione', name: 'Glutathione', type: 'supplement', category: 'Antioxidant', reason: 'Important antioxidant for liver function' }
    ]
  }
  
  // Get recommendations for the specific drug
  const drugRecommendations = supplementMap[drug.id] || supplementMap[drug.name.toLowerCase()] || []
  
  return drugRecommendations
}

const mockSupplementGuidance: SupplementGuidance[] = [
  {
    drug: 'Metformin',
    helpful: [
      {
        name: 'Vitamin B12',
        reason: 'Metformin can reduce B12 absorption, especially with long-term use.',
        evidence: 'strong',
        recommendation: 'Consider B12 monitoring every 1-2 years and supplementation if levels are low.'
      },
      {
        name: 'Folate',
        reason: 'Folate works synergistically with B12 and may help prevent deficiency.',
        evidence: 'moderate',
        recommendation: 'Consider taking a B-complex vitamin that includes both B12 and folate.'
      }
    ],
    avoid: [],
    monitoring: [
      {
        what: 'Vitamin B12 levels',
        how: 'Blood test (serum B12)',
        frequency: 'Every 1-2 years'
      },
      {
        what: 'Kidney function',
        how: 'Blood test (creatinine, eGFR)',
        frequency: 'Every 3-6 months'
      }
    ]
  },
  {
    drug: 'Lisinopril',
    helpful: [
      {
        name: 'Magnesium',
        reason: 'May help with blood pressure control and is generally safe with ACE inhibitors.',
        evidence: 'moderate',
        recommendation: 'Consider magnesium supplementation if levels are low, but monitor blood pressure.'
      }
    ],
    avoid: [
      {
        name: 'Potassium supplements',
        reason: 'ACE inhibitors can increase potassium levels, so potassium supplements should be used with caution.',
        evidence: 'strong',
        recommendation: 'Avoid high-dose potassium supplements unless prescribed by your doctor.'
      }
    ],
    monitoring: [
      {
        what: 'Blood pressure',
        how: 'Home monitoring or regular checkups',
        frequency: 'Weekly to monthly'
      },
      {
        what: 'Potassium levels',
        how: 'Blood test (serum potassium)',
        frequency: 'Every 3-6 months'
      }
    ]
  }
]

export async function POST(request: NextRequest) {
  try {
    const { drugs } = await request.json()
    
    if (!drugs || !Array.isArray(drugs) || drugs.length < 1) {
      return NextResponse.json({
        success: false,
        error: 'At least 1 medication is required',
        timestamp: new Date().toISOString()
      } as ApiResponse<null>)
    }

    // Filter interactions for the provided drugs
    const drugNames = drugs.map((drug: Drug) => drug.name)
    const relevantInteractions = mockInteractions.filter(interaction => 
      drugNames.includes(interaction.drug1) && 
      drugNames.includes(interaction.drug2)
    )

    // Filter supplement guidance for the provided drugs
    const relevantGuidance = mockSupplementGuidance.filter(guidance =>
      drugNames.includes(guidance.drug)
    )

    // Determine overall risk level
    const hasSerious = relevantInteractions.some(i => i.severity === 'serious')
    const hasModerate = relevantInteractions.some(i => i.severity === 'moderate')
    const riskLevel = drugs.length === 1 ? 'low' : (hasSerious ? 'high' : hasModerate ? 'medium' : 'low')

    // Generate key points
    const keyPoints: string[] = []
    
    if (drugs.length === 1) {
      const drug = drugs[0]
      keyPoints.push(`Information for ${drug.name} (${drug.type === 'prescription' ? 'Prescription' : drug.type === 'otc' ? 'Over-the-counter' : 'Supplement'})`)
      if (relevantGuidance.length > 0) {
        keyPoints.push('Supplement guidance and monitoring tips available')
      }
      // Add specific supplement recommendations for single medication
      const supplementRecommendations = getSupplementRecommendations(drugs[0])
      if (supplementRecommendations.length > 0) {
        keyPoints.push(`Recommended supplements: ${supplementRecommendations.map(s => s.name).join(', ')}`)
      }
      keyPoints.push('Add another medication to check for potential interactions')
    } else {
    if (hasSerious) {
      keyPoints.push(`Found ${relevantInteractions.filter(i => i.severity === 'serious').length} serious interaction(s) requiring immediate attention`)
    }
    if (hasModerate) {
      keyPoints.push(`Found ${relevantInteractions.filter(i => i.severity === 'moderate').length} moderate interaction(s) requiring monitoring`)
    }
    if (relevantGuidance.length > 0) {
      keyPoints.push(`Supplement guidance available for ${relevantGuidance.length} medication(s)`)
    }
    if (relevantInteractions.length === 0) {
      keyPoints.push('No significant interactions found between your medications')
      }
    }

    // Generate recommendations
    const recommendations: string[] = []
    
    if (drugs.length === 1) {
      const drug = drugs[0]
      recommendations.push(`Continue taking ${drug.name} as directed by your healthcare provider`)
      if (relevantGuidance.length > 0) {
        recommendations.push('Review supplement guidance and monitoring recommendations below')
      }
      recommendations.push('Consider adding other medications you take to check for interactions')
    } else {
    if (hasSerious) {
      recommendations.push('Consult your healthcare provider immediately about serious interactions')
    }
    if (hasModerate) {
      recommendations.push('Monitor closely for moderate interactions and discuss with your healthcare provider')
    }
    if (relevantGuidance.length > 0) {
      recommendations.push('Review supplement guidance for optimal health outcomes')
    }
    if (relevantInteractions.length === 0) {
      recommendations.push('Continue current regimen as prescribed by your healthcare provider')
    }
    }

    // Get supplement recommendations for single medication
    const supplementRecommendations = drugs.length === 1 ? getSupplementRecommendations(drugs[0]) : []

    const result: SearchResult = {
      drugs,
      interactions: relevantInteractions,
      supplementGuidance: relevantGuidance,
      supplementRecommendations: supplementRecommendations.length > 0 ? supplementRecommendations : undefined,
      summary: {
        riskLevel,
        keyPoints,
        recommendations
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    } as ApiResponse<SearchResult>)

  } catch (error) {
    console.error('Error checking interactions:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to check interactions',
      timestamp: new Date().toISOString()
    } as ApiResponse<null>, { status: 500 })
  }
}
