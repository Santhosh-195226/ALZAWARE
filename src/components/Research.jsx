import React from 'react';
import { BookOpen, Users } from 'lucide-react';

export default function Research() {
    return (
        <section id="research" className="section" style={{ background: 'var(--primary-navy)', color: 'var(--white)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'center' }}>

                <div style={{ paddingRight: '32px' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '24px', background: 'var(--gradient-ai)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Clinical Impact & Research
                    </h2>
                    <p style={{ opacity: 0.8, fontSize: '1.1rem', marginBottom: '24px', lineHeight: 1.8 }}>
                        Alzheimer’s affects millions worldwide. Early detection improves treatment planning, helps doctors detect patterns years earlier, and supports preventive healthcare.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', opacity: 0.9 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <Users size={20} color="var(--primary-teal)" />
                            Supports proactive intervention
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <BookOpen size={20} color="var(--primary-teal)" />
                            Combines leading modalities: MRI, EEG, & Cognitive Tests
                        </li>
                    </ul>
                    <button className="btn btn-secondary">
                        Read Our Research Papers
                    </button>
                </div>

                <div className="glass-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--border-radius-md)', display: 'flex', flexDirection: 'column', padding: '24px', gap: '16px' }}>
                        <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '8px' }}>
                            <div style={{ width: '40px', height: '20%', background: 'var(--primary-teal)', borderRadius: '4px 4px 0 0' }}></div>
                            <div style={{ width: '40px', height: '45%', background: 'var(--primary-teal)', borderRadius: '4px 4px 0 0' }}></div>
                            <div style={{ width: '40px', height: '60%', background: 'var(--primary-teal)', borderRadius: '4px 4px 0 0' }}></div>
                            <div style={{ width: '40px', height: '85%', background: 'var(--accent-purple)', borderRadius: '4px 4px 0 0' }}></div>
                            <div style={{ width: '40px', height: '100%', background: 'var(--accent-purple)', borderRadius: '4px 4px 0 0' }}></div>
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.7, textAlign: 'center' }}>Diagnostic accuracy improvement over years</div>
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="cta-section">
                    <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Start Detecting Alzheimer’s Earlier.</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 40px' }}>
                        Join research clinics and practitioners leading the transition toward proactive neuro-care.
                    </p>
                    <div className="hero-actions" style={{ justifyContent: 'center' }}>
                        <button className="btn btn-secondary">Upload MRI</button>
                        <button className="btn btn-secondary">Upload EEG</button>
                        <button className="btn btn-outline" style={{ borderColor: 'var(--white)', color: 'var(--white)' }}>Contact Research Team</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
