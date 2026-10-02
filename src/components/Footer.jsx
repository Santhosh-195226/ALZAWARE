import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <a href="#" className="logo" style={{ color: 'var(--white)', marginBottom: '16px', display: 'flex' }}>
                            <BrainCircuit size={32} color="var(--primary-teal)" />
                            Alzaware
                        </a>
                        <p style={{ opacity: 0.7, fontSize: '0.9rem', maxWidth: '250px' }}>
                            AI-powered proactive diagnostics platform for early Alzheimer’s disease detection.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '16px', color: 'var(--white)' }}>Company</h4>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">About Alzaware</a></li>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">Research Papers</a></li>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">Contact</a></li>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">Medical Disclaimer</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '16px', color: 'var(--white)' }}>Product</h4>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">MRI Analysis</a></li>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">EEG Processing</a></li>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">Cognitive Assessment</a></li>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">Hospital Integration</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '16px', color: 'var(--white)' }}>Legal</h4>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">Privacy Policy</a></li>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">HIPAA Compliance</a></li>
                            <li style={{ marginBottom: '8px' }}><a href="#" className="footer-link">Data Security</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', opacity: 0.5, fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} Alzaware. For clinical research and conceptual demonstration purposes.
                </div>
            </div>
        </footer>
    );
}
