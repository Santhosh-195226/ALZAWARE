
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// Call the real ALZAWARE FastAPI model
export const predictRisk = async (assessment) => {
    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessment),
    });

    const result = await response.json();

    if (!response.ok) {
        const message =
            typeof result.detail === 'string'
                ? result.detail
                : JSON.stringify(result.detail || 'Prediction failed');

        throw new Error(message);
    }

    return result;
};

// Existing MRI upload simulation — preserved for now
export const uploadMRI = async (file) => {
    console.log('Sending MRI scan to inference server...', file.name);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
        status: 'processed',
        scanId: 'MRI-AX92',
    };
};
