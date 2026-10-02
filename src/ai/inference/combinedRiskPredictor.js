import { runMRIPrediction } from './predictMRI';

export const generateCombinedRisk = async (patientData) => {
    const mriResult = await runMRIPrediction(patientData.mri);

    return {
        finalRisk: 'High Risk',
        aiConfidence: '92%',
        recommendation: 'Recommend neurological screening',
        cognitiveAgeGap: '+11 years',
        mriFindings: mriResult,
    };
};