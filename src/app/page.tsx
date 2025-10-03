'use client'

import { useState } from 'react'
import { DrugSearch } from '@/components/DrugSearch'
import { InteractionsTable } from '@/components/InteractionsTable'
import { SupplementGuidanceComponent } from '@/components/SupplementGuidance'
import { SupplementRecommendations } from '@/components/SupplementRecommendations'
import { MedicationInfo } from '@/components/MedicationInfo'
import { SummaryCard } from '@/components/SummaryCard'
import { Drug, SearchResult } from '@/types'

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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DR</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DrugReactor</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
              <a href="#safety" className="text-gray-600 hover:text-gray-900 transition-colors">Safety</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              Trusted by healthcare professionals
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Check Medication
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Interactions</span>
              <br />
              <span className="text-3xl md:text-4xl text-gray-600 font-normal">Safely & Instantly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get instant, reliable information about drug interactions, supplement guidance, and medication safety. 
              Our AI-powered system helps you make informed decisions about your health.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Free to use
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                No registration required
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                HIPAA compliant
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Enter Your Medications</h2>
              <p className="text-gray-600">Search by brand name, generic name, or supplement</p>
            </div>
            <DrugSearch
              drugs={drugs}
              onDrugsChange={handleDrugsChange}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
              </div>
              <p className="text-lg text-gray-600 font-medium">Analyzing interactions...</p>
              <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-600 text-sm">!</span>
                </div>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Results Section */}
          {results && (
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {drugs.length === 1 ? 'Medication Information' : 'Interaction Results'}
                </h1>
              </div>

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

          {/* How it works section */}
          {!results && !isLoading && (
            <div id="how-it-works" className="mt-24">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our advanced system analyzes medication interactions using the latest medical databases and AI technology.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Medications</h3>
                  <p className="text-gray-600">Enter your medications by brand name, generic name, or supplement. Our smart search finds exact matches.</p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Analysis</h3>
                  <p className="text-gray-600">Get immediate results about potential interactions, side effects, and safety recommendations.</p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Recommendations</h3>
                  <p className="text-gray-600">Receive personalized guidance on supplement interactions and monitoring tips for your health.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">DR</span>
                  </div>
                  <span className="text-xl font-bold">DrugReactor</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Your trusted source for medication interaction checking and health guidance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 DrugReactor. All rights reserved. This tool is for educational purposes only and is not a substitute for professional medical advice.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}