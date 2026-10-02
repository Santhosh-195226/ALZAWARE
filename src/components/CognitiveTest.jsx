import React, { useState } from 'react';
import { PenTool, CheckSquare, Brain, ArrowRight } from 'lucide-react';

export default function CognitiveTest() {
    const [started, setStarted] = useState(false);
    const [step, setStep] = useState(0);

    const testSteps = [
        {
            q: 'Orientation: What is the current year, season, date, day, and month?',
            type: 'inputs',
            inputs: ['Year', 'Season', 'Date', 'Day', 'Month']
        },
        {
            q: 'Registration: Listen to these 3 words and repeat them back immediately.',
            words: ['Apple', 'Penny', 'Table'],
            type: 'repeat'
        },
        {
            q: 'Attention/Calculation: Spell the word "WORLD" backwards.',
            type: 'input',
            input: 'W-O-R-L-D backwards'
        },
        {
            q: 'Recall: Do you remember the 3 words from earlier?',
            type: 'checkboxes',
            options: ['Apple', 'Penny', 'Table', 'Other']
        },
        {
            q: 'Language/Drawing: Please copy the intersecting pentagons design below.',
            type: 'drawing'
        }
    ];

    return (
        <section id="cognitive" className="section" style={{ background: 'var(--white)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Cognitive Assessment</h2>
                    <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                        Interactive Mini Mental State Examination (MMSE) designed to evaluate cognitive function natively in the browser.
                    </p>
                </div>

                {!started ? (
                    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', background: 'var(--secondary-gray)', border: 'none' }}>
                        <Brain size={64} color="var(--primary-teal)" style={{ margin: '0 auto 24px' }} />
                        <h3 style={{ marginBottom: '16px' }}>Begin MMSE Protocol</h3>
                        <p style={{ opacity: 0.8, marginBottom: '32px' }}>
                            This test takes approximately 5-10 minutes. Ensure the patient is in a quiet environment free from distractions.
                        </p>
                        <button className="btn btn-primary" onClick={() => setStarted(true)}>
                            Start Assessment
                            <ArrowRight size={18} />
                        </button>
                    </div>
                ) : step < testSteps.length ? (
                    <div className="test-interface">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', opacity: 0.6 }}>
                            <span>Step {step + 1} of {testSteps.length}</span>
                            <span>MMSE Protocol</span>
                        </div>
                        <h3 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>{testSteps[step].q}</h3>

                        <div style={{ marginBottom: '32px' }}>
                            {testSteps[step].type === 'inputs' && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    {testSteps[step].inputs.map((inp, i) => (
                                        <input key={i} type="text" placeholder={inp} style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 'var(--border-radius-sm)', width: '100%' }} />
                                    ))}
                                </div>
                            )}

                            {testSteps[step].type === 'repeat' && (
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                    {testSteps[step].words.map((w, i) => (
                                        <div key={i} style={{ padding: '16px 24px', background: 'var(--secondary-mint)', borderRadius: 'var(--border-radius-sm)', fontWeight: 'bold' }}>
                                            {w}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {testSteps[step].type === 'input' && (
                                <input type="text" placeholder={testSteps[step].input} style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 'var(--border-radius-sm)', width: '100%', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '8px' }} />
                            )}

                            {testSteps[step].type === 'checkboxes' && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    {testSteps[step].options.map((opt, i) => (
                                        <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'var(--secondary-gray)', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer' }}>
                                            <input type="checkbox" />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            )}

                            {testSteps[step].type === 'drawing' && (
                                <div style={{ height: '200px', border: '2px dashed rgba(0,0,0,0.2)', borderRadius: 'var(--border-radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.4)', flexDirection: 'column', gap: '12px' }}>
                                    <PenTool size={32} />
                                    <span>Digital Canvas Interface (Touch/Draw enabled)</span>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                                Next
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', background: 'var(--secondary-gray)', border: 'none' }}>
                        <CheckSquare size={64} color="var(--accent-green)" style={{ margin: '0 auto 24px' }} />
                        <h3 style={{ marginBottom: '16px' }}>Assessment Complete</h3>

                        <div style={{ padding: '24px', background: 'var(--white)', borderRadius: 'var(--border-radius-md)', marginBottom: '32px' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-navy)', lineHeight: 1 }}>24</div>
                            <div style={{ opacity: 0.5, fontSize: '0.9rem', marginBottom: '8px' }}>/ 30 Points</div>
                            <div style={{ color: 'var(--accent-amber)', fontWeight: 'bold' }}>Mild Cognitive Impairment</div>
                        </div>

                        <button className="btn btn-primary" onClick={() => { setStarted(false); setStep(0); }}>
                            Send to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
