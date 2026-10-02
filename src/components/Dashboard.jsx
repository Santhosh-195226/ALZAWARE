import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, BrainCircuit, Activity, FileText } from 'lucide-react';

const trendData = [
    { name: 'Jan', mriScore: 20, eegScore: 15, mmse: 28 },
    { name: 'Mar', mriScore: 22, eegScore: 18, mmse: 27 },
    { name: 'Jun', mriScore: 25, eegScore: 22, mmse: 26 },
    { name: 'Sep', mriScore: 30, eegScore: 28, mmse: 25 },
    { name: 'Dec', mriScore: 35, eegScore: 34, mmse: 24 },
];

export default function Dashboard() {
    const [gaugeValue, setGaugeValue] = useState(0);

    useEffect(() => {
        // Animate gauge on load
        const timer = setTimeout(() => {
            setGaugeValue(68); // 68% Risk
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const offset = 200 - (gaugeValue / 100) * 200; // Assuming 200 is total dash

    return (
        <section id="dashboard" className="section" style={{ background: 'var(--secondary-gray)' }}>
            <div className="container">

                <div style={{ marginBottom: '40px' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Patient Dashboard</h2>
                    <p style={{ opacity: 0.8 }}>Comprehensive unified view of multimodal diagnostic results.</p>
                </div>

                <div className="dashboard-grid">

                    {/* Risk Score */}
                    <div className="dashboard-card col-span-4" style={{ textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <AlertCircle color="var(--accent-amber)" />
                            Overall AI Risk Score
                        </h3>

                        <div className="gauge-container">
                            <svg viewBox="0 0 100 100" className="gauge-svg">
                                <path className="gauge-bg" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" strokeWidth="8" />
                                <path
                                    className="gauge-progress"
                                    d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                                    strokeWidth="8"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (gaugeValue / 100 * 251.2)}
                                />
                            </svg>
                            <div className="gauge-text">
                                <span className="gauge-value">{gaugeValue}%</span>
                                <br />
                                <span style={{ fontSize: '0.9rem', opacity: 0.7, color: 'var(--accent-amber)', fontWeight: 'bold' }}>Medium Risk</span>
                            </div>
                        </div>

                        <p style={{ marginTop: '24px', opacity: 0.8, fontSize: '0.9rem' }}>
                            Calculated using weighted multimodal inputs: MRI (40%), EEG (35%), Cognition (25%)
                        </p>
                    </div>

                    {/* MRI Analysis */}
                    <div className="dashboard-card col-span-4">
                        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <BrainCircuit color="var(--primary-teal)" />
                            MRI Regional Analysis
                        </h3>
                        <div style={{ background: '#0B1F3B', borderRadius: 'var(--border-radius-md)', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: '16px' }}>
                            <div style={{ position: 'absolute', top: '10%', left: '20%', width: '40px', height: '40px', background: 'radial-gradient(circle, var(--accent-amber) 0%, transparent 70%)', opacity: 0.5, animation: 'pulse 2s infinite' }}></div>
                            <div style={{ position: 'absolute', top: '40%', right: '30%', width: '60px', height: '60px', background: 'radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)', opacity: 0.4 }}></div>
                            <BrainCircuit size={80} color="var(--primary-teal)" style={{ opacity: 0.3 }} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ opacity: 0.8 }}>Hippocampal Vol.</span>
                                <span style={{ fontWeight: 'bold' }}>2.8 cm³</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ opacity: 0.8 }}>Cortical Thickness</span>
                                <span style={{ fontWeight: 'bold', color: 'var(--accent-amber)' }}>2.4 mm (Borderline)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ opacity: 0.8 }}>Ventricle Size</span>
                                <span style={{ fontWeight: 'bold', color: 'var(--accent-green)' }}>Normal</span>
                            </div>
                        </div>
                    </div>

                    {/* Cognitive & EEG */}
                    <div className="dashboard-card col-span-4">
                        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Activity color="var(--accent-purple)" />
                            Neurological Profile
                        </h3>

                        <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                            <div style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '4px' }}>MMSE Cognitive Score</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-navy)' }}>
                                24<span style={{ fontSize: '1rem', opacity: 0.5 }}>/30</span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--accent-amber)' }}>Mild Cognitive Impairment Detected</div>
                        </div>

                        <div>
                            <div style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '8px' }}>EEG Power Ratio (Theta/Alpha)</div>
                            <div style={{ height: '8px', background: 'var(--secondary-gray)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: '65%', background: 'linear-gradient(90deg, var(--accent-green), var(--accent-amber))' }}></div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.8rem', opacity: 0.6 }}>
                                <span>Healthy</span>
                                <span>Abnormal</span>
                            </div>
                        </div>
                    </div>

                    {/* Trend Monitoring */}
                    <div className="dashboard-card col-span-8">
                        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Trend Monitoring (12 Months)
                        </h3>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="mriScore" name="MRI Risk" stroke="var(--primary-teal)" strokeWidth={3} />
                                    <Line type="monotone" dataKey="eegScore" name="EEG Risk" stroke="var(--accent-purple)" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Doctor Notes */}
                    <div className="dashboard-card col-span-4" style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText color="var(--primary-navy)" />
                            Clinical Notes
                        </h3>
                        <textarea
                            style={{
                                flex: 1,
                                width: '100%',
                                resize: 'none',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: 'var(--border-radius-sm)',
                                padding: '16px',
                                fontFamily: 'var(--font-body)',
                                minHeight: '200px'
                            }}
                            placeholder="Enter patient observations, follow-up recommendations, or clinical interpretations..."
                            defaultValue="Patient reports minor memory lapses. MMSE indicates MCI. MRI scan shows borderline cortical thinning in medial temporal lobe. Recommend follow-up scan in 6 months."
                        ></textarea>
                        <button className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>Save Notes</button>
                    </div>

                </div>
            </div>
        </section>
    );
}
