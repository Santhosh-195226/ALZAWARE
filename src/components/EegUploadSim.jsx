import React, { useState, useRef } from 'react';
import { UploadCloud, Activity, CheckCircle, FileAudio } from 'lucide-react';

export default function EegUploadSim({ onComplete }) {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
        }
    };

    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const selected = e.dataTransfer.files[0];
            setFile(selected);
        }
    };

    const runAnalysis = () => {
        if (!file) return;
        setIsProcessing(true);

        // Simulate AI processing
        setTimeout(() => {
            setIsProcessing(false);

            // Generate simulated risk score
            let hash = 0;
            for (let i = 0; i < file.name.length; i++) {
                hash = file.name.charCodeAt(i) + ((hash << 5) - hash);
            }
            const score = Math.abs(hash) % 80 + 10;

            let insight = 'Normal Alpha and Beta wave distribution.';
            let indicator = 'Healthy Brainwave Patterns';
            if (score > 60) {
                insight = 'Increased Theta/Alpha ratio detected. Possible synchronization anomalies.';
                indicator = 'Abnormal Slow-Wave Activity';
            } else if (score > 30) {
                insight = 'Slight deviations in Alpha peak frequency detected.';
                indicator = 'Borderline Signal Variations';
            }

            setResult({ score, insight, indicator });
        }, 2500);
    };

    if (result) {
        return (
            <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <CheckCircle size={48} color="var(--accent-green)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>EEG Analysis Complete</h3>
                <p style={{ opacity: 0.8, marginBottom: '24px' }}>Brainwave pattern processing finished.</p>

                <div style={{ padding: '24px', background: 'var(--secondary-gray)', borderRadius: 'var(--border-radius-md)', marginBottom: '24px' }}>
                    <div style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '4px' }}>EEG Signal Risk Score</div>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-navy)' }}>{result.score}%</div>

                    <div style={{ color: result.score > 60 ? 'var(--accent-amber)' : 'var(--accent-green)', fontWeight: 'bold', marginTop: '8px' }}>
                        {result.indicator}
                    </div>
                    <div style={{ opacity: 0.8, marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        {result.insight}
                    </div>
                </div>

                <button className="btn btn-primary" onClick={() => onComplete(result.score)}>
                    Proceed to MRI Imaging
                </button>
            </div>
        );
    }

    return (
        <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>EEG Data Upload</h3>
            <p style={{ opacity: 0.8, marginBottom: '24px' }}>Upload brainwave signal data for anomaly pattern recognition.</p>

            <div
                className="upload-module"
                style={{ border: '2px dashed var(--accent-purple)', padding: '40px', borderRadius: 'var(--border-radius-md)', background: file ? 'rgba(108, 99, 255, 0.1)' : 'transparent', marginBottom: '24px', cursor: 'pointer' }}
                onClick={() => !isProcessing && fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {file ? (
                    <FileAudio size={48} color="var(--accent-purple)" style={{ margin: '0 auto 16px' }} />
                ) : (
                    <UploadCloud size={48} color="var(--accent-purple)" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                )}

                <h4 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>
                    {file ? file.name : 'Drag & drop EEG data here'}
                </h4>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                    Supports .edf, .csv, and .mat
                </p>

                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".edf,.csv,.mat" style={{ display: 'none' }} />
            </div>

            {file && !isProcessing && (
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); runAnalysis(); }}>
                    Run Analysis
                </button>
            )}

            {isProcessing && (
                <div style={{ padding: '24px', background: 'var(--secondary-mint)', borderRadius: 'var(--border-radius-sm)', animation: 'pulse 1.5s infinite' }}>
                    <Activity size={32} color="var(--accent-purple)" style={{ margin: '0 auto 8px', animation: 'float 2s infinite' }} />
                    <div>Analyzing frequency bands (Alpha, Beta, Theta, Delta)...</div>
                </div>
            )}
        </div>
    );
}
