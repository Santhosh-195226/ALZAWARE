import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BrainCircuit, LogOut, User, LayoutDashboard, Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { user, userType, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isAuthPage = ['/login', '/signup', '/doctor/login'].includes(location.pathname);
    const isLandingPage = location.pathname === '/';
    const isDoctorFlow = location.pathname.startsWith('/doctor');

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="logo">
                    <BrainCircuit size={32} color="var(--primary-teal)" />
                    <span>Alzaware</span>
                </Link>

                {!isAuthPage && (
                    <div className="nav-links">
                        {isLandingPage ? (
                            <>
                                <a href="#how">How it Works</a>
                                <a href="#features">Features</a>
                                <a href="#research">Research</a>
                                <Link to="/login" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                                    Get Started
                                </Link>
                            </>
                        ) : user ? (
                            <>
                                {userType === 'doctor' ? (
                                    <Link to="/doctor/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <LayoutDashboard size={18} /> Clinician Portal
                                    </Link>
                                ) : (
                                    <>
                                        <a href="#assessment">Assessment Hub</a>
                                        <a href="#results">Results</a>
                                    </>
                                )}
                                
                                <div style={{ height: '24px', width: '1px', background: 'rgba(0,0,0,0.1)', margin: '0 8px' }}></div>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ textAlign: 'right', lineHeight: '1' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.7rem', opacity: '0.6', textTransform: 'capitalize' }}>{userType}</div>
                                    </div>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--secondary-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {userType === 'doctor' ? <Stethoscope size={18} color="var(--primary-navy)" /> : <User size={18} color="var(--primary-teal)" />}
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#E53935', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', fontWeight: '600', padding: '8px' }}
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                                Client Portal
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
