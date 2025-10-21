'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Search, X, Pill, AlertCircle, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Drug, SearchSuggestion } from '@/types'
import { normalizeDrugName, generateId, debounce } from '@/lib/utils'

interface DrugSearchProps {
  drugs: Drug[]
  onDrugsChange: (drugs: Drug[]) => void
  onSearch: () => void
  onNewSearch?: () => void
  isLoading?: boolean
}

// Comprehensive drug database for autocomplete
const DRUG_DATABASE: Drug[] = [
  // Prescription medications with brand names
  { id: 'metformin', name: 'Metformin', type: 'prescription', category: 'Diabetes', rxcui: '6809' },
  { id: 'metformin-glucophage', name: 'Glucophage', type: 'prescription', category: 'Diabetes', rxcui: '6809' },
  
  { id: 'lisinopril', name: 'Lisinopril', type: 'prescription', category: 'Blood Pressure', rxcui: '314076' },
  { id: 'lisinopril-prinivil', name: 'Prinivil', type: 'prescription', category: 'Blood Pressure', rxcui: '314076' },
  { id: 'lisinopril-zestril', name: 'Zestril', type: 'prescription', category: 'Blood Pressure', rxcui: '314076' },
  
  { id: 'atorvastatin', name: 'Atorvastatin', type: 'prescription', category: 'Cholesterol', rxcui: '617312' },
  { id: 'atorvastatin-lipitor', name: 'Lipitor', type: 'prescription', category: 'Cholesterol', rxcui: '617312' },
  
  { id: 'amlodipine', name: 'Amlodipine', type: 'prescription', category: 'Blood Pressure', rxcui: '17767' },
  { id: 'amlodipine-norvasc', name: 'Norvasc', type: 'prescription', category: 'Blood Pressure', rxcui: '17767' },
  
  { id: 'omeprazole', name: 'Omeprazole', type: 'prescription', category: 'Stomach', rxcui: '7647' },
  { id: 'omeprazole-prilosec', name: 'Prilosec', type: 'prescription', category: 'Stomach', rxcui: '7647' },
  
  { id: 'metoprolol', name: 'Metoprolol', type: 'prescription', category: 'Heart', rxcui: '6918' },
  { id: 'metoprolol-lopressor', name: 'Lopressor', type: 'prescription', category: 'Heart', rxcui: '6918' },
  { id: 'metoprolol-toprol', name: 'Toprol XL', type: 'prescription', category: 'Heart', rxcui: '6918' },
  
  { id: 'losartan', name: 'Losartan', type: 'prescription', category: 'Blood Pressure', rxcui: '314076' },
  { id: 'losartan-cozaar', name: 'Cozaar', type: 'prescription', category: 'Blood Pressure', rxcui: '314076' },
  
  { id: 'simvastatin', name: 'Simvastatin', type: 'prescription', category: 'Cholesterol', rxcui: '36567' },
  { id: 'simvastatin-zocor', name: 'Zocor', type: 'prescription', category: 'Cholesterol', rxcui: '36567' },
  
  { id: 'hydrochlorothiazide', name: 'Hydrochlorothiazide', type: 'prescription', category: 'Blood Pressure', rxcui: '5487' },
  { id: 'hydrochlorothiazide-hctz', name: 'HCTZ', type: 'prescription', category: 'Blood Pressure', rxcui: '5487' },
  
  { id: 'sertraline', name: 'Sertraline', type: 'prescription', category: 'Mental Health', rxcui: '106635' },
  { id: 'sertraline-zoloft', name: 'Zoloft', type: 'prescription', category: 'Mental Health', rxcui: '106635' },
  
  { id: 'tramadol', name: 'Tramadol', type: 'prescription', category: 'Pain Relief', rxcui: '106635' },
  { id: 'tramadol-ultram', name: 'Ultram', type: 'prescription', category: 'Pain Relief', rxcui: '106635' },
  
  { id: 'gabapentin', name: 'Gabapentin', type: 'prescription', category: 'Nerve Pain', rxcui: '106635' },
  { id: 'gabapentin-neurontin', name: 'Neurontin', type: 'prescription', category: 'Nerve Pain', rxcui: '106635' },
  
  { id: 'furosemide', name: 'Furosemide', type: 'prescription', category: 'Heart', rxcui: '106635' },
  { id: 'furosemide-lasix', name: 'Lasix', type: 'prescription', category: 'Heart', rxcui: '106635' },
  
  { id: 'warfarin', name: 'Warfarin', type: 'prescription', category: 'Blood Thinner', rxcui: '106635' },
  { id: 'warfarin-coumadin', name: 'Coumadin', type: 'prescription', category: 'Blood Thinner', rxcui: '106635' },
  
  { id: 'clopidogrel', name: 'Clopidogrel', type: 'prescription', category: 'Blood Thinner', rxcui: '106635' },
  { id: 'clopidogrel-plavix', name: 'Plavix', type: 'prescription', category: 'Blood Thinner', rxcui: '106635' },
  
  { id: 'prednisone', name: 'Prednisone', type: 'prescription', category: 'Steroid', rxcui: '106635' },
  { id: 'prednisone-deltasone', name: 'Deltasone', type: 'prescription', category: 'Steroid', rxcui: '106635' },
  
  { id: 'albuterol', name: 'Albuterol', type: 'prescription', category: 'Asthma', rxcui: '106635' },
  { id: 'albuterol-ventolin', name: 'Ventolin', type: 'prescription', category: 'Asthma', rxcui: '106635' },
  { id: 'albuterol-proair', name: 'ProAir', type: 'prescription', category: 'Asthma', rxcui: '106635' },
  
  { id: 'levothyroxine', name: 'Levothyroxine', type: 'prescription', category: 'Thyroid', rxcui: '106635' },
  { id: 'levothyroxine-synthroid', name: 'Synthroid', type: 'prescription', category: 'Thyroid', rxcui: '106635' },
  { id: 'levothyroxine-levoxyl', name: 'Levoxyl', type: 'prescription', category: 'Thyroid', rxcui: '106635' },
  
  { id: 'citalopram', name: 'Citalopram', type: 'prescription', category: 'Mental Health', rxcui: '106635' },
  { id: 'citalopram-celexa', name: 'Celexa', type: 'prescription', category: 'Mental Health', rxcui: '106635' },
  
  { id: 'trazodone', name: 'Trazodone', type: 'prescription', category: 'Sleep', rxcui: '106635' },
  { id: 'trazodone-desyrel', name: 'Desyrel', type: 'prescription', category: 'Sleep', rxcui: '106635' },
  
  // OTC medications with brand names
  { id: 'ibuprofen', name: 'Ibuprofen', type: 'otc', category: 'Pain Relief' },
  { id: 'ibuprofen-advil', name: 'Advil', type: 'otc', category: 'Pain Relief' },
  { id: 'ibuprofen-motrin', name: 'Motrin', type: 'otc', category: 'Pain Relief' },
  { id: 'ibuprofen-nurofen', name: 'Nurofen', type: 'otc', category: 'Pain Relief' },
  
  { id: 'acetaminophen', name: 'Acetaminophen', type: 'otc', category: 'Pain Relief' },
  { id: 'acetaminophen-tylenol', name: 'Tylenol', type: 'otc', category: 'Pain Relief' },
  { id: 'acetaminophen-panadol', name: 'Panadol', type: 'otc', category: 'Pain Relief' },
  
  { id: 'aspirin', name: 'Aspirin', type: 'otc', category: 'Pain Relief' },
  { id: 'aspirin-bayer', name: 'Bayer Aspirin', type: 'otc', category: 'Pain Relief' },
  
  { id: 'aceclofenac', name: 'Aceclofenac', type: 'prescription', category: 'Pain Relief' },
  { id: 'acemetacin', name: 'Acemetacin', type: 'prescription', category: 'Pain Relief' },
  { id: 'aldeseleukin', name: 'Aldesleukin', type: 'prescription', category: 'Cancer Treatment' },
  { id: 'alfentanil', name: 'Alfentanil', type: 'prescription', category: 'Pain Relief' },
  { id: 'amiodarone', name: 'Amiodarone', type: 'prescription', category: 'Heart' },
  { id: 'amtolmetin-guacil', name: 'Amtolmetin Guacil', type: 'prescription', category: 'Pain Relief' },
  { id: 'asparaginase', name: 'Asparaginase', type: 'prescription', category: 'Cancer Treatment' },
  { id: 'atogepant', name: 'Atogepant', type: 'prescription', category: 'Migraine' },
  { id: 'balofloxacin', name: 'Balofloxacin', type: 'prescription', category: 'Antibiotic' },
  { id: 'bemiparin', name: 'Bemiparin', type: 'prescription', category: 'Blood Thinner' },
  { id: 'benzhydrocodone', name: 'Benzhydrocodone', type: 'prescription', category: 'Pain Relief' },
  { id: 'besifloxacin', name: 'Besifloxacin', type: 'prescription', category: 'Antibiotic' },
  { id: 'bromfenac', name: 'Bromfenac', type: 'prescription', category: 'Pain Relief' },
  { id: 'bufexamac', name: 'Bufexamac', type: 'prescription', category: 'Pain Relief' },
  { id: 'buprenorphine', name: 'Buprenorphine', type: 'prescription', category: 'Pain Relief' },
  { id: 'bupropion', name: 'Bupropion', type: 'prescription', category: 'Mental Health' },
  { id: 'carbamazepine', name: 'Carbamazepine', type: 'prescription', category: 'Seizure' },
  { id: 'cariprazine', name: 'Cariprazine', type: 'prescription', category: 'Mental Health' },
  { id: 'celecoxib', name: 'Celecoxib', type: 'prescription', category: 'Pain Relief' },
  { id: 'ceritinib', name: 'Ceritinib', type: 'prescription', category: 'Cancer Treatment' },
  { id: 'choline-salicylate', name: 'Choline Salicylate', type: 'prescription', category: 'Pain Relief' },
  { id: 'ciprofloxacin', name: 'Ciprofloxacin', type: 'prescription', category: 'Antibiotic' },
  { id: 'clonixin', name: 'Clonixin', type: 'prescription', category: 'Pain Relief' },
  { id: 'codeine', name: 'Codeine', type: 'prescription', category: 'Pain Relief' },
  { id: 'cosyntropin', name: 'Cosyntropin', type: 'prescription', category: 'Hormone' },
  { id: 'daclatasvir', name: 'Daclatasvir', type: 'prescription', category: 'Hepatitis C' },
  { id: 'darunavir', name: 'Darunavir', type: 'prescription', category: 'HIV' },
  { id: 'desogestrel', name: 'Desogestrel', type: 'prescription', category: 'Birth Control' },
  { id: 'dexibuprofen', name: 'Dexibuprofen', type: 'prescription', category: 'Pain Relief' },
  { id: 'dexketoprofen', name: 'Dexketoprofen', type: 'prescription', category: 'Pain Relief' },
  { id: 'diclofenac', name: 'Diclofenac', type: 'prescription', category: 'Pain Relief' },
  { id: 'dienogest', name: 'Dienogest', type: 'prescription', category: 'Birth Control' },
  { id: 'diflunisal', name: 'Diflunisal', type: 'prescription', category: 'Pain Relief' },
  { id: 'dihydrocodeine', name: 'Dihydrocodeine', type: 'prescription', category: 'Pain Relief' },
  { id: 'diltiazem', name: 'Diltiazem', type: 'prescription', category: 'Heart' },
  { id: 'dipyrone', name: 'Dipyrone', type: 'prescription', category: 'Pain Relief' },
  { id: 'dronedarone', name: 'Dronedarone', type: 'prescription', category: 'Heart' },
  { id: 'drospirenone', name: 'Drospirenone', type: 'prescription', category: 'Birth Control' },
  
  { id: 'aspirin', name: 'Aspirin', type: 'otc', category: 'Pain Relief' },
  { id: 'aspirin-bayer', name: 'Bayer Aspirin', type: 'otc', category: 'Pain Relief' },
  { id: 'aspirin-ecotrin', name: 'Ecotrin', type: 'otc', category: 'Pain Relief' },
  
  { id: 'naproxen', name: 'Naproxen', type: 'otc', category: 'Pain Relief' },
  { id: 'naproxen-aleve', name: 'Aleve', type: 'otc', category: 'Pain Relief' },
  { id: 'naproxen-naprosyn', name: 'Naprosyn', type: 'otc', category: 'Pain Relief' },
  
  { id: 'diphenhydramine', name: 'Diphenhydramine', type: 'otc', category: 'Allergy' },
  { id: 'diphenhydramine-benadryl', name: 'Benadryl', type: 'otc', category: 'Allergy' },
  { id: 'diphenhydramine-sominex', name: 'Sominex', type: 'otc', category: 'Allergy' },
  
  { id: 'loratadine', name: 'Loratadine', type: 'otc', category: 'Allergy' },
  { id: 'loratadine-claritin', name: 'Claritin', type: 'otc', category: 'Allergy' },
  { id: 'loratadine-claratyne', name: 'Claratyne', type: 'otc', category: 'Allergy' },
  
  { id: 'cetirizine', name: 'Cetirizine', type: 'otc', category: 'Allergy' },
  { id: 'cetirizine-zyrtec', name: 'Zyrtec', type: 'otc', category: 'Allergy' },
  
  { id: 'fexofenadine', name: 'Fexofenadine', type: 'otc', category: 'Allergy' },
  { id: 'fexofenadine-allegra', name: 'Allegra', type: 'otc', category: 'Allergy' },
  
  { id: 'pseudoephedrine', name: 'Pseudoephedrine', type: 'otc', category: 'Cold Relief' },
  { id: 'pseudoephedrine-sudafed', name: 'Sudafed', type: 'otc', category: 'Cold Relief' },
  
  { id: 'dextromethorphan', name: 'Dextromethorphan', type: 'otc', category: 'Cough' },
  { id: 'dextromethorphan-robitussin', name: 'Robitussin', type: 'otc', category: 'Cough' },
  { id: 'dextromethorphan-delsym', name: 'Delsym', type: 'otc', category: 'Cough' },
  
  { id: 'guaifenesin', name: 'Guaifenesin', type: 'otc', category: 'Cough' },
  { id: 'guaifenesin-mucinex', name: 'Mucinex', type: 'otc', category: 'Cough' },
  
  { id: 'ranitidine', name: 'Ranitidine', type: 'otc', category: 'Stomach' },
  { id: 'ranitidine-zantac', name: 'Zantac', type: 'otc', category: 'Stomach' },
  
  { id: 'famotidine', name: 'Famotidine', type: 'otc', category: 'Stomach' },
  { id: 'famotidine-pepcid', name: 'Pepcid', type: 'otc', category: 'Stomach' },
  
  { id: 'calcium-carbonate', name: 'Calcium Carbonate', type: 'otc', category: 'Antacid' },
  { id: 'calcium-carbonate-tums', name: 'Tums', type: 'otc', category: 'Antacid' },
  { id: 'calcium-carbonate-rolaids', name: 'Rolaids', type: 'otc', category: 'Antacid' },
  
  { id: 'magnesium-hydroxide', name: 'Magnesium Hydroxide', type: 'otc', category: 'Antacid' },
  { id: 'magnesium-hydroxide-milk-magnesia', name: 'Milk of Magnesia', type: 'otc', category: 'Antacid' },
  
  // Additional popular OTC medications
  { id: 'omeprazole-otc', name: 'Prilosec OTC', type: 'otc', category: 'Stomach' },
  { id: 'lansoprazole-otc', name: 'Prevacid 24HR', type: 'otc', category: 'Stomach' },
  { id: 'esomeprazole-otc', name: 'Nexium 24HR', type: 'otc', category: 'Stomach' },
  
  { id: 'doxylamine', name: 'Doxylamine', type: 'otc', category: 'Sleep' },
  { id: 'doxylamine-unisom', name: 'Unisom', type: 'otc', category: 'Sleep' },
  
  { id: 'melatonin', name: 'Melatonin', type: 'otc', category: 'Sleep' },
  { id: 'melatonin-nature-made', name: 'Nature Made Melatonin', type: 'otc', category: 'Sleep' },
  
  { id: 'diphenhydramine-nyquil', name: 'NyQuil', type: 'otc', category: 'Cold Relief' },
  { id: 'acetaminophen-dayquil', name: 'DayQuil', type: 'otc', category: 'Cold Relief' },
  { id: 'acetaminophen-theraflu', name: 'Theraflu', type: 'otc', category: 'Cold Relief' },
  
  { id: 'ibuprofen-midol', name: 'Midol', type: 'otc', category: 'Pain Relief' },
  { id: 'acetaminophen-excedrin', name: 'Excedrin', type: 'otc', category: 'Pain Relief' },
  { id: 'acetaminophen-tylenol-pm', name: 'Tylenol PM', type: 'otc', category: 'Pain Relief' },
  
  // Supplements
  { id: 'vitamin-d', name: 'Vitamin D', type: 'supplement', category: 'Vitamin' },
  { id: 'vitamin-b12', name: 'Vitamin B12', type: 'supplement', category: 'Vitamin' },
  { id: 'vitamin-c', name: 'Vitamin C', type: 'supplement', category: 'Vitamin' },
  { id: 'vitamin-b6', name: 'Vitamin B6', type: 'supplement', category: 'Vitamin' },
  { id: 'folate', name: 'Folate', type: 'supplement', category: 'Vitamin' },
  { id: 'folic-acid', name: 'Folic Acid', type: 'supplement', category: 'Vitamin' },
  { id: 'iron', name: 'Iron', type: 'supplement', category: 'Mineral' },
  { id: 'calcium', name: 'Calcium', type: 'supplement', category: 'Mineral' },
  { id: 'magnesium', name: 'Magnesium', type: 'supplement', category: 'Mineral' },
  { id: 'zinc', name: 'Zinc', type: 'supplement', category: 'Mineral' },
  { id: 'potassium', name: 'Potassium', type: 'supplement', category: 'Mineral' },
  { id: 'omega-3', name: 'Omega-3', type: 'supplement', category: 'Fatty Acid' },
  { id: 'fish-oil', name: 'Fish Oil', type: 'supplement', category: 'Fatty Acid' },
  { id: 'probiotics', name: 'Probiotics', type: 'supplement', category: 'Digestive' },
  { id: 'coq10', name: 'CoQ10', type: 'supplement', category: 'Antioxidant' },
  { id: 'melatonin', name: 'Melatonin', type: 'supplement', category: 'Sleep' },
  { id: 'ginkgo-biloba', name: 'Ginkgo Biloba', type: 'supplement', category: 'Herbal' },
  { id: 'ginseng', name: 'Ginseng', type: 'supplement', category: 'Herbal' },
  { id: 'echinacea', name: 'Echinacea', type: 'supplement', category: 'Herbal' },
  { id: 'st-johns-wort', name: 'St. John\'s Wort', type: 'supplement', category: 'Herbal' },
  { id: 'turmeric', name: 'Turmeric', type: 'supplement', category: 'Herbal' },
  { id: 'ginger', name: 'Ginger', type: 'supplement', category: 'Herbal' },
  { id: 'garlic', name: 'Garlic', type: 'supplement', category: 'Herbal' },
  { id: 'green-tea-extract', name: 'Green Tea Extract', type: 'supplement', category: 'Herbal' },
  { id: 'multivitamin', name: 'Multivitamin', type: 'supplement', category: 'Vitamin' },
]

export function DrugSearch({ drugs, onDrugsChange, onSearch, onNewSearch, isLoading = false }: DrugSearchProps) {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Get search suggestions
  const getSuggestions = (query: string): SearchSuggestion[] => {
    if (query.length < 2) return []
    
    const normalizedQuery = query.toLowerCase()
    const results: SearchSuggestion[] = []
    
    DRUG_DATABASE.forEach(drug => {
      // Skip if already added
      if (drugs.some(existing => existing.id === drug.id)) return
      
      const nameMatch = drug.name.toLowerCase().includes(normalizedQuery)
      const categoryMatch = drug.category.toLowerCase().includes(normalizedQuery)
      
      if (nameMatch || categoryMatch) {
        let matchType: 'exact' | 'partial' | 'brand' | 'generic' = 'partial'
        let confidence = 0.5
        
        if (drug.name.toLowerCase() === normalizedQuery) {
          matchType = 'exact'
          confidence = 1.0
        } else if (drug.name.toLowerCase().startsWith(normalizedQuery)) {
          matchType = 'partial'
          confidence = 0.8
        } else if (nameMatch) {
          matchType = 'partial'
          confidence = 0.6
        } else if (categoryMatch) {
          confidence = 0.4
        }
        
        results.push({
          drug,
          matchType,
          confidence
        })
      }
    })
    
    return results
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 8)
  }

  // Debounced search
  const debouncedSearch = debounce((query: string) => {
    const newSuggestions = getSuggestions(query)
    setSuggestions(newSuggestions)
    setShowSuggestions(newSuggestions.length > 0)
    setSelectedIndex(-1)
  }, 300)

  const handleInputChange = (value: string) => {
    setInputValue(value)
    debouncedSearch(value)
  }

  const addDrug = (drug: Drug) => {
    if (drugs.some(existing => existing.id === drug.id)) return
    
    onDrugsChange([...drugs, drug])
    setInputValue('')
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  const removeDrug = (id: string) => {
    onDrugsChange(drugs.filter(drug => drug.id !== id))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        addDrug(suggestions[selectedIndex].drug)
      } else if (inputValue.trim()) {
        // Add custom drug
        const customDrug: Drug = {
          id: generateId(inputValue),
          name: normalizeDrugName(inputValue),
          type: 'prescription', // Default, user can change later
          category: 'Unknown'
        }
        addDrug(customDrug)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prescription':
        return <Pill className="h-4 w-4 text-blue-500" />
      case 'otc':
        return <AlertCircle className="h-4 w-4 text-green-500" />
      case 'supplement':
        return <Pill className="h-4 w-4 text-purple-500" />
      default:
        return <Pill className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'prescription':
        return 'Rx'
      case 'otc':
        return 'OTC'
      case 'supplement':
        return 'Supplement'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-6">
        {/* Logo */}
        <div 
          className="flex items-center justify-center space-x-3 cursor-pointer group"
          onClick={() => onNewSearch?.()}
          title="Click to start a new search"
        >
          {/* Main Logo Icon */}
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Pill className="w-8 h-8 text-white" />
            </div>
            {/* Safety Shield Overlay */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
              <Shield className="w-3 h-3 text-white" />
            </div>
          </div>
          
          {/* Logo Text */}
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300">
              DrugReactor
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Check drug interactions and get personalized supplement guidance
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <span className="text-lg">💊</span>
            <span>Type to enter</span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="space-y-4">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type to search medications and supplements..."
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-14 text-lg pl-12 pr-4"
              disabled={isLoading}
            />
          </div>
          
          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.drug.id}-${index}`}
                  className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                    index === selectedIndex ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => addDrug(suggestion.drug)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(suggestion.drug.type)}
                      <span className="font-medium text-gray-900">{suggestion.drug.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(suggestion.drug.type)}
                      </Badge>
                      <span className="text-xs text-gray-500">{suggestion.drug.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>

      {/* Selected Drugs */}
      {drugs.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">Your Medications & Supplements:</h3>
          <div className="flex flex-wrap gap-2">
            {drugs.map((drug) => (
              <Badge
                key={drug.id}
                variant="secondary"
                className="px-4 py-2 text-sm flex items-center gap-2"
              >
                {getTypeIcon(drug.type)}
                <span>{drug.name}</span>
                <Badge variant="outline" className="text-xs">
                  {getTypeLabel(drug.type)}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeDrug(drug.id)}
                  disabled={isLoading}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Status Message */}
      <div className="text-center">
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Analyzing medications...</span>
          </div>
        )}
        {!isLoading && drugs.length === 0 && (
          <p className="text-sm text-gray-500">
            Add a medication to get started - information will appear automatically
          </p>
        )}
        {!isLoading && drugs.length === 1 && (
          <p className="text-sm text-gray-500">
            Add another medication to check for interactions
          </p>
        )}
        {!isLoading && drugs.length >= 2 && (
          <p className="text-sm text-gray-500">
            Checking for interactions between your medications
          </p>
        )}
      </div>
    </div>
  )
}
