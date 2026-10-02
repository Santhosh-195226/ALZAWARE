import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, Brain, CheckCircle } from 'lucide-react';

export default function MriUploadSim({ onComplete }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            // Create preview if it's an image
            if (selected.type.startsWith('image/')) {
                setPreviewUrl(URL.createObjectURL(selected));
            } else {
                setPreviewUrl(null); // It's probably a dcm file or something else
            }
        }
    };

    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const selected = e.dataTransfer.files[0];
            setFile(selected);
            if (selected.type.startsWith('image/')) {
                setPreviewUrl(URL.createObjectURL(selected));
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const runAnalysis = () => {
        if (!file) return;
        setIsProcessing(true);

        // Simulate AI processing
        setTimeout(() => {
            setIsProcessing(false);

            // Generate a simulated risk score between 10 and 90 based on file string to be somewhat deterministic for the demo
            let hash = 0;
            for (let i = 0; i < file.name.length; i++) {
                hash = file.name.charCodeAt(i) + ((hash << 5) - hash);
            }
            const score = Math.abs(hash) % 80 + 10;

            let insight = 'No major structural abnormalities detected';
            let indicator = 'Healthy Brain Structure';
            if (score > 60) {
                insight = 'Possible mild atrophy patterns detected in temporal lobe';
                indicator = 'Structural Changes Present';
            } else if (score > 30) {
                insight = 'Slight ventricular enlargement, monitor periodically';
                indicator = 'Borderline Volume Changes';
            }

            setResult({ score, insight, indicator, fileUrl: previewUrl || 'placeholder' });
        }, 3000);
    };

    if (result) {
        return (
            <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <CheckCircle size={48} color="var(--accent-green)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>MRI Analysis Complete</h3>
                <p style={{ opacity: 0.8, marginBottom: '24px' }}>Deep learning structural assessment finished.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div style={{ height: '200px', background: '#000', borderRadius: 'var(--border-radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {previewUrl ? (
                            <img src={previewUrl} alt="MRI Scan" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'hue-rotate(90deg)' }} />
                        ) : (
                            <Brain size={64} color="var(--primary-teal)" style={{ opacity: 0.5 }} />
                        )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
                        <div style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '4px' }}>Structural Risk Score</div>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-navy)' }}>{result.score}%</div>

                        <div style={{ color: result.score > 60 ? 'var(--accent-amber)' : 'var(--accent-green)', fontWeight: 'bold', marginTop: '8px' }}>
                            {result.indicator}
                        </div>
                        <div style={{ opacity: 0.8, marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic' }}>
                            {result.insight}
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={() => onComplete(result.score, previewUrl)}>
                    Generate Final Report
                </button>
            </div>
        );
    }

    return (
        <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>AI MRI Scanner</h3>
            <p style={{ opacity: 0.8, marginBottom: '24px' }}>Upload a structural image to detect early neurodegenerative changes.</p>

            <div
                className="upload-module"
                style={{ border: '2px dashed var(--primary-teal)', padding: '40px', borderRadius: 'var(--border-radius-md)', background: file ? 'rgba(31, 163, 163, 0.1)' : 'transparent', marginBottom: '24px', cursor: 'pointer' }}
                onClick={() => !isProcessing && fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {file ? (
                    <FileImage size={48} color="var(--primary-teal)" style={{ margin: '0 auto 16px' }} />
                ) : (
                    <UploadCloud size={48} color="var(--primary-teal)" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                )}

                <h4 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>
                    {file ? file.name : 'Drag & drop image here'}
                </h4>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                    Supports .dcm, .jpg, .png files
                </p>

                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".dcm,.jpg,.jpeg,.png" style={{ display: 'none' }} />
            </div>

            {file && !isProcessing && (
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); runAnalysis(); }}>
                    Run Analysis
                </button>
            )}

            {isProcessing && (
                <div style={{ padding: '24px', background: 'var(--secondary-mint)', borderRadius: 'var(--border-radius-sm)', animation: 'pulse 1.5s infinite' }}>
                    <div className="loader" style={{ margin: '0 auto 8px', width: '32px', height: '32px' }}></div>
                    <div>Simulating CNN feature extraction...</div>
                </div>
            )}
        </div>
    );
}
