import React, { useState } from 'react';
import { calculateLifestyleRisk, getRiskCategory } from '../lib/riskEngine';
import { Activity } from 'lucide-react';

export default function LifestyleForm({ onComplete }) {
    const [formData, setFormData] = useState({
        age: 50,
        sleep: 7,
        exercise: 'moderate',
        smoking: false,
        familyHistory: false,
        cognitiveActivity: 'moderate'
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const score = calculateLifestyleRisk(formData);
        setResult(score);
    };

    if (result !== null) {
        const category = getRiskCategory(result);
        return (
            <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Lifestyle Risk Analysis Complete</h3>
                <div style={{ padding: '24px', background: 'var(--secondary-gray)', borderRadius: 'var(--border-radius-md)', marginBottom: '24px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-navy)', lineHeight: 1 }}>{result}%</div>
                    <div style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '8px' }}>Lifestyle Risk Score</div>
                    <div style={{ color: 'var(--accent-amber)', fontWeight: 'bold', fontSize: '1.2rem' }}>{category.level}</div>
                    <p style={{ marginTop: '16px', fontStyle: 'italic', opacity: 0.8 }}>"{category.text}"</p>
                </div>
                <button className="btn btn-primary" onClick={() => onComplete(result, formData)}>
                    Continue to Cognitive Screening
                </button>
            </div>
        );
    }

    return (
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Activity size={32} color="var(--primary-teal)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem' }}>Lifestyle Risk Assessment</h3>
                <p style={{ opacity: 0.7 }}>Please provide current lifestyle and demographic inputs.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Age</label>
                        <input type="number" name="age" min="1" max="120" value={formData.age} onChange={handleChange} required
                            style={{ width: '100%', padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 'var(--border-radius-sm)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Sleep (hrs/night)</label>
                        <input type="number" name="sleep" min="1" max="24" value={formData.sleep} onChange={handleChange} required
                            style={{ width: '100%', padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 'var(--border-radius-sm)' }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Weekly Physical Activity</label>
                    <select name="exercise" value={formData.exercise} onChange={handleChange}
                        style={{ width: '100%', padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 'var(--border-radius-sm)', background: 'var(--white)' }}>
                        <option value="none">None / Sedentary</option>
                        <option value="low">Low (1-2 times/week)</option>
                        <option value="moderate">Moderate (3-4 times/week)</option>
                        <option value="high">High (5+ times/week)</option>
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--secondary-gray)', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer' }}>
                        <input type="checkbox" name="smoking" checked={formData.smoking} onChange={handleChange} />
                        <span style={{ fontWeight: 500 }}>Current Smoker</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--secondary-gray)', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer' }}>
                        <input type="checkbox" name="familyHistory" checked={formData.familyHistory} onChange={handleChange} />
                        <span style={{ fontWeight: 500 }}>Family History (Alzheimer's)</span>
                    </label>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Cognitive Activity (Puzzles, Reading, Learning)</label>
                    <select name="cognitiveActivity" value={formData.cognitiveActivity} onChange={handleChange}
                        style={{ width: '100%', padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 'var(--border-radius-sm)', background: 'var(--white)' }}>
                        <option value="none">Rare or None</option>
                        <option value="low">Occasional</option>
                        <option value="moderate">Regular</option>
                        <option value="high">Frequent / Daily</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }}>
                    Calculate Risk Score
                </button>
            </form>
        </div>
    );
}
