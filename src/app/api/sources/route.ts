import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse, SourcesResponse } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const sources: SourcesResponse = {
      lastUpdated: '2024-01-15',
      sources: [
        {
          name: 'RxNav (NIH)',
          url: 'https://www.nlm.nih.gov/research/umls/rxnav/',
          description: 'Drug-drug interaction database from the National Library of Medicine',
          coverage: 'Prescription medications, OTC drugs, and supplements'
        },
        {
          name: 'NIH Office of Dietary Supplements',
          url: 'https://ods.od.nih.gov/',
          description: 'Comprehensive information on dietary supplements and their interactions',
          coverage: 'Vitamins, minerals, herbs, and other dietary supplements'
        },
        {
          name: 'MedlinePlus',
          url: 'https://medlineplus.gov/',
          description: 'Consumer health information from the National Library of Medicine',
          coverage: 'Plain-language drug information and health topics'
        },
        {
          name: 'FDA Drug Interactions',
          url: 'https://www.fda.gov/drugs/drug-interactions',
          description: 'Official FDA guidance on drug interactions and safety',
          coverage: 'FDA-approved medications and safety alerts'
        },
        {
          name: 'Drugs.com Interaction Checker',
          url: 'https://www.drugs.com/drug_interactions.html',
          description: 'Professional drug interaction checker',
          coverage: 'Comprehensive drug interaction database'
        }
      ]
    }

    return NextResponse.json({
      success: true,
      data: sources,
      timestamp: new Date().toISOString()
    } as ApiResponse<SourcesResponse>)

  } catch (error) {
    console.error('Error fetching sources:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch sources',
      timestamp: new Date().toISOString()
    } as ApiResponse<null>, { status: 500 })
  }
}
