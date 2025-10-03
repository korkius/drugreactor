import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse, NormalizeResponse, Drug } from '@/types'

// Mock drug database for normalization
const DRUG_DATABASE: Drug[] = [
  { id: 'metformin', name: 'Metformin', type: 'prescription', category: 'Diabetes', rxcui: '6809' },
  { id: 'lisinopril', name: 'Lisinopril', type: 'prescription', category: 'Blood Pressure', rxcui: '314076' },
  { id: 'atorvastatin', name: 'Atorvastatin', type: 'prescription', category: 'Cholesterol', rxcui: '617312' },
  { id: 'ibuprofen', name: 'Ibuprofen', type: 'otc', category: 'Pain Relief' },
  { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin' },
  { id: 'vitamin-b12', name: 'Vitamin B12', type: 'supplement', category: 'Vitamin' },
  // Add more drugs as needed
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Query must be at least 2 characters long',
        timestamp: new Date().toISOString()
      } as ApiResponse<null>)
    }

    const normalizedQuery = query.toLowerCase().trim()
    
    // Find exact matches first
    const exactMatches = DRUG_DATABASE.filter(drug => 
      drug.name.toLowerCase() === normalizedQuery
    )
    
    if (exactMatches.length > 0) {
      return NextResponse.json({
        success: true,
        data: {
          normalized: exactMatches[0].name,
          suggestions: exactMatches,
          confidence: 1.0
        } as NormalizeResponse,
        timestamp: new Date().toISOString()
      } as ApiResponse<NormalizeResponse>)
    }

    // Find partial matches
    const partialMatches = DRUG_DATABASE.filter(drug => 
      drug.name.toLowerCase().includes(normalizedQuery) ||
      drug.category.toLowerCase().includes(normalizedQuery)
    ).slice(0, 5)

    // Calculate confidence based on match quality
    let confidence = 0.5
    if (partialMatches.length > 0) {
      const bestMatch = partialMatches[0]
      if (bestMatch.name.toLowerCase().startsWith(normalizedQuery)) {
        confidence = 0.8
      } else if (bestMatch.name.toLowerCase().includes(normalizedQuery)) {
        confidence = 0.6
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        normalized: query,
        suggestions: partialMatches,
        confidence
      } as NormalizeResponse,
      timestamp: new Date().toISOString()
    } as ApiResponse<NormalizeResponse>)

  } catch (error) {
    console.error('Error normalizing drug name:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to normalize drug name',
      timestamp: new Date().toISOString()
    } as ApiResponse<null>, { status: 500 })
  }
}
