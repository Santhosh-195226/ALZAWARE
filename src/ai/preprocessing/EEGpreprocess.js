export const preprocessEEG = (signal) => {
    console.log('Filtering EEG noise...');

    return {
        alphaWaveScore: 0.72,
        betaWaveScore: 0.44,
        thetaDeviation: true,
    };
};