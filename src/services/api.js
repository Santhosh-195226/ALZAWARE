export const uploadMRI = async (file) => {
    console.log('Sending MRI scan to inference server...');

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
        status: 'processed',
        scanId: 'MRI-AX92',
    };
};