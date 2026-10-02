import React, { useState, useEffect } from 'react';
import LifestyleForm from './LifestyleForm';
import CognitiveMicroTests from './CognitiveMicroTests';
import EegUploadSim from './EegUploadSim';
import MriUploadSim from './MriUploadSim';
import ResultDashboard from './ResultDashboard';
import { ShieldCheck, Activity, Target, ActivitySquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePatients } from '../context/PatientContext';

export default function AssessmentHub() {
    const { user } = useAuth();
    const { updatePatientData } = usePatients();
    const [step, setStep] = useState('welcome'); // welcome, lifestyle, cognitive, eeg, mri, results
    const [results, setResults] = useState({
        lifestyleData: null,
        lifestyleRisk: null,
        cognitivePerformance: null,
        eegRisk: null,
        mriRisk: null,
        mriPreviewUrl: null
    });

    const handleLifestyleComplete = (score, data) => {
        setResults(prev => ({ ...prev, lifestyleRisk: score, lifestyleData: data }));
        setStep('cognitive');
    };

    const handleCognitiveComplete = (score) => {
        setResults(prev => ({ ...prev, cognitivePerformance: score }));
        setStep('eeg');
    };

    const handleEegComplete = (score) => {
        setResults(prev => ({ ...prev, eegRisk: score }));
        setStep('mri');
    };

    const handleMriComplete = (score, previewUrl) => {
        const finalResults = { ...results, mriRisk: score, mriPreviewUrl: previewUrl };
        setResults(finalResults);
        
        // Save to patient context if logged in
        if (user) {
            updatePatientData(user.id || 'P001', {
                 lifestyleRisk: finalResults.lifestyleRisk,
                 cognitivePerformance: finalResults.cognitivePerformance,
                 mriRisk: finalResults.mriRisk,
                 eegRisk: finalResults.eegRisk,
                 age: finalResults.lifestyleData?.age,
                 cognitiveAge: (finalResults.lifestyleData?.age || 50) + (finalResults.cognitivePerformance < 70 ? 5 : 0),
                 testResults: [
                     ...(user.testResults || []),
                     { 
                         date: new Date().toISOString().split('T')[0], 
                         type: 'Multi-Modal Assessment', 
                         score: 0, // Will be calculated in dashboard but good to have raw data
                         summary: `Comprehensive screening completed. Cognitive Performance: ${finalResults.cognitivePerformance}%` 
                     }
                 ]
            });
        }
        
        setStep('results');
    };

    return (
        <section id="assessment" className="section" style={{ background: 'var(--secondary-gray)', position: 'relative' }}>
            <div className="container">
                {step === 'welcome' && (
                    <div className="glass-card text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <ShieldCheck size={64} color="var(--primary-teal)" style={{ margin: '0 auto 24px' }} />
                        <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Alzaware Clinical Engine</h2>
                        <p style={{ opacity: 0.8, fontSize: '1.2rem', marginBottom: '40px' }}>
                            Begin your interactive multi-modal diagnostic assessment. We will analyze lifestyle factors, cognitive performance, brainwave signals, and structural imaging.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
                            <div style={{ padding: '16px', background: 'var(--white)', borderRadius: 'var(--border-radius-md)' }}>
                                <Activity size={24} color="var(--accent-purple)" style={{ marginBottom: '16px', margin: '0 auto' }} />
                                <h4 style={{ fontSize: '1rem' }}>Lifestyle</h4>
                            </div>
                            <div style={{ padding: '16px', background: 'var(--white)', borderRadius: 'var(--border-radius-md)' }}>
                                <Target size={24} color="var(--primary-teal)" style={{ marginBottom: '16px', margin: '0 auto' }} />
                                <h4 style={{ fontSize: '1rem' }}>Cognitive</h4>
                            </div>
                            <div style={{ padding: '16px', background: 'var(--white)', borderRadius: 'var(--border-radius-md)' }}>
                                <ActivitySquare size={24} color="var(--accent-amber)" style={{ marginBottom: '16px', margin: '0 auto' }} />
                                <h4 style={{ fontSize: '1rem' }}>EEG Signals</h4>
                            </div>
                            <div style={{ padding: '16px', background: 'var(--white)', borderRadius: 'var(--border-radius-md)' }}>
                                <ShieldCheck size={24} color="var(--primary-teal)" style={{ marginBottom: '16px', margin: '0 auto' }} />
                                <h4 style={{ fontSize: '1rem' }}>MRI Scan</h4>
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={() => setStep('lifestyle')} style={{ fontSize: '1.2rem', padding: '16px 32px' }}>
                            Start Assessment Protocol
                        </button>
                    </div>
                )}

                {step === 'lifestyle' && <LifestyleForm onComplete={handleLifestyleComplete} />}
                {step === 'cognitive' && <CognitiveMicroTests chronologicalAge={results.lifestyleData?.age || 50} onComplete={handleCognitiveComplete} />}
                {step === 'eeg' && <EegUploadSim onComplete={handleEegComplete} />}
                {step === 'mri' && <MriUploadSim onComplete={handleMriComplete} />}
                {step === 'results' && <ResultDashboard results={results} />}
            </div>
        </section>
    );
}
