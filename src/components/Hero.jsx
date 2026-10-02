import React from 'react';
import { Upload, Activity, LayoutDashboard, Info } from 'lucide-react';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content animate-fade-in">
                    <h1>
                        Early Alzheimer's Detection <br />
                        <span className="text-gradient">Powered by AI</span>
                    </h1>
                    <p>
                        Alzaware uses MRI scans, EEG brainwave signals, and lifestyle intelligence to detect early signs of Alzheimer's disease and assist doctors in proactive diagnosis.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary">
                            <Upload size={20} />
                            Upload MRI Scan
                        </button>
                        <button className="btn btn-secondary">
                            <Activity size={20} />
                            Try Cognitive Test
                        </button>
                        <button className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
                            <LayoutDashboard size={20} />
                            Explore Dashboard
                        </button>
                        <button className="btn btn-outline" style={{ borderColor: 'transparent', color: 'rgba(255,255,255,0.8)' }}>
                            <Info size={20} />
                            Learn How It Works
                        </button>
                    </div>
                </div>
                <div className="hero-visual animate-float">
                    {/* A glowing brain representation */}
                    <div className="glass-card" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <svg viewBox="0 0 200 200" className="brain-network-illustration" style={{ filter: 'drop-shadow(0 0 20px rgba(108, 99, 255, 0.5))' }}>
                            <path d="M100 20 C60 20, 30 50, 20 90 C20 140, 50 170, 100 180 C150 170, 180 140, 180 90 C170 50, 140 20, 100 20 Z" fill="none" stroke="var(--primary-teal)" strokeWidth="2" strokeDasharray="5,5" />
                            <path d="M100 30 C70 30, 45 55, 35 90 C35 130, 60 155, 100 165 C140 155, 165 130, 165 90 C155 55, 130 30, 100 30 Z" fill="none" stroke="var(--accent-purple)" strokeWidth="3" opacity="0.7" />

                            <circle cx="100" cy="60" r="4" fill="var(--white)" />
                            <circle cx="130" cy="80" r="3" fill="var(--secondary-mint)" />
                            <circle cx="70" cy="80" r="5" fill="var(--primary-teal)" />
                            <circle cx="140" cy="110" r="4" fill="var(--accent-purple)" />
                            <circle cx="60" cy="110" r="3" fill="var(--white)" />
                            <circle cx="100" cy="130" r="6" fill="var(--accent-purple)" />
                            <circle cx="85" cy="150" r="3" fill="var(--primary-teal)" />
                            <circle cx="115" cy="150" r="4" fill="var(--secondary-mint)" />

                            <line x1="100" y1="60" x2="130" y2="80" stroke="var(--white)" strokeWidth="1" opacity="0.5" />
                            <line x1="100" y1="60" x2="70" y2="80" stroke="var(--white)" strokeWidth="1" opacity="0.5" />
                            <line x1="130" y1="80" x2="140" y2="110" stroke="var(--white)" strokeWidth="1" opacity="0.5" />
                            <line x1="70" y1="80" x2="60" y2="110" stroke="var(--white)" strokeWidth="1" opacity="0.5" />
                            <line x1="140" y1="110" x2="100" y2="130" stroke="var(--white)" strokeWidth="1" opacity="0.5" />
                            <line x1="60" y1="110" x2="100" y2="130" stroke="var(--white)" strokeWidth="1" opacity="0.5" />
                            <line x1="100" y1="130" x2="85" y2="150" stroke="var(--white)" strokeWidth="1" opacity="0.5" />
                            <line x1="100" y1="130" x2="115" y2="150" stroke="var(--white)" strokeWidth="1" opacity="0.5" />

                            <circle cx="100" cy="100" r="2" fill="var(--accent-amber)" />
                            <line x1="100" y1="60" x2="100" y2="100" stroke="var(--white)" strokeWidth="1" opacity="0.3" />
                            <line x1="130" y1="80" x2="100" y2="100" stroke="var(--white)" strokeWidth="1" opacity="0.3" />
                        </svg>
                        <div style={{ textAlign: 'center', marginTop: '16px', fontWeight: 500 }}>AI Neural Network Analysis Active</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
