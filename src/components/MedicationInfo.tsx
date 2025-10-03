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
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Pill className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-bold">{drug.name} Information</span>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className="bg-white/20 text-white border-white/30">
                {info.category}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                {drug.type === 'prescription' ? 'Prescription' : drug.type === 'otc' ? 'OTC' : 'Supplement'}
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Description */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Info className="h-4 w-4 text-blue-600" />
            </div>
            What is {drug.name}?
          </h4>
          <p className="text-gray-700 leading-relaxed text-lg">{info.description}</p>
        </div>

        {/* Uses */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-green-600 text-lg">✓</span>
            </div>
            Common Uses
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {info.uses.map((use: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">{use}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side Effects */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-orange-600 text-lg">⚠</span>
            </div>
            Common Side Effects
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {info.commonSideEffects.map((effect: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">{effect}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-900 mb-4">Important Notes</h4>
              <div className="space-y-3">
                {info.importantNotes.map((note: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-800 font-medium">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-yellow-900 mb-2">Important Disclaimer</h4>
              <p className="text-yellow-800 leading-relaxed">
                This information is for educational purposes only. Always consult your healthcare provider for medical advice, diagnosis, or treatment. Do not stop or change your medication without consulting your doctor.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

