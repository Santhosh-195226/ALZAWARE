export const runMRIPrediction = async (imageData) => {
    console.log('Loading MRI model...');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
        probability: 0.87,
        stage: 'Mild Cognitive Impairment',
        confidence: '94.2%',
        affectedRegion: 'Temporal Lobe',
    };
};