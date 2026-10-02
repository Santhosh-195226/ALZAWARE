import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    login({ name: 'Patient User', email }, 'patient');
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px', background: 'var(--secondary-gray)' }}>
        <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '48px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--secondary-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <UserCircle size={32} color="var(--primary-teal)" />
          </div>
          <h2 style={{ marginBottom: '8px', color: 'var(--primary-navy)' }}>Patient Login</h2>
          <p style={{ color: '#666', marginBottom: '32px' }}>Welcome back! Please enter your details.</p>

          <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--primary-navy)' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', outline: 'none', transition: 'border-color 0.3s' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--primary-navy)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', pointerEvents: email && password ? 'auto' : 'none', opacity: email && password ? 1 : 0.7 }}>
              <LogIn size={20} /> Sign In
            </button>
          </form>

          <p style={{ marginTop: '24px', color: '#666' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-teal)', fontWeight: 600 }}>Create Account</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
