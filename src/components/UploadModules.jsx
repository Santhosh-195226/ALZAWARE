import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Activity, FileWarning, Search, BrainCircuit } from 'lucide-react';

export default function UploadModules() {
    const [activeTab, setActiveTab] = useState('mri');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);

    const handleUpload = () => {
        setIsProcessing(true);
        setResult(null);
        setTimeout(() => {
            setIsProcessing(false);
            setResult(activeTab);
        }, 2500);
    };

    return (
        <section id="upload" className="section bg-white" style={{ background: 'var(--secondary-gray)' }}>
            <div className="container">

                <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--white)', padding: '40px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                    <div className="text-center mb-8">
                        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Run AI Analysis</h2>
                        <p style={{ opacity: 0.7 }}>Securely upload diagnostic files for automated predictive modeling.</p>
                    </div>

                    <div className="tabs" style={{ justifyContent: 'center' }}>
                        <button className={`tab ${activeTab === 'mri' ? 'active' : ''}`} onClick={() => setActiveTab('mri')}>
                            MRI Scan
                        </button>
                        <button className={`tab ${activeTab === 'eeg' ? 'active' : ''}`} onClick={() => setActiveTab('eeg')}>
                            EEG Data
                        </button>
                    </div>

                    {!result ? (
                        <div className="upload-module" onClick={handleUpload}>
                            <UploadCloud size={64} className="upload-icon" />
                            <h3 style={{ marginBottom: '8px', fontSize: '1.5rem' }}>
                                {activeTab === 'mri' ? 'Upload MRI Images' : 'Upload EEG Signal Data'}
                            </h3>
                            <p style={{ opacity: 0.7, marginBottom: '24px' }}>
                                {activeTab === 'mri' ? 'Drag & drop DICOM or NIfTI files here' : 'Supports .edf, .csv, and .mat formats'}
                            </p>

                            <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); handleUpload(); }}>
                                <Search size={18} />
                                Run AI Analysis
                            </button>
                        </div>
                    ) : (
                        <div className="results-panel animate-fade-in" style={{ padding: '24px', background: 'var(--secondary-mint)', borderRadius: 'var(--border-radius-md)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <CheckCircle size={32} color="var(--accent-green)" />
                                <h3 style={{ color: 'var(--primary-navy)' }}>Analysis Complete</h3>
                            </div>

                            {activeTab === 'mri' ? (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div style={{ background: '#000', borderRadius: 'var(--border-radius-md)', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                        <BrainCircuit size={80} color="var(--primary-teal)" style={{ opacity: 0.5 }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(108, 99, 255, 0.4) 0%, transparent 60%)' }}></div>
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '8px' }}>Findings:</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, opacity: 0.8 }}>
                                            <li style={{ marginBottom: '8px' }}>• Minor cortical thinning detected</li>
                                            <li style={{ marginBottom: '8px' }}>• Hippocampal volume within lower normal range</li>
                                            <li style={{ marginBottom: '8px' }}>• Ventricular enlargement: Negative</li>
                                        </ul>
                                        <div style={{ marginTop: '24px', fontWeight: 'bold', color: 'var(--accent-amber)', fontSize: '1.2rem' }}>
                                            Risk Confidence: 68%
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div style={{ background: 'var(--white)', borderRadius: 'var(--border-radius-md)', padding: '16px', height: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ height: '2px', background: 'var(--accent-purple)', width: '100%', position: 'relative', top: '20%' }}></div>
                                        <div style={{ height: '2px', background: 'var(--primary-teal)', width: '100%', position: 'relative', top: '40%' }}></div>
                                        <div style={{ height: '2px', background: 'var(--accent-amber)', width: '100%', position: 'relative', top: '60%' }}></div>
                                        <div style={{ height: '2px', background: 'var(--accent-green)', width: '100%', position: 'relative', top: '80%' }}></div>
                                        <div style={{ fontSize: '0.8rem', textAlign: 'center', marginTop: 'auto', opacity: 0.5 }}>Alpha / Beta / Theta / Delta</div>
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '8px' }}>Findings:</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, opacity: 0.8 }}>
                                            <li style={{ marginBottom: '8px' }}>• Increased slow-wave activity (Theta)</li>
                                            <li style={{ marginBottom: '8px' }}>• Reduced Alpha peak frequency</li>
                                            <li style={{ marginBottom: '8px' }}>• Minor synchronization anomalies</li>
                                        </ul>
                                        <div style={{ marginTop: '24px', fontWeight: 'bold', color: 'var(--accent-amber)', fontSize: '1.2rem' }}>
                                            Risk Confidence: 72%
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div style={{ textAlign: 'center', marginTop: '32px' }}>
                                <button className="btn btn-outline" onClick={() => setResult(null)}>Analyze Another File</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {isProcessing && (
                <div className="processing-overlay">
                    <div className="loader"></div>
                    <h2 style={{ fontFamily: 'var(--font-heading)' }}>AI Neural Engine Processing...</h2>
                    <p style={{ opacity: 0.8, marginTop: '8px' }}>Extracting features and generating heatmaps</p>
                </div>
            )}
        </section>
    );
}
