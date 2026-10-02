import React from 'react';
import { Scan, ActivitySquare, HeartPulse, Activity, LayoutDashboard } from 'lucide-react';

const features = [
    {
        icon: <Scan size={24} />,
        title: "MRI Scan Analysis",
        desc: "Upload MRI images and detect early Alzheimer's biomarkers using CNN-based AI. Visualizes affected brain regions in high detail.",
    },
    {
        icon: <ActivitySquare size={24} />,
        title: "EEG Brainwave Analysis",
        desc: "Upload EEG recordings to analyze abnormal neural patterns associated with early neurodegenerative changes.",
    },
    {
        icon: <HeartPulse size={24} />,
        title: "Lifestyle Risk Analysis",
        desc: "Collect lifestyle inputs like sleep, physical activity, diet, and cognitive activity. Predict Alzheimer’s risk based on combined factors.",
    },
    {
        icon: <Activity size={24} />,
        title: "AI Risk Score",
        desc: "Generate a risk probability score with visual gauge charts combining all multimodal inputs.",
    },
    {
        icon: <LayoutDashboard size={24} />,
        title: "Doctor Dashboard",
        desc: "Healthcare professionals can view patient history, scan results, alerts, and record observations in one unified view.",
    }
];

export default function Features() {
    return (
        <section id="features" className="section" style={{ background: 'var(--white)' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <div>
                        <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Platform Features</h2>
                        <p style={{ maxWidth: '500px', opacity: 0.8 }}>Advanced capabilities designed for both proactive patients and healthcare professionals.</p>
                    </div>
                    <button className="btn btn-outline">View Technical Docs</button>
                </div>

                <div className="features-grid">
                    {features.map((feature, idx) => (
                        <div key={idx} className="glass-card feature-card" style={{ background: 'var(--secondary-gray)', border: 'none' }}>
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem' }}>{feature.title}</h3>
                            <p style={{ opacity: 0.75, fontSize: '0.95rem', flex: 1 }}>{feature.desc}</p>

                            <a href="#" style={{ color: 'var(--primary-teal)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '16px' }}>
                                Learn more &rarr;
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
