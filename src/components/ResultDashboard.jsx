import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { getFinalCategory } from '../lib/riskEngine';

export default function ResultDashboard({ results }) {
    const [gaugeValue, setGaugeValue] = useState(0);
    const [targetScore, setTargetScore] = useState(0);

    useEffect(() => {
        // Calculate final score
        // Lifestyle Data contains risk directly (0-100)
        // EEG Risk contains risk directly (0-100)
        // MRI Risk contains risk directly (0-100)
        // Cognitive Performance is 0-100 where 100 is best. Risk = 100 - Performance
        const lifestyle = results.lifestyleRisk || 0;
        const cogRisk = 100 - (results.cognitivePerformance || 0);
        const eeg = results.eegRisk || 0;
        const mri = results.mriRisk || 0;

        // Weights: Lifestyle 20%, Cognitive 25%, EEG 25%, MRI 30%
        const finalScore = Math.round((lifestyle * 0.2) + (cogRisk * 0.25) + (eeg * 0.25) + (mri * 0.3));
        setTargetScore(finalScore);

        // Animate gauge
        const timer = setTimeout(() => {
            setGaugeValue(finalScore);
        }, 500);

        return () => clearTimeout(timer);
    }, [results]);

    const offset = 200 - (gaugeValue / 100) * 200; // gauge progress
    const category = getFinalCategory(targetScore);

    let nextStep = 'Continue multi-modal monitoring organically over the next 12 months.';
    if (targetScore > 60) nextStep = 'Recommend immediate EEG or comprehensive clinical MRI evaluation.';
    else if (targetScore > 30) nextStep = 'Recommend formal MMSE clinical screening within 3 months.';

    let currentStageIndex = 0;
    if (targetScore >= 80) currentStageIndex = 4;
    else if (targetScore >= 60) currentStageIndex = 3;
    else if (targetScore >= 40) currentStageIndex = 2;
    else if (targetScore >= 30) currentStageIndex = 1;

    const pipelineStages = [
        'Passive Monitoring',
        'Early Warning',
        'Cognitive Screening',
        'EEG Brainwave Analysis',
        'MRI Structural Imaging'
    ];

    return (
        <section id="results" className="section" style={{ background: 'var(--secondary-gray)' }}>
            <div className="container">

                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Final Multimodal Assessment</h2>
                    <p style={{ opacity: 0.8 }}>Unified predictive report combining lifestyle, cognition, and imaging data.</p>
                </div>

                <div className="dashboard-grid">

                    {/* Final Risk Score */}
                    <div className="dashboard-card col-span-12" style={{ textAlign: 'center', background: 'var(--white)' }}>
                        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <AlertCircle color={category.color} />
                            Alzheimer’s Predictive Risk
                        </h3>

                        <div className="gauge-container" style={{ width: '250px', height: '250px' }}>
                            <svg viewBox="0 0 100 100" className="gauge-svg">
                                <path className="gauge-bg" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" strokeWidth="12" />
                                <path
                                    className="gauge-progress"
                                    d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (gaugeValue / 100 * 251.2)}
                                    style={{ stroke: category.color }}
                                />
                            </svg>
                            <div className="gauge-text">
                                <span className="gauge-value" style={{ fontSize: '3rem' }}>{gaugeValue}%</span>
                                <br />
                                <span style={{ fontSize: '1.2rem', color: category.color, fontWeight: 'bold' }}>
                                    {category.level}
                                </span>
                            </div>
                        </div>

                        <div style={{ marginTop: '32px', padding: '24px', background: 'var(--secondary-mint)', borderRadius: 'var(--border-radius-md)' }}>
                            <div style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px' }}>Recommended Next Step</div>
                            <div style={{ fontWeight: 500, fontSize: '1.2rem', color: 'var(--primary-navy)' }}>{nextStep}</div>
                        </div>
                    </div>

                    {/* Pipeline Visual */}
                    <div className="dashboard-card col-span-12">
                        <h3 style={{ marginBottom: '32px', fontSize: '1.5rem', textAlign: 'center' }}>Diagnostic Pipeline Alignment</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginTop: '40px' }}>
                            {/* Connecting line */}
                            <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '4px', background: 'var(--secondary-gray)', zIndex: 0 }}></div>
                            <div style={{ position: 'absolute', top: '24px', left: '10%', width: `${(currentStageIndex / 4) * 80}%`, height: '4px', background: 'var(--primary-teal)', zIndex: 1, transition: 'width 1s ease' }}></div>

                            {pipelineStages.map((stage, i) => (
                                <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
                                    <div style={{
                                        width: i === currentStageIndex ? '56px' : '48px',
                                        height: i === currentStageIndex ? '56px' : '48px',
                                        borderRadius: '50%',
                                        background: i <= currentStageIndex ? 'var(--primary-teal)' : 'var(--white)',
                                        border: `4px solid ${i <= currentStageIndex ? 'var(--primary-teal)' : 'var(--secondary-gray)'}`,
                                        color: i <= currentStageIndex ? 'var(--white)' : 'rgba(0,0,0,0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 'bold', fontSize: '1.2rem',
                                        boxShadow: i === currentStageIndex ? '0 0 20px rgba(31, 163, 163, 0.4)' : 'none',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        {i + 1}
                                    </div>
                                    <div style={{
                                        marginTop: '16px',
                                        fontSize: '0.9rem',
                                        fontWeight: i === currentStageIndex ? 'bold' : 'normal',
                                        opacity: i === currentStageIndex ? 1 : 0.6,
                                        textAlign: 'center',
                                        maxWidth: '120px'
                                    }}>
                                        {stage}
                                    </div>
                                    {i === currentStageIndex && (
                                        <div style={{ marginTop: '8px', color: 'var(--accent-purple)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            CURRENT RISK STAGE
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
