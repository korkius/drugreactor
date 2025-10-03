'use client'

import { Drug } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pill, AlertCircle, Info } from 'lucide-react'

interface MedicationInfoProps {
  drug: Drug
}

const getMedicationInfo = (drug: Drug) => {
  const info: { [key: string]: any } = {
    'metformin': {
      description: 'Metformin is an oral diabetes medicine that helps control blood sugar levels. It works by improving your body\'s response to insulin and reducing the amount of sugar your liver makes.',
      uses: ['Type 2 diabetes', 'Blood sugar control', 'PCOS (Polycystic Ovary Syndrome)'],
      commonSideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Metallic taste'],
      importantNotes: ['Take with food to reduce stomach upset', 'Regular blood sugar monitoring needed', 'May cause B12 deficiency with long-term use'],
      category: 'Diabetes Medication'
    },
    'aspirin': {
      description: 'Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. It also has blood-thinning properties.',
      uses: ['Pain relief', 'Fever reduction', 'Heart attack prevention', 'Stroke prevention'],
      commonSideEffects: ['Stomach irritation', 'Nausea', 'Heartburn', 'Easy bruising'],
      importantNotes: ['Take with food to protect stomach', 'Avoid alcohol', 'Check with doctor before surgery', 'Can increase bleeding risk'],
      category: 'Pain Relief & Anti-inflammatory'
    },
    'carbamazepine': {
      description: 'Carbamazepine is an anticonvulsant medication used to treat seizures and nerve pain. It works by stabilizing electrical activity in the brain.',
      uses: ['Epilepsy', 'Seizure control', 'Trigeminal neuralgia', 'Bipolar disorder'],
      commonSideEffects: ['Dizziness', 'Drowsiness', 'Nausea', 'Blurred vision'],
      importantNotes: ['Regular blood tests needed', 'Avoid grapefruit juice', 'May cause serious skin reactions', 'Take consistently at same times'],
      category: 'Anticonvulsant'
    },
    'ciprofloxacin': {
      description: 'Ciprofloxacin is a fluoroquinolone antibiotic used to treat various bacterial infections. It works by stopping bacterial growth.',
      uses: ['Bacterial infections', 'UTI treatment', 'Respiratory infections', 'Skin infections'],
      commonSideEffects: ['Nausea', 'Diarrhea', 'Dizziness', 'Headache'],
      importantNotes: ['Take with plenty of water', 'Avoid dairy products 2 hours before/after', 'Complete full course', 'May cause tendon problems'],
      category: 'Antibiotic'
    },
    'diclofenac': {
      description: 'Diclofenac is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain, inflammation, and arthritis. It reduces substances that cause pain and inflammation.',
      uses: ['Arthritis pain', 'Muscle pain', 'Inflammation reduction', 'Post-surgical pain'],
      commonSideEffects: ['Stomach upset', 'Nausea', 'Headache', 'Dizziness'],
      importantNotes: ['Take with food', 'May increase heart attack risk', 'Avoid alcohol', 'Monitor for stomach bleeding'],
      category: 'NSAID Pain Reliever'
    },
    'amlodipine': {
      description: 'Amlodipine is a calcium channel blocker used to treat high blood pressure and chest pain. It relaxes blood vessels and improves blood flow.',
      uses: ['High blood pressure', 'Angina (chest pain)', 'Heart disease prevention'],
      commonSideEffects: ['Swelling in ankles/feet', 'Dizziness', 'Flushing', 'Headache'],
      importantNotes: ['Take at same time daily', 'May take 2-4 weeks for full effect', 'Avoid grapefruit juice', 'Monitor blood pressure regularly'],
      category: 'Blood Pressure Medication'
    },
    'warfarin': {
      description: 'Warfarin is an anticoagulant (blood thinner) used to prevent blood clots. It works by blocking vitamin K-dependent clotting factors.',
      uses: ['Blood clot prevention', 'Atrial fibrillation', 'Heart valve replacement', 'Deep vein thrombosis'],
      commonSideEffects: ['Easy bruising', 'Bleeding gums', 'Heavy menstrual periods', 'Blood in urine/stool'],
      importantNotes: ['Regular INR blood tests required', 'Consistent vitamin K intake', 'Avoid alcohol', 'Carry medical alert card'],
      category: 'Blood Thinner'
    },
    'ibuprofen': {
      description: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. It blocks the production of certain chemicals in the body.',
      uses: ['Pain relief', 'Fever reduction', 'Inflammation reduction', 'Arthritis pain'],
      commonSideEffects: ['Stomach upset', 'Nausea', 'Heartburn', 'Dizziness'],
      importantNotes: ['Take with food', 'Avoid alcohol', 'May increase bleeding risk', 'Don\'t take longer than 10 days without doctor approval'],
      category: 'NSAID Pain Reliever'
    },
    'acetaminophen': {
      description: 'Acetaminophen is a pain reliever and fever reducer. It works by changing the way the body senses pain and by cooling the body.',
      uses: ['Pain relief', 'Fever reduction', 'Headache relief', 'Muscle aches'],
      commonSideEffects: ['Rare when taken as directed'],
      importantNotes: ['Don\'t exceed 4,000mg per day', 'Check other medications for acetaminophen', 'Avoid alcohol', 'May cause liver damage if overdosed'],
      category: 'Pain Reliever & Fever Reducer'
    }
  }

  return info[drug.id] || {
    description: `${drug.name} is a ${drug.category.toLowerCase()} medication.`,
    uses: ['Consult your healthcare provider for specific uses'],
    commonSideEffects: ['Consult your healthcare provider for side effects'],
    importantNotes: ['Always follow your doctor\'s instructions', 'Read the medication label carefully'],
    category: drug.category
  }
}

export function MedicationInfo({ drug }: MedicationInfoProps) {
  const info = getMedicationInfo(drug)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Pill className="h-5 w-5 text-blue-600" />
          <span>{drug.name} Information</span>
          <Badge variant="secondary" className="ml-auto">
            {info.category}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">What is {drug.name}?</h4>
          <p className="text-gray-700 leading-relaxed">{info.description}</p>
        </div>

        {/* Uses */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Common Uses</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {info.uses.map((use: string, index: number) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>

        {/* Side Effects */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Common Side Effects</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {info.commonSideEffects.map((effect: string, index: number) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Important Notes</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                {info.importantNotes.map((note: string, index: number) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">Important Disclaimer</h4>
              <p className="text-yellow-800 text-sm">
                This information is for educational purposes only. Always consult your healthcare provider for medical advice, diagnosis, or treatment. Do not stop or change your medication without consulting your doctor.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

