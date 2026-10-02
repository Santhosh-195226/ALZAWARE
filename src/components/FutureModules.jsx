import React from 'react';
import { Headset, Smartphone, Building2 } from 'lucide-react';

const futureModules = [
    {
        icon: <Headset size={32} />,
        title: 'Continuous EEG Monitoring',
        desc: 'Integration with wearable EEG headsets for real-time tracking of brainwave patterns in daily life.',
    },
    {
        icon: <Smartphone size={32} />,
        title: 'Remote Cognitive Monitoring',
        desc: 'Periodic mobile cognitive tests and passive voice-analysis for long-term tracking.',
    },
    {
        icon: <Building2 size={32} />,
        title: 'Hospital Integration',
        desc: 'Seamless connection with EHR/EMR hospital systems (HL7 FHIR compliant).',
    }
];

export default function FutureModules() {
    return (
        <section className="section bg-white" style={{ background: 'var(--white)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Upcoming Capabilities</h2>
                    <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                        We're constantly expanding the Alzaware ecosystem to support continuous care and tighter clinical integration.
                    </p>
                </div>

                <div className="features-grid">
                    {futureModules.map((module, idx) => (
                        <div key={idx} className="glass-card flex flex-col items-center text-center" style={{ background: 'var(--secondary-gray)', border: 'none', alignItems: 'center' }}>
                            <div className="feature-icon" style={{ marginBottom: '24px', width: '64px', height: '64px', background: 'var(--secondary-mint)' }}>
                                {module.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>{module.title}</h3>
                            <p style={{ opacity: 0.75, fontSize: '0.95rem' }}>{module.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
