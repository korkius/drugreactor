'use client'

import { Card, CardContent } from '@/components/ui/card'
import { RiskBadge } from '@/components/RiskBadge'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { DrugInteraction } from '@/types'
import { CheckCircle, ExternalLink } from 'lucide-react'

// Function to get proper URLs for sources
const getSourceUrl = (source: string): string => {
  const sourceUrls: { [key: string]: string } = {
    'RxNav (NIH)': 'https://rxnav.nlm.nih.gov/',
    'FDA Drug Interactions': 'https://www.fda.gov/drugs/drug-interactions-labeling/',
    'American Heart Association': 'https://www.heart.org/',
    'NIH ODS': 'https://ods.od.nih.gov/',
    'MedlinePlus': 'https://medlineplus.gov/',
    'WebMD': 'https://www.webmd.com/',
    'Mayo Clinic': 'https://www.mayoclinic.org/',
    'Drugs.com': 'https://www.drugs.com/',
    'PubMed': 'https://pubmed.ncbi.nlm.nih.gov/',
    'Clinical Pharmacology': 'https://www.clinicalpharmacology.com/',
    'Lexicomp': 'https://online.lexi.com/',
    'Epocrates': 'https://www.epocrates.com/',
    'UpToDate': 'https://www.uptodate.com/',
    'Micromedex': 'https://www.micromedexsolutions.com/',
    'Natural Medicines': 'https://naturalmedicines.therapeuticresearch.com/',
    'ConsumerLab': 'https://www.consumerlab.com/',
    'Examine.com': 'https://examine.com/',
    'Cochrane Reviews': 'https://www.cochranelibrary.com/',
    'BMJ Best Practice': 'https://bestpractice.bmj.com/',
    'Clinical Evidence': 'https://www.clinicalevidence.com/'
  }
  
  return sourceUrls[source] || 'https://www.google.com/search?q=' + encodeURIComponent(source + ' drug interactions')
}

interface InteractionsTableProps {
  interactions: DrugInteraction[]
}

export function InteractionsTable({ interactions }: InteractionsTableProps) {
  if (interactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            No Interactions Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Great news! No significant interactions were found between your medications and supplements.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {interactions.map((interaction) => (
            <div
              key={interaction.id}
              className="border rounded-lg p-6 space-y-4"
            >
              {/* Header with drug names and risk level */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {interaction.drug1} + {interaction.drug2}
                  </h4>
                  <div className="flex items-center gap-3">
                    <RiskBadge severity={interaction.severity} size="md" />
                    <EvidenceBadge level={interaction.evidenceLevel} />
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">What this means:</h5>
                  <p className="text-gray-700">{interaction.description}</p>
                </div>
                
                {/* Clinical Effect */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Clinical Effect:</h5>
                  <p className="text-blue-800">{interaction.clinicalEffect}</p>
                </div>
                
                {/* Management */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-medium text-yellow-900 mb-2">What you can do:</h5>
                  <p className="text-yellow-800">{interaction.management}</p>
                </div>
                
                {/* Sources */}
                {interaction.sources.length > 0 && (
                  <div className="pt-2">
                    <h5 className="font-medium text-gray-900 mb-2">Trusted Sources:</h5>
                    <div className="flex flex-wrap gap-2">
                      {interaction.sources.map((source, index) => (
                        <a
                          key={index}
                          href={getSourceUrl(source)}
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                          rel="nofollow noopener"
                          target="_blank"
                          title={`Visit ${source} for more information`}
                        >
                          {source}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Click any source to learn more about this interaction from trusted medical databases.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
