'use client'

import { useState } from 'react'
import { Drug } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pill, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react'

interface MedicationInfoProps {
  drug: Drug
}

const getMedicationInfo = (drug: Drug) => {
  const info: { [key: string]: any } = {
    'metformin': {
      description: 'Metformin is an oral diabetes medicine that helps control blood sugar levels. It works by improving your body\'s response to insulin and reducing the amount of sugar your liver makes.',
      uses: ['Type 2 diabetes', 'Blood sugar control', 'PCOS (Polycystic Ovary Syndrome)', 'Prediabetes management', 'Weight management'],
      commonSideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Metallic taste', 'Loss of appetite', 'Gas'],
      importantNotes: ['Take with food to reduce stomach upset', 'Regular blood sugar monitoring needed', 'May cause B12 deficiency with long-term use', 'Avoid alcohol to prevent lactic acidosis', 'Start with low dose and increase gradually'],
      dosage: '500-2000mg daily, usually taken twice daily with meals',
      timing: 'Take with breakfast and dinner',
      duration: 'Long-term use typically required',
      interactions: 'May interact with contrast dyes, alcohol, and certain heart medications',
      warnings: ['Stop before surgery or contrast dye procedures', 'Monitor kidney function', 'Watch for signs of lactic acidosis'],
      category: 'Diabetes Medication'
    },
    'aspirin': {
      description: 'Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. It also has blood-thinning properties.',
      uses: ['Pain relief', 'Fever reduction', 'Heart attack prevention', 'Stroke prevention', 'Anti-inflammatory effects', 'Rheumatoid arthritis'],
      commonSideEffects: ['Stomach irritation', 'Nausea', 'Heartburn', 'Easy bruising', 'Stomach ulcers', 'Ringing in ears'],
      importantNotes: ['Take with food to protect stomach', 'Avoid alcohol', 'Check with doctor before surgery', 'Can increase bleeding risk', 'May cause Reye\'s syndrome in children'],
      dosage: '325-650mg every 4-6 hours for pain, 81mg daily for heart protection',
      timing: 'Take with food or milk',
      duration: 'As needed for pain, daily for heart protection',
      interactions: 'May interact with blood thinners, alcohol, and other NSAIDs',
      warnings: ['Avoid in children with viral infections', 'Stop 7-10 days before surgery', 'Monitor for stomach bleeding'],
      category: 'Pain Relief & Anti-inflammatory'
    },
    'carbamazepine': {
      description: 'Carbamazepine is an anticonvulsant medication used to treat seizures and nerve pain. It works by stabilizing electrical activity in the brain.',
      uses: ['Epilepsy', 'Seizure control', 'Trigeminal neuralgia', 'Bipolar disorder', 'Nerve pain management'],
      commonSideEffects: ['Dizziness', 'Drowsiness', 'Nausea', 'Blurred vision', 'Double vision', 'Headache', 'Rash'],
      importantNotes: ['Regular blood tests needed', 'Avoid grapefruit juice', 'May cause serious skin reactions', 'Take consistently at same times', 'May affect birth control effectiveness'],
      dosage: '200-1200mg daily, usually taken 2-3 times daily',
      timing: 'Take with food to reduce stomach upset',
      duration: 'Long-term use typically required',
      interactions: 'May interact with birth control pills, warfarin, and many other medications',
      warnings: ['Serious skin reactions possible', 'Monitor blood counts regularly', 'May cause liver problems'],
      category: 'Anticonvulsant'
    },
    'ciprofloxacin': {
      description: 'Ciprofloxacin is a fluoroquinolone antibiotic used to treat various bacterial infections. It works by stopping bacterial growth.',
      uses: ['Bacterial infections', 'UTI treatment', 'Respiratory infections', 'Skin infections', 'Bone infections', 'Prostate infections'],
      commonSideEffects: ['Nausea', 'Diarrhea', 'Dizziness', 'Headache', 'Insomnia', 'Rash', 'Tendon problems'],
      importantNotes: ['Take with plenty of water', 'Avoid dairy products 2 hours before/after', 'Complete full course', 'May cause tendon problems', 'Avoid sunlight exposure'],
      dosage: '250-750mg twice daily, varies by infection type',
      timing: 'Take with or without food, but avoid dairy products',
      duration: '7-14 days typically, complete full course',
      interactions: 'May interact with antacids, iron supplements, and blood thinners',
      warnings: ['May cause tendon rupture', 'Avoid in children and pregnant women', 'Stop if tendon pain occurs', 'May cause serious heart rhythm problems'],
      category: 'Antibiotic'
    },
    'diclofenac': {
      description: 'Diclofenac is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain, inflammation, and arthritis. It reduces substances that cause pain and inflammation.',
      uses: ['Arthritis pain', 'Muscle pain', 'Inflammation reduction', 'Post-surgical pain', 'Migraine treatment', 'Menstrual cramps'],
      commonSideEffects: ['Stomach upset', 'Nausea', 'Headache', 'Dizziness', 'Stomach ulcers', 'High blood pressure', 'Heart problems'],
      importantNotes: ['Take with food', 'May increase heart attack risk', 'Avoid alcohol', 'Monitor for stomach bleeding', 'May cause liver problems'],
      dosage: '50-150mg daily, usually taken 2-3 times daily',
      timing: 'Take with food or milk',
      duration: 'Short-term use recommended',
      interactions: 'May interact with blood thinners, blood pressure medications, and other NSAIDs',
      warnings: ['May increase heart attack and stroke risk', 'Avoid if you have heart disease', 'Stop before surgery', 'Monitor for stomach bleeding'],
      category: 'NSAID Pain Reliever'
    },
    'amlodipine': {
      description: 'Amlodipine is a calcium channel blocker used to treat high blood pressure and chest pain. It relaxes blood vessels and improves blood flow.',
      uses: ['High blood pressure', 'Angina (chest pain)', 'Heart disease prevention', 'Coronary artery disease', 'Heart failure'],
      commonSideEffects: ['Swelling in ankles/feet', 'Dizziness', 'Flushing', 'Headache', 'Fatigue', 'Nausea'],
      importantNotes: ['Take at same time daily', 'May take 2-4 weeks for full effect', 'Avoid grapefruit juice', 'Monitor blood pressure regularly', 'May cause gum swelling'],
      dosage: '2.5-10mg once daily',
      timing: 'Take at the same time each day',
      duration: 'Long-term use typically required',
      interactions: 'May interact with grapefruit juice, other blood pressure medications, and certain antibiotics',
      warnings: ['May cause severe low blood pressure', 'Monitor for heart failure symptoms', 'Avoid grapefruit juice', 'May cause allergic reactions'],
      category: 'Blood Pressure Medication'
    },
    'warfarin': {
      description: 'Warfarin is an anticoagulant (blood thinner) used to prevent blood clots. It works by blocking vitamin K-dependent clotting factors.',
      uses: ['Blood clot prevention', 'Atrial fibrillation', 'Heart valve replacement', 'Deep vein thrombosis', 'Pulmonary embolism prevention', 'Stroke prevention'],
      commonSideEffects: ['Easy bruising', 'Bleeding gums', 'Heavy menstrual periods', 'Blood in urine/stool', 'Nosebleeds', 'Hair loss'],
      importantNotes: ['Regular INR blood tests required', 'Consistent vitamin K intake', 'Avoid alcohol', 'Carry medical alert card', 'Check with doctor before surgery'],
      dosage: '2-10mg daily, dose adjusted based on INR levels',
      timing: 'Take at the same time each day',
      duration: 'Long-term use typically required',
      interactions: 'Interacts with many medications including antibiotics, pain relievers, and supplements',
      warnings: ['High risk of bleeding', 'Monitor INR regularly', 'Avoid activities that may cause injury', 'Seek immediate medical attention for unusual bleeding'],
      category: 'Blood Thinner'
    },
    'ibuprofen': {
      description: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. It blocks the production of certain chemicals in the body.',
      uses: ['Pain relief', 'Fever reduction', 'Inflammation reduction', 'Arthritis pain', 'Headaches', 'Muscle aches', 'Menstrual cramps'],
      commonSideEffects: ['Stomach upset', 'Nausea', 'Heartburn', 'Dizziness', 'Stomach ulcers', 'Easy bruising', 'High blood pressure'],
      importantNotes: ['Take with food', 'Avoid alcohol', 'May increase bleeding risk', 'Don\'t take longer than 10 days without doctor approval', 'May increase heart attack risk'],
      dosage: '200-400mg every 4-6 hours as needed, maximum 3200mg daily',
      timing: 'Take with food or milk',
      duration: 'Short-term use recommended',
      interactions: 'May interact with blood thinners, blood pressure medications, and other NSAIDs',
      warnings: ['May increase heart attack and stroke risk', 'Avoid if you have heart disease', 'Stop before surgery', 'Monitor for stomach bleeding'],
      category: 'NSAID Pain Reliever'
    },
    'acetaminophen': {
      description: 'Acetaminophen is a pain reliever and fever reducer. It works by changing the way the body senses pain and by cooling the body.',
      uses: ['Pain relief', 'Fever reduction', 'Headache relief', 'Muscle aches', 'Arthritis pain', 'Back pain', 'Tooth pain'],
      commonSideEffects: ['Rare when taken as directed', 'Liver damage (with overdose)', 'Allergic reactions (rare)'],
      importantNotes: ['Don\'t exceed 4,000mg per day', 'Check other medications for acetaminophen', 'Avoid alcohol', 'May cause liver damage if overdosed', 'Safe for children when dosed correctly'],
      dosage: '325-650mg every 4-6 hours, maximum 4,000mg daily',
      timing: 'Take with or without food',
      duration: 'As needed for pain or fever',
      interactions: 'May interact with alcohol, blood thinners, and other medications containing acetaminophen',
      warnings: ['Overdose can cause liver failure', 'Avoid alcohol while taking', 'Check all medications for acetaminophen content', 'Seek immediate help if overdose suspected'],
      category: 'Pain Reliever & Fever Reducer'
    },
    'losartan': {
      description: 'Losartan is an angiotensin II receptor blocker (ARB) used to treat high blood pressure and protect the kidneys in people with diabetes. It works by relaxing blood vessels.',
      uses: ['High blood pressure', 'Kidney protection in diabetes', 'Heart failure', 'Stroke prevention', 'Heart attack prevention'],
      commonSideEffects: ['Dizziness', 'Fatigue', 'Cough', 'Low blood pressure', 'Muscle cramps', 'Back pain'],
      importantNotes: ['Take at same time daily', 'May take 2-4 weeks for full effect', 'Monitor blood pressure regularly', 'May cause dizziness when standing up'],
      dosage: '25-100mg once daily',
      timing: 'Take at the same time each day',
      duration: 'Long-term use typically required',
      interactions: 'May interact with potassium supplements, other blood pressure medications, and NSAIDs',
      warnings: ['May cause severe low blood pressure', 'Monitor kidney function', 'Avoid potassium supplements', 'May cause birth defects if taken during pregnancy'],
      category: 'Blood Pressure Medication'
    },
    'cozaar': {
      description: 'Cozaar (Losartan) is an angiotensin II receptor blocker (ARB) used to treat high blood pressure and protect the kidneys in people with diabetes. It works by relaxing blood vessels.',
      uses: ['High blood pressure', 'Kidney protection in diabetes', 'Heart failure', 'Stroke prevention', 'Heart attack prevention'],
      commonSideEffects: ['Dizziness', 'Fatigue', 'Cough', 'Low blood pressure', 'Muscle cramps', 'Back pain'],
      importantNotes: ['Take at same time daily', 'May take 2-4 weeks for full effect', 'Monitor blood pressure regularly', 'May cause dizziness when standing up'],
      dosage: '25-100mg once daily',
      timing: 'Take at the same time each day',
      duration: 'Long-term use typically required',
      interactions: 'May interact with potassium supplements, other blood pressure medications, and NSAIDs',
      warnings: ['May cause severe low blood pressure', 'Monitor kidney function', 'Avoid potassium supplements', 'May cause birth defects if taken during pregnancy'],
      category: 'Blood Pressure Medication'
    },
    'atorvastatin': {
      description: 'Atorvastatin is a statin medication used to lower cholesterol and reduce the risk of heart disease. It works by blocking an enzyme that makes cholesterol in the liver.',
      uses: ['High cholesterol', 'Heart disease prevention', 'Stroke prevention', 'Heart attack prevention', 'Atherosclerosis treatment'],
      commonSideEffects: ['Muscle pain', 'Joint pain', 'Digestive problems', 'Headache', 'Memory problems', 'Liver problems'],
      importantNotes: ['Take at same time daily', 'Avoid grapefruit juice', 'Regular blood tests needed', 'May cause muscle problems'],
      dosage: '10-80mg once daily',
      timing: 'Take at the same time each day, with or without food',
      duration: 'Long-term use typically required',
      interactions: 'May interact with grapefruit juice, certain antibiotics, and blood thinners',
      warnings: ['May cause serious muscle problems', 'Monitor liver function', 'Avoid grapefruit juice', 'May cause memory problems'],
      category: 'Cholesterol Medication'
    },
    'lipitor': {
      description: 'Lipitor (Atorvastatin) is a statin medication used to lower cholesterol and reduce the risk of heart disease. It works by blocking an enzyme that makes cholesterol in the liver.',
      uses: ['High cholesterol', 'Heart disease prevention', 'Stroke prevention', 'Heart attack prevention', 'Atherosclerosis treatment'],
      commonSideEffects: ['Muscle pain', 'Joint pain', 'Digestive problems', 'Headache', 'Memory problems', 'Liver problems'],
      importantNotes: ['Take at same time daily', 'Avoid grapefruit juice', 'Regular blood tests needed', 'May cause muscle problems'],
      dosage: '10-80mg once daily',
      timing: 'Take at the same time each day, with or without food',
      duration: 'Long-term use typically required',
      interactions: 'May interact with grapefruit juice, certain antibiotics, and blood thinners',
      warnings: ['May cause serious muscle problems', 'Monitor liver function', 'Avoid grapefruit juice', 'May cause memory problems'],
      category: 'Cholesterol Medication'
    },
    'omeprazole': {
      description: 'Omeprazole is a proton pump inhibitor (PPI) used to treat stomach acid problems. It works by reducing the amount of acid produced in the stomach.',
      uses: ['GERD (acid reflux)', 'Stomach ulcers', 'Heartburn', 'Esophagitis', 'Zollinger-Ellison syndrome'],
      commonSideEffects: ['Headache', 'Nausea', 'Diarrhea', 'Stomach pain', 'Constipation', 'Gas'],
      importantNotes: ['Take before meals', 'May take 1-4 days for full effect', 'Long-term use may cause vitamin B12 deficiency', 'May increase risk of bone fractures'],
      dosage: '20-40mg once daily, usually in the morning',
      timing: 'Take before breakfast, 30-60 minutes before eating',
      duration: 'Short-term use recommended, long-term may be needed',
      interactions: 'May interact with blood thinners, certain heart medications, and antifungal drugs',
      warnings: ['May increase risk of bone fractures', 'May cause vitamin B12 deficiency', 'May increase risk of infections', 'Avoid long-term use without medical supervision'],
      category: 'Stomach Acid Medication'
    },
    'prilosec': {
      description: 'Prilosec (Omeprazole) is a proton pump inhibitor (PPI) used to treat stomach acid problems. It works by reducing the amount of acid produced in the stomach.',
      uses: ['GERD (acid reflux)', 'Stomach ulcers', 'Heartburn', 'Esophagitis', 'Zollinger-Ellison syndrome'],
      commonSideEffects: ['Headache', 'Nausea', 'Diarrhea', 'Stomach pain', 'Constipation', 'Gas'],
      importantNotes: ['Take before meals', 'May take 1-4 days for full effect', 'Long-term use may cause vitamin B12 deficiency', 'May increase risk of bone fractures'],
      dosage: '20-40mg once daily, usually in the morning',
      timing: 'Take before breakfast, 30-60 minutes before eating',
      duration: 'Short-term use recommended, long-term may be needed',
      interactions: 'May interact with blood thinners, certain heart medications, and antifungal drugs',
      warnings: ['May increase risk of bone fractures', 'May cause vitamin B12 deficiency', 'May increase risk of infections', 'Avoid long-term use without medical supervision'],
      category: 'Stomach Acid Medication'
    },
    'lisinopril': {
      description: 'Lisinopril is an ACE inhibitor used to treat high blood pressure and heart failure. It works by relaxing blood vessels and reducing the workload on the heart.',
      uses: ['High blood pressure', 'Heart failure', 'Heart attack recovery', 'Kidney protection in diabetes', 'Stroke prevention'],
      commonSideEffects: ['Dry cough', 'Dizziness', 'Headache', 'Fatigue', 'Nausea', 'Low blood pressure'],
      importantNotes: ['Take at same time daily', 'May take 2-4 weeks for full effect', 'Monitor blood pressure regularly', 'May cause dry cough'],
      dosage: '5-40mg once daily',
      timing: 'Take at the same time each day',
      duration: 'Long-term use typically required',
      interactions: 'May interact with potassium supplements, NSAIDs, and other blood pressure medications',
      warnings: ['May cause severe low blood pressure', 'Monitor kidney function', 'Avoid potassium supplements', 'May cause birth defects if taken during pregnancy'],
      category: 'Blood Pressure Medication'
    },
    'metoprolol': {
      description: 'Metoprolol is a beta-blocker used to treat high blood pressure, chest pain, and heart failure. It works by slowing down the heart rate and reducing blood pressure.',
      uses: ['High blood pressure', 'Chest pain (angina)', 'Heart failure', 'Heart attack prevention', 'Irregular heartbeat'],
      commonSideEffects: ['Dizziness', 'Fatigue', 'Slow heart rate', 'Cold hands and feet', 'Depression', 'Sleep problems'],
      importantNotes: ['Take at same time daily', 'Don\'t stop suddenly', 'May take 1-2 weeks for full effect', 'Monitor heart rate'],
      dosage: '25-200mg daily, usually taken twice daily',
      timing: 'Take at the same times each day',
      duration: 'Long-term use typically required',
      interactions: 'May interact with other heart medications, certain antidepressants, and diabetes medications',
      warnings: ['Don\'t stop suddenly - may cause heart problems', 'May mask low blood sugar symptoms', 'Monitor heart rate regularly', 'May cause breathing problems in people with asthma'],
      category: 'Heart Medication'
    },
    'simvastatin': {
      description: 'Simvastatin is a statin medication used to lower cholesterol and reduce the risk of heart disease. It works by blocking an enzyme that makes cholesterol in the liver.',
      uses: ['High cholesterol', 'Heart disease prevention', 'Stroke prevention', 'Heart attack prevention', 'Atherosclerosis treatment'],
      commonSideEffects: ['Muscle pain', 'Joint pain', 'Digestive problems', 'Headache', 'Memory problems', 'Liver problems'],
      importantNotes: ['Take at same time daily', 'Avoid grapefruit juice', 'Regular blood tests needed', 'May cause muscle problems'],
      dosage: '10-80mg once daily',
      timing: 'Take in the evening, with or without food',
      duration: 'Long-term use typically required',
      interactions: 'May interact with grapefruit juice, certain antibiotics, and blood thinners',
      warnings: ['May cause serious muscle problems', 'Monitor liver function', 'Avoid grapefruit juice', 'May cause memory problems'],
      category: 'Cholesterol Medication'
    },
    'hydrochlorothiazide': {
      description: 'Hydrochlorothiazide is a diuretic (water pill) used to treat high blood pressure and fluid retention. It works by helping the kidneys remove excess water and salt from the body.',
      uses: ['High blood pressure', 'Fluid retention (edema)', 'Heart failure', 'Kidney stones prevention', 'Diabetes insipidus'],
      commonSideEffects: ['Increased urination', 'Dizziness', 'Low blood pressure', 'Muscle cramps', 'Weakness', 'Dry mouth'],
      importantNotes: ['Take in the morning', 'May cause increased urination', 'Monitor blood pressure', 'May cause potassium loss'],
      dosage: '12.5-50mg once daily',
      timing: 'Take in the morning to avoid nighttime urination',
      duration: 'Long-term use typically required',
      interactions: 'May interact with other blood pressure medications, lithium, and digoxin',
      warnings: ['May cause severe dehydration', 'Monitor potassium levels', 'May cause dizziness when standing up', 'May increase blood sugar levels'],
      category: 'Diuretic Medication'
    },
    'sertraline': {
      description: 'Sertraline is an SSRI antidepressant used to treat depression, anxiety, and other mental health conditions. It works by increasing serotonin levels in the brain.',
      uses: ['Depression', 'Anxiety disorders', 'Panic disorder', 'Obsessive-compulsive disorder', 'Post-traumatic stress disorder', 'Premenstrual dysphoric disorder'],
      commonSideEffects: ['Nausea', 'Diarrhea', 'Insomnia', 'Drowsiness', 'Dry mouth', 'Headache', 'Sexual problems'],
      importantNotes: ['Take at same time daily', 'May take 4-6 weeks for full effect', 'Don\'t stop suddenly', 'May cause withdrawal symptoms'],
      dosage: '50-200mg once daily',
      timing: 'Take at the same time each day, with or without food',
      duration: 'Long-term use typically required',
      interactions: 'May interact with blood thinners, other antidepressants, and certain pain medications',
      warnings: ['May increase risk of suicidal thoughts in young people', 'Don\'t stop suddenly', 'May cause withdrawal symptoms', 'May cause serotonin syndrome if combined with other medications'],
      category: 'Antidepressant Medication'
    },
    'gabapentin': {
      description: 'Gabapentin is an anticonvulsant medication used to treat seizures, nerve pain, and other conditions. It works by affecting chemicals and nerves in the body.',
      uses: ['Seizures', 'Nerve pain (neuropathy)', 'Restless legs syndrome', 'Hot flashes', 'Anxiety', 'Fibromyalgia'],
      commonSideEffects: ['Drowsiness', 'Dizziness', 'Fatigue', 'Coordination problems', 'Blurred vision', 'Weight gain'],
      importantNotes: ['Take at same times daily', 'May cause drowsiness', 'Don\'t stop suddenly', 'May take time to work'],
      dosage: '300-3600mg daily, usually taken 3 times daily',
      timing: 'Take at the same times each day',
      duration: 'Long-term use typically required',
      interactions: 'May interact with other seizure medications, antacids, and alcohol',
      warnings: ['May cause severe drowsiness', 'Don\'t stop suddenly', 'May cause withdrawal symptoms', 'May increase risk of suicidal thoughts'],
      category: 'Anticonvulsant Medication'
    },
    'levothyroxine': {
      description: 'Levothyroxine is a thyroid hormone replacement medication used to treat hypothyroidism. It works by replacing the thyroid hormone that your body is not producing enough of.',
      uses: ['Hypothyroidism (underactive thyroid)', 'Goiter', 'Thyroid cancer treatment', 'Thyroid hormone replacement'],
      commonSideEffects: ['Generally well-tolerated', 'Rare: headache', 'Rare: nervousness', 'Rare: irritability', 'Rare: sweating'],
      importantNotes: ['Take on empty stomach', 'Take at same time daily', 'Wait 4 hours before taking antacids', 'Regular blood tests needed'],
      dosage: '25-300mcg once daily',
      timing: 'Take on empty stomach, 30-60 minutes before breakfast',
      duration: 'Long-term use typically required',
      interactions: 'May interact with antacids, iron supplements, calcium supplements, and certain medications',
      warnings: ['Take on empty stomach', 'Don\'t take with antacids or supplements', 'Regular blood tests needed', 'May cause heart problems if dose is too high'],
      category: 'Thyroid Medication'
    },
    'tramadol': {
      description: 'Tramadol is a pain medication used to treat moderate to severe pain. It works by changing how the brain and nervous system respond to pain.',
      uses: ['Moderate to severe pain', 'Chronic pain management', 'Post-surgical pain', 'Arthritis pain', 'Back pain'],
      commonSideEffects: ['Dizziness', 'Drowsiness', 'Nausea', 'Constipation', 'Headache', 'Dry mouth'],
      importantNotes: ['May cause drowsiness', 'Don\'t drive or operate machinery', 'May be habit-forming', 'Take with food to reduce nausea'],
      dosage: '50-400mg daily, usually taken every 4-6 hours',
      timing: 'Take with food to reduce stomach upset',
      duration: 'Short-term use recommended',
      interactions: 'May interact with alcohol, other pain medications, and certain antidepressants',
      warnings: ['May be habit-forming', 'Don\'t stop suddenly', 'May cause withdrawal symptoms', 'May cause seizures in some people'],
      category: 'Pain Medication'
    },
    'furosemide': {
      description: 'Furosemide is a diuretic (water pill) used to treat fluid retention and high blood pressure. It works by helping the kidneys remove excess water and salt from the body.',
      uses: ['Fluid retention (edema)', 'High blood pressure', 'Heart failure', 'Liver disease', 'Kidney disease'],
      commonSideEffects: ['Increased urination', 'Dizziness', 'Low blood pressure', 'Muscle cramps', 'Weakness', 'Dry mouth'],
      importantNotes: ['Take in the morning', 'May cause increased urination', 'Monitor blood pressure', 'May cause potassium loss'],
      dosage: '20-600mg daily, usually taken once or twice daily',
      timing: 'Take in the morning to avoid nighttime urination',
      duration: 'Long-term use typically required',
      interactions: 'May interact with other blood pressure medications, lithium, and digoxin',
      warnings: ['May cause severe dehydration', 'Monitor potassium levels', 'May cause dizziness when standing up', 'May increase blood sugar levels'],
      category: 'Diuretic Medication'
    },
    'clopidogrel': {
      description: 'Clopidogrel is an antiplatelet medication used to prevent blood clots. It works by preventing platelets from sticking together.',
      uses: ['Heart attack prevention', 'Stroke prevention', 'Blood clot prevention', 'After heart procedures', 'Peripheral artery disease'],
      commonSideEffects: ['Easy bruising', 'Bleeding', 'Nosebleeds', 'Stomach upset', 'Diarrhea', 'Rash'],
      importantNotes: ['Take at same time daily', 'May cause bleeding', 'Don\'t stop without doctor approval', 'Avoid activities that may cause bleeding'],
      dosage: '75mg once daily',
      timing: 'Take at the same time each day',
      duration: 'Long-term use typically required',
      interactions: 'May interact with blood thinners, NSAIDs, and certain stomach medications',
      warnings: ['May cause serious bleeding', 'Don\'t stop suddenly', 'Avoid activities that may cause bleeding', 'Monitor for signs of bleeding'],
      category: 'Blood Thinner Medication'
    },
    'prednisone': {
      description: 'Prednisone is a corticosteroid medication used to reduce inflammation and suppress the immune system. It works by mimicking the effects of hormones your body naturally produces.',
      uses: ['Inflammatory conditions', 'Allergic reactions', 'Asthma', 'Rheumatoid arthritis', 'Lupus', 'Organ transplant rejection prevention'],
      commonSideEffects: ['Weight gain', 'Mood changes', 'Insomnia', 'Increased appetite', 'High blood pressure', 'High blood sugar'],
      importantNotes: ['Take with food', 'Don\'t stop suddenly', 'May cause mood changes', 'Regular monitoring needed'],
      dosage: '5-60mg daily, dose varies by condition',
      timing: 'Take with food to reduce stomach upset',
      duration: 'Short-term use preferred, long-term may be needed',
      interactions: 'May interact with blood thinners, diabetes medications, and certain vaccines',
      warnings: ['Don\'t stop suddenly - may cause adrenal crisis', 'May increase risk of infections', 'May cause mood changes', 'Monitor blood sugar and blood pressure'],
      category: 'Steroid Medication'
    },
    // Supplements
    'vitamin-b12': {
      description: 'Vitamin B12 (cobalamin) is essential for nerve function, red blood cell formation, and DNA synthesis. It helps prevent anemia and supports brain health.',
      uses: ['Prevents B12 deficiency anemia', 'Supports nerve function', 'Helps with energy production', 'Important for brain health', 'Supports heart health', 'Mood regulation'],
      commonSideEffects: ['Generally well-tolerated', 'Rare: mild diarrhea', 'Rare: mild nausea', 'Rare: allergic reactions'],
      importantNotes: ['B12 deficiency is common with metformin use. Regular blood tests recommended.', 'Take with food for better absorption', 'Long-term use may be needed', 'May take 2-4 weeks to see benefits'],
      dosage: '1000-2000 mcg daily for deficiency, 2.4 mcg daily for maintenance',
      timing: 'Take with food for better absorption',
      duration: 'Long-term use may be needed for deficiency',
      interactions: 'May interact with metformin, proton pump inhibitors, and certain diabetes medications',
      warnings: ['High doses may mask folate deficiency', 'Regular blood tests recommended', 'May cause acne in some people'],
      foodSources: ['Meat, fish, dairy products', 'Fortified cereals', 'Nutritional yeast', 'Eggs'],
      category: 'Vitamin Supplement'
    },
    'folate': {
      description: 'Folate (folic acid) is crucial for cell division, DNA synthesis, and preventing birth defects. It works closely with B12.',
      uses: ['Prevents neural tube defects', 'Supports red blood cell formation', 'Important for DNA synthesis', 'May reduce heart disease risk', 'Supports mental health', 'Mood regulation'],
      commonSideEffects: ['Generally well-tolerated', 'Rare: mild nausea', 'Rare: bitter taste', 'Rare: allergic reactions'],
      importantNotes: ['Take with B12 to prevent masking B12 deficiency symptoms.', 'Take with or without food', 'Long-term use is generally safe', 'Important during pregnancy'],
      dosage: '400-800 mcg daily, higher doses during pregnancy',
      timing: 'Take with or without food',
      duration: 'Long-term use is generally safe',
      interactions: 'May interact with methotrexate, certain seizure medications, and B12 supplements',
      warnings: ['High doses may mask B12 deficiency', 'Important for pregnant women', 'May interact with certain cancer treatments'],
      foodSources: ['Leafy green vegetables', 'Beans and lentils', 'Fortified cereals', 'Citrus fruits', 'Avocado'],
      category: 'Vitamin Supplement'
    },
    'magnesium': {
      description: 'Magnesium is involved in over 300 enzymatic reactions in the body, including muscle and nerve function, blood sugar control, and bone health.',
      uses: ['Supports muscle and nerve function', 'Helps with blood sugar control', 'May improve sleep quality', 'Supports bone health', 'May reduce blood pressure', 'Heart rhythm regulation'],
      commonSideEffects: ['May cause loose stools initially', 'Mild stomach upset', 'Diarrhea (with high doses)', 'Nausea'],
      importantNotes: ['Start with lower dose and increase gradually. May cause loose stools initially.', 'Take with food to reduce stomach upset', 'Long-term use is generally safe', 'May take 2-4 weeks to see benefits'],
      dosage: '200-400mg daily, start with lower dose',
      timing: 'Take with food to reduce stomach upset',
      duration: 'Long-term use is generally safe',
      interactions: 'May interact with certain antibiotics, blood pressure medications, and calcium supplements',
      warnings: ['High doses may cause diarrhea', 'May interact with kidney function', 'Avoid if you have kidney problems'],
      foodSources: ['Nuts and seeds', 'Dark leafy greens', 'Whole grains', 'Dark chocolate', 'Bananas', 'Avocados'],
      category: 'Mineral Supplement'
    },
    'vitamin-d': {
      description: 'Vitamin D is essential for bone health, immune function, and calcium absorption. It helps maintain strong bones and supports overall health.',
      uses: ['Bone health and strength', 'Immune system support', 'Calcium absorption', 'Muscle function', 'May reduce depression risk', 'Heart health'],
      commonSideEffects: ['Generally well-tolerated', 'Rare: nausea', 'Rare: constipation', 'Rare: kidney stones (with high doses)'],
      importantNotes: ['Take with food containing fat for better absorption', 'Regular blood tests may be needed', 'Sunlight exposure also helps with vitamin D production', 'May take 2-3 months to see benefits'],
      dosage: '1000-4000 IU daily, higher doses may be needed for deficiency',
      timing: 'Take with food containing fat',
      duration: 'Long-term use typically required',
      interactions: 'May interact with certain heart medications, steroids, and weight loss drugs',
      warnings: ['High doses may cause toxicity', 'Regular blood tests recommended', 'May interact with kidney function'],
      foodSources: ['Fatty fish (salmon, mackerel)', 'Fortified dairy products', 'Egg yolks', 'Mushrooms', 'Fortified cereals'],
      category: 'Vitamin Supplement'
    },
    'vitamin-c': {
      description: 'Vitamin C is a powerful antioxidant that supports immune function, collagen synthesis, and iron absorption. It helps protect cells from damage.',
      uses: ['Immune system support', 'Collagen production', 'Iron absorption', 'Antioxidant protection', 'Wound healing'],
      commonSideEffects: ['Generally well-tolerated', 'High doses may cause diarrhea', 'Stomach upset (with high doses)'],
      importantNotes: ['Take with food to reduce stomach upset', 'Water-soluble vitamin - excess is excreted', 'May interact with certain chemotherapy drugs'],
      foodSources: ['Citrus fruits (oranges, lemons)', 'Strawberries', 'Bell peppers', 'Broccoli', 'Kiwi', 'Tomatoes'],
      category: 'Vitamin Supplement'
    },
    'omega-3': {
      description: 'Omega-3 fatty acids are essential fats that support heart health, brain function, and reduce inflammation. They are important for overall health.',
      uses: ['Heart health support', 'Brain function', 'Reduces inflammation', 'May improve mood', 'Supports eye health'],
      commonSideEffects: ['Fishy aftertaste', 'Mild stomach upset', 'Burping'],
      importantNotes: ['Take with food to reduce stomach upset', 'Store in refrigerator to maintain freshness', 'May interact with blood thinners'],
      foodSources: ['Fatty fish (salmon, sardines, mackerel)', 'Flaxseeds and flaxseed oil', 'Chia seeds', 'Walnuts', 'Soybeans'],
      category: 'Fatty Acid Supplement'
    },
    'fish-oil': {
      description: 'Fish oil contains omega-3 fatty acids (EPA and DHA) that support heart health, brain function, and reduce inflammation.',
      uses: ['Heart health support', 'Brain function', 'Reduces inflammation', 'May improve mood', 'Supports joint health'],
      commonSideEffects: ['Fishy aftertaste', 'Mild stomach upset', 'Burping', 'Bad breath'],
      importantNotes: ['Take with food to reduce stomach upset', 'Store in refrigerator to maintain freshness', 'May interact with blood thinners'],
      foodSources: ['Fatty fish (salmon, sardines, mackerel)', 'Cod liver oil', 'Anchovies', 'Herring', 'Tuna'],
      category: 'Fatty Acid Supplement'
    },
    'probiotics': {
      description: 'Probiotics are beneficial bacteria that support digestive health and immune function. They help maintain a healthy balance of gut bacteria.',
      uses: ['Digestive health support', 'Immune system support', 'May help with diarrhea', 'Supports gut health', 'May improve mood'],
      commonSideEffects: ['Generally well-tolerated', 'Mild gas or bloating initially', 'Rare: mild stomach upset'],
      importantNotes: ['Take on empty stomach for best results', 'Store in refrigerator', 'May take 2-4 weeks to see benefits'],
      foodSources: ['Yogurt with live cultures', 'Kefir', 'Sauerkraut', 'Kimchi', 'Miso', 'Tempeh', 'Pickles'],
      category: 'Digestive Supplement'
    },
    'coq10': {
      description: 'CoQ10 is a natural antioxidant that supports heart health and energy production. It helps protect cells from damage and supports cellular energy.',
      uses: ['Heart health support', 'Energy production', 'Antioxidant protection', 'May help with statin side effects', 'Supports muscle function'],
      commonSideEffects: ['Generally well-tolerated', 'Mild stomach upset', 'Rare: nausea'],
      importantNotes: ['Take with food for better absorption', 'May interact with blood thinners', 'May take 4-8 weeks to see benefits'],
      foodSources: ['Organ meats (liver, heart)', 'Fatty fish', 'Whole grains', 'Soybeans', 'Nuts and seeds'],
      category: 'Antioxidant Supplement'
    },
    'melatonin': {
      description: 'Melatonin is a natural hormone that regulates sleep-wake cycles. It helps improve sleep quality and may help with jet lag.',
      uses: ['Sleep improvement', 'Jet lag relief', 'May help with insomnia', 'Supports circadian rhythm', 'Antioxidant properties'],
      commonSideEffects: ['Drowsiness', 'Mild headache', 'Dizziness', 'Nausea'],
      importantNotes: ['Take 30-60 minutes before bedtime', 'Avoid bright lights after taking', 'May interact with blood thinners'],
      foodSources: ['Tart cherries', 'Walnuts', 'Tomatoes', 'Olives', 'Rice', 'Barley', 'Oats'],
      category: 'Sleep Supplement'
    },
    'potassium': {
      description: 'Potassium is an essential mineral that helps regulate fluid balance, muscle contractions, and nerve signals. It plays a crucial role in heart function and blood pressure regulation.',
      uses: ['Blood pressure regulation', 'Heart health support', 'Muscle function', 'Nerve function', 'Fluid balance', 'Bone health'],
      commonSideEffects: ['Generally well-tolerated', 'Mild stomach upset', 'Nausea (with high doses)'],
      importantNotes: ['Take with food to reduce stomach upset', 'May interact with certain heart medications', 'Regular blood tests may be needed', 'Avoid if you have kidney problems'],
      foodSources: ['Bananas', 'Sweet potatoes', 'Spinach', 'Avocados', 'Coconut water', 'White beans', 'Salmon', 'Dried apricots'],
      category: 'Mineral Supplement'
    },
    'iron': {
      description: 'Iron is an essential mineral that helps transport oxygen throughout the body and supports energy production. It is crucial for preventing iron-deficiency anemia.',
      uses: ['Prevents iron-deficiency anemia', 'Oxygen transport', 'Energy production', 'Immune function', 'Cognitive function'],
      commonSideEffects: ['Constipation', 'Nausea', 'Stomach upset', 'Dark stools'],
      importantNotes: ['Take with vitamin C for better absorption', 'Avoid taking with calcium or coffee', 'May take 2-4 weeks to see benefits', 'Regular blood tests recommended'],
      foodSources: ['Red meat', 'Poultry', 'Fish', 'Beans and lentils', 'Spinach', 'Fortified cereals', 'Dark chocolate'],
      category: 'Mineral Supplement'
    },
    'calcium': {
      description: 'Calcium is essential for strong bones and teeth, muscle function, nerve transmission, and blood clotting. It is the most abundant mineral in the body.',
      uses: ['Bone and teeth health', 'Muscle function', 'Nerve transmission', 'Blood clotting', 'Heart rhythm regulation'],
      commonSideEffects: ['Constipation', 'Gas', 'Bloating', 'Kidney stones (with high doses)'],
      importantNotes: ['Take with vitamin D for better absorption', 'Split doses throughout the day', 'Avoid taking with iron supplements', 'May interact with certain medications'],
      foodSources: ['Dairy products (milk, cheese, yogurt)', 'Leafy green vegetables', 'Sardines', 'Fortified foods', 'Almonds', 'Tofu'],
      category: 'Mineral Supplement'
    },
    'zinc': {
      description: 'Zinc is an essential mineral that supports immune function, wound healing, protein synthesis, and DNA formation. It plays a role in taste and smell.',
      uses: ['Immune system support', 'Wound healing', 'Protein synthesis', 'DNA formation', 'Taste and smell', 'Growth and development'],
      commonSideEffects: ['Nausea', 'Stomach upset', 'Metallic taste', 'Headache'],
      importantNotes: ['Take with food to reduce stomach upset', 'Avoid taking with calcium or iron', 'May interact with antibiotics', 'Long-term high doses may cause copper deficiency'],
      foodSources: ['Oysters', 'Red meat', 'Poultry', 'Beans', 'Nuts and seeds', 'Whole grains', 'Dairy products'],
      category: 'Mineral Supplement'
    },
    'vitamin-b6': {
      description: 'Vitamin B6 is essential for brain development, immune function, and protein metabolism. It helps the body make neurotransmitters and hemoglobin.',
      uses: ['Brain function', 'Immune system support', 'Protein metabolism', 'Neurotransmitter production', 'Hemoglobin formation', 'Mood regulation'],
      commonSideEffects: ['Generally well-tolerated', 'Nausea (with high doses)', 'Sensitivity to sunlight (with high doses)'],
      importantNotes: ['Take with food', 'May interact with certain medications', 'High doses may cause nerve damage', 'Water-soluble vitamin'],
      foodSources: ['Poultry', 'Fish', 'Potatoes', 'Bananas', 'Chickpeas', 'Fortified cereals', 'Pistachios'],
      category: 'Vitamin Supplement'
    },
    'folic-acid': {
      description: 'Folic acid is the synthetic form of folate, essential for cell division, DNA synthesis, and preventing birth defects. It works closely with B12.',
      uses: ['Prevents neural tube defects', 'Cell division', 'DNA synthesis', 'Red blood cell formation', 'May reduce heart disease risk'],
      commonSideEffects: ['Generally well-tolerated', 'Mild nausea', 'Bitter taste'],
      importantNotes: ['Take with B12 to prevent masking B12 deficiency', 'Important during pregnancy', 'Take with or without food', 'May interact with certain medications'],
      foodSources: ['Fortified cereals', 'Leafy green vegetables', 'Beans and lentils', 'Citrus fruits', 'Avocado', 'Bread and pasta (fortified)'],
      category: 'Vitamin Supplement'
    }
  }

  return info[drug.id] || {
    description: `${drug.name} is a ${drug.category.toLowerCase()} medication. This is a prescription medication that should be taken as directed by your healthcare provider.`,
    uses: ['Consult your healthcare provider for specific uses and indications'],
    commonSideEffects: ['Side effects vary by individual', 'Consult your healthcare provider for specific side effects'],
    importantNotes: ['Always follow your doctor\'s instructions', 'Read the medication label carefully', 'Take as prescribed', 'Don\'t share with others'],
    dosage: 'Follow your healthcare provider\'s instructions',
    timing: 'Take as directed by your healthcare provider',
    duration: 'Take for the duration prescribed by your healthcare provider',
    interactions: 'May interact with other medications - consult your healthcare provider',
    warnings: ['Always consult your healthcare provider before making changes', 'Report any unusual side effects immediately'],
    category: drug.category
  }
}

export function MedicationInfo({ drug }: MedicationInfoProps) {
  const info = getMedicationInfo(drug)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pill className="h-5 w-5 text-blue-600" />
            <span>{drug.name} Information</span>
            <Badge variant="secondary">
              {info.category}
            </Badge>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </CardTitle>
        {!isExpanded && (
          <p className="text-sm text-gray-600 mt-2">
            Click to view detailed medication information
          </p>
        )}
      </CardHeader>
      
      {isExpanded && (
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

        {/* Dosage Information */}
        {info.dosage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0">💊</div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Dosage Information</h4>
                <p className="text-blue-800 text-sm mb-2">{info.dosage}</p>
                {info.timing && (
                  <p className="text-blue-800 text-sm"><strong>Timing:</strong> {info.timing}</p>
                )}
                {info.duration && (
                  <p className="text-blue-800 text-sm"><strong>Duration:</strong> {info.duration}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Interactions */}
        {info.interactions && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0">⚠️</div>
              <div>
                <h4 className="font-medium text-orange-900 mb-2">Drug Interactions</h4>
                <p className="text-orange-800 text-sm">{info.interactions}</p>
              </div>
            </div>
          </div>
        )}

        {/* Warnings */}
        {info.warnings && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0">🚨</div>
              <div>
                <h4 className="font-medium text-red-900 mb-2">Important Warnings</h4>
                <ul className="list-disc list-inside space-y-1 text-red-800 text-sm">
                  {info.warnings.map((warning: string, index: number) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Food Sources - Only show for supplements */}
        {info.foodSources && drug.type === 'supplement' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0">🥗</div>
              <div>
                <h4 className="font-medium text-green-900 mb-2">Food Sources</h4>
                <p className="text-green-800 text-sm mb-2">You can also get this nutrient from these foods:</p>
                <ul className="list-disc list-inside space-y-1 text-green-800">
                  {info.foodSources.map((source: string, index: number) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

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
      )}
    </Card>
  )
}

