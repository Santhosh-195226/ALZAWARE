export const calculateLifestyleRisk = (data) => {
    let score = 0;

    // Age
    if (data.age >= 80) score += 30;
    else if (data.age >= 60) score += 20;
    else if (data.age >= 50) score += 10;

    // Sleep
    if (data.sleep < 5) score += 20;
    else if (data.sleep < 7) score += 10;

    // Exercise
    if (data.exercise === 'none') score += 20;
    else if (data.exercise === 'low') score += 10;

    // Smoking
    if (data.smoking) score += 15;

    // Family History
    if (data.familyHistory) score += 15;

    // Cognitive Activity
    if (data.cognitiveActivity === 'none') score += 15;
    else if (data.cognitiveActivity === 'low') score += 10;

    return Math.min(score, 100);
};

export const getRiskCategory = (score) => {
    if (score <= 30) {
        return { level: 'Low Risk', text: 'Maintain healthy lifestyle', action: 'Continue monitoring' };
    }
    if (score <= 60) {
        return { level: 'Moderate Risk', text: 'Monitor cognitive health', action: 'Take MMSE cognitive screening' };
    }
    return { level: 'High Risk', text: 'Consider clinical screening', action: 'Recommend EEG/MRI evaluation' };
};

export const getFinalCategory = (score) => {
    if (score <= 30) return { level: 'Low Risk', color: 'var(--accent-green)' };
    if (score <= 60) return { level: 'Moderate Risk', color: 'var(--accent-amber)' };
    return { level: 'High Risk', color: '#ff4d4f' }; // Red color for high risk
};
