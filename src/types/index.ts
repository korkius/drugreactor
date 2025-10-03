// Core data types
export interface Drug {
  id: string
  name: string
  genericName?: string
  brandNames?: string[]
  type: 'prescription' | 'otc' | 'supplement'
  category: string
  rxcui?: string // RxNorm concept unique identifier
}

export interface Supplement {
  id: string
  name: string
  type: 'supplement'
  category: string
  reason: string
}

export interface DrugInteraction {
  id: string
  drug1: string
  drug2: string
  severity: 'serious' | 'moderate' | 'minor' | 'none'
  description: string
  clinicalEffect: string
  management: string
  evidenceLevel: 'strong' | 'moderate' | 'limited'
  sources: string[]
}

export interface SupplementGuidance {
  drug: string
  helpful: {
    name: string
    reason: string
    evidence: 'strong' | 'moderate' | 'limited'
    recommendation: string
  }[]
  avoid: {
    name: string
    reason: string
    evidence: 'strong' | 'moderate' | 'limited'
    recommendation: string
  }[]
  monitoring: {
    what: string
    how: string
    frequency: string
  }[]
}

export interface SearchResult {
  drugs: Drug[]
  interactions: DrugInteraction[]
  supplementGuidance: SupplementGuidance[]
  supplementRecommendations?: Supplement[]
  summary: {
    riskLevel: 'high' | 'medium' | 'low'
    keyPoints: string[]
    recommendations: string[]
  }
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

export interface NormalizeResponse {
  normalized: string
  suggestions: Drug[]
  confidence: number
}

export interface SourcesResponse {
  lastUpdated: string
  sources: {
    name: string
    url: string
    description: string
    coverage: string
  }[]
}

// UI component types
export interface RiskBadgeProps {
  severity: 'serious' | 'moderate' | 'minor' | 'none'
  size?: 'sm' | 'md' | 'lg'
}

export interface EvidenceBadgeProps {
  level: 'strong' | 'moderate' | 'limited'
}

// Search and autocomplete types
export interface SearchSuggestion {
  drug: Drug
  matchType: 'exact' | 'partial' | 'brand' | 'generic'
  confidence: number
}

// Analytics types
export interface ClickEvent {
  type: 'source' | 'affiliate' | 'interaction'
  target: string
  timestamp: string
  sessionId: string
}

// Affiliate types
export interface AffiliateOffer {
  id: string
  title: string
  description: string
  url: string
  merchant: string
  category: 'supplement' | 'monitoring' | 'education'
  isSponsored: boolean
  utmSource: string
}
