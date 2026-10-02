import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import AssessmentHub from './components/AssessmentHub';
import FutureModules from './components/FutureModules';
import Research from './components/Research';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';
import './App.css';

// Protected Route for Patient Hub
const PatientRoute = ({ children }) => {
  const { user, userType } = useAuth();
  if (!user || userType !== 'patient') return <Navigate to="/login" />;
  return children;
};

// Protected Route for Doctor Portal
const DoctorRoute = ({ children }) => {
  const { user, userType } = useAuth();
  if (!user || userType !== 'doctor') return <Navigate to="/doctor/login" />;
  return children;
};

// Main Patient Website (Restored Original App Content)
function MainWebsite() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <AssessmentHub />
      <FutureModules />
      <Research />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <PatientProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />

            {/* Patient Routes */}
            <Route path="/dashboard" element={
              <PatientRoute>
                <MainWebsite />
              </PatientRoute>
            } />

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={
              <DoctorRoute>
                <DoctorDashboard />
              </DoctorRoute>
            } />
            
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </PatientProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
