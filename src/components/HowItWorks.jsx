import React from 'react';
import { Image, Brain, Cpu, FileWarning } from 'lucide-react';

const steps = [
    {
        icon: <Image size={40} />,
        title: 'Upload MRI Scan',
        desc: 'Doctors or clinics upload brain MRI images.',
    },
    {
        icon: <Brain size={40} />,
        title: 'EEG & Cognitive Testing',
        desc: 'Patients complete a cognitive screening test and upload EEG brainwave recordings.',
    },
    {
        icon: <Cpu size={40} />,
        title: 'AI Analysis',
        desc: 'Deep learning models analyze MRI structures, EEG signals, and cognitive test results.',
    },
    {
        icon: <FileWarning size={40} />,
        title: 'Risk Prediction',
        desc: 'System provides Alzheimer’s risk score and actionable insights.',
    },
];

export default function HowItWorks() {
    return (
        <section id="how" className="section bg-white">
            <div className="container">
                <div className="text-center mb-8">
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>How Alzaware Works</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--primary-navy)', opacity: 0.8 }}>
                        A comprehensive, multi-modal approach to early Alzheimer's detection combining state-of-the-art AI with clinical tools.
                    </p>
                </div>

                <div className="steps-grid">
                    {steps.map((step, idx) => (
                        <div key={idx} className="step-card glass-card">
                            <div className="step-number">{idx + 1}</div>
                            <div className="step-icon">
                                {step.icon}
                            </div>
                            <h3 style={{ marginBottom: '16px' }}>{step.title}</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
