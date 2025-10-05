'use client'

import { useState, useEffect } from 'react'
import { DrugSearch } from '@/components/DrugSearch'
import { InteractionsTable } from '@/components/InteractionsTable'
import { SupplementGuidanceComponent } from '@/components/SupplementGuidance'
import { SupplementRecommendations } from '@/components/SupplementRecommendations'
import { MedicationInfo } from '@/components/MedicationInfo'
import { SummaryCard } from '@/components/SummaryCard'
import { Drug, SearchResult } from '@/types'
import { generateId } from '@/lib/utils'

export default function Home() {
  const [drugs, setDrugs] = useState<Drug[]>([])
  const [results, setResults] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (drugs.length < 1) return

    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drugs }),
      })

      const data = await response.json()

      if (data.success) {
        setResults(data.data)
      } else {
        setError(data.error || 'Failed to analyze medications')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-analyze when drugs change
  const handleDrugsChange = async (newDrugs: Drug[]) => {
    setDrugs(newDrugs)
    
    // If we have at least one drug, automatically analyze
    if (newDrugs.length > 0) {
      setIsLoading(true)
      setError(null)
      setResults(null)

      try {
        const response = await fetch('/api/interactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ drugs: newDrugs }),
        })

        const data = await response.json()

        if (data.success) {
          setResults(data.data)
        } else {
          setError(data.error || 'Failed to analyze medications')
        }
      } catch (err) {
        setError('Network error. Please try again.')
        console.error('Error:', err)
      } finally {
        setIsLoading(false)
      }
    } else {
      // Clear results if no drugs
      setResults(null)
      setError(null)
    }
  }

  const handleNewSearch = () => {
    setDrugs([])
    setResults(null)
    setError(null)
    // Push home state to browser history
    window.history.pushState({ page: 'home' }, '', '/')
  }

  // Handle browser back/forward buttons and initial URL state
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // When user presses back button, go to home state
      setDrugs([])
      setResults(null)
      setError(null)
    }

    // Check if there are drugs in URL parameters on initial load
    const urlParams = new URLSearchParams(window.location.search)
    const drugsParam = urlParams.get('drugs')
    
    if (drugsParam) {
      // Restore drugs from URL
      const drugNames = drugsParam.split(',').map(name => name.trim())
      // This will trigger the auto-analysis via handleDrugsChange
      const restoredDrugs = drugNames.map(name => ({
        id: generateId(),
        name: name,
        type: 'prescription' as const,
        category: 'Unknown'
      }))
      setDrugs(restoredDrugs)
    } else {
      // Push initial home state to history
      window.history.pushState({ page: 'home' }, '', '/')
    }

    // Add event listener for browser back/forward buttons
    window.addEventListener('popstate', handlePopState)

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Update browser history when results change
  useEffect(() => {
    if (results && drugs.length > 0) {
      // Push results state to history when showing results
      const searchParams = drugs.map(drug => drug.name).join(',')
      window.history.pushState({ page: 'results', drugs: searchParams }, '', `/?drugs=${encodeURIComponent(searchParams)}`)
    }
  }, [results, drugs])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Search Section */}
          <DrugSearch
            drugs={drugs}
            onDrugsChange={handleDrugsChange}
            onSearch={handleSearch}
            onNewSearch={handleNewSearch}
            isLoading={isLoading}
          />

          {/* Results Section */}
          {results && (
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {drugs.length === 1 ? 'Medication Information' : 'Interaction Results'}
                </h1>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {/* Results */}
              <div className="space-y-6">
                {drugs.length === 1 ? (
                  <>
                    <MedicationInfo drug={drugs[0]} />
                    {results.supplementRecommendations && (
                      <SupplementRecommendations recommendations={results.supplementRecommendations} />
                    )}
                    <SupplementGuidanceComponent guidance={results.supplementGuidance} />
                  </>
                ) : (
                  <>
                    <SummaryCard result={results} />
                    <InteractionsTable interactions={results.interactions} />
                    <SupplementGuidanceComponent guidance={results.supplementGuidance} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
