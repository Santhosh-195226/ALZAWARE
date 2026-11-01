
import React, { useState } from 'react';
import { predictRisk } from '../services/api';

const initialForm = {
    Age: '75',
    EDUC: '16',
    SES: '2',
    MMSE: '27',
    eTIV: '1500',
    nWBV: '0.72',
    ASF: '1.15',
    Sex: '0',
};

export default function ModelAssessment() {
    const [form, setForm] = useState(initialForm);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateField = (event) => {
        setForm((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const payload = Object.fromEntries(
                Object.entries(form).map(([key, value]) => [
                    key,
                    Number(value),
                ])
            );

            const prediction = await predictRisk(payload);
            setResult(prediction);
        } catch (err) {
            setError(
                err.message ||
                'Could not connect to the prediction service.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="glass-card" style={{ maxWidth: 850, margin: '0 auto' }}>
                    <h2 className="text-gradient">ALZAWARE AI Risk Assessment</h2>
                    <p>
                        Enter the model's required measurements to request a
                        prediction from the backend.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: 18,
                            marginTop: 24
                        }}>
                            {[
                                { name: 'Age', label: 'Age (years)', min: 1, max: 120, step: 1 },
                                { name: 'EDUC', label: 'Education (years)', min: 0, max: 40, step: 1 },
                                { name: 'SES', label: 'Socioeconomic status (1–5)', min: 1, max: 5, step: 1 },
                                { name: 'MMSE', label: 'Measured MMSE (0–30)', min: 0, max: 30, step: 1 },
                                { name: 'eTIV', label: 'eTIV (MRI-derived)', min: 0.01, step: 'any' },
                                { name: 'nWBV', label: 'nWBV (0–1)', min: 0.01, max: 1, step: 'any' },
                                { name: 'ASF', label: 'ASF (MRI-derived)', min: 0.01, step: 'any' },
                            ].map((field) => (
                                <label key={field.name} style={{ display: 'grid', gap: 8 }}>
                                    <span>{field.label}</span>
                                    <input
                                        name={field.name}
                                        type="number"
                                        min={field.min}
                                        max={field.max}
                                        step={field.step}
                                        value={form[field.name]}
                                        onChange={updateField}
                                        required
                                        style={{
                                            padding: 12,
                                            borderRadius: 8,
                                            border: '1px solid #ccc',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </label>
                            ))}

                            <label style={{ display: 'grid', gap: 8 }}>
                                <span>Sex (use notebook encoding)</span>
                                <select
                                    name="Sex"
                                    value={form.Sex}
                                    onChange={updateField}
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        border: '1px solid #ccc'
                                    }}
                                >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                </select>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ marginTop: 24 }}
                        >
                            {loading ? 'Running model…' : 'Run AI Assessment'}
                        </button>
                    </form>

                    {error && (
                        <p role="alert" style={{ color: '#c62828', marginTop: 20 }}>
                            {error}
                        </p>
                    )}

                    {result && (
                        <div style={{
                            marginTop: 28,
                            padding: 22,
                            borderRadius: 12,
                            background: 'var(--secondary-mint, #e8f7f3)'
                        }}>
                            <h3>Model prediction</h3>

                            <p>
                                <strong>Predicted risk category:</strong>{' '}
                                {result.risk_category}
                            </p>

                            <p>
                                <strong>Estimated MMSE:</strong>{' '}
                                {result.estimated_mmse} / 30
                            </p>

                            <h4>Class probabilities</h4>
                            <ul>
                                {Object.entries(result.class_probabilities || {}).map(
                                    ([label, probability]) => (
                                        <li key={label}>
                                            {label}: {(probability * 100).toFixed(2)}%
                                        </li>
                                    )
                                )}
                            </ul>

                            <p style={{ fontSize: 13, lineHeight: 1.5 }}>
                                {result.disclaimer}
                            </p>
                        </div>
                    )}

                    <p style={{ fontSize: 13, opacity: 0.75, marginTop: 20 }}>
                        Use genuine measurements with the same definitions and
                        encoding as the training dataset. Example values are
                        provided for interface testing only.
                    </p>
                </div>
            </div>
        </section>
    );
}
