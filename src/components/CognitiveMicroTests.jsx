import React, { useState, useEffect, useRef } from 'react';
import { BrainCircuit, Clock, Eye, Puzzle, ArrowRight } from 'lucide-react';

export default function CognitiveMicroTests({ chronologicalAge, onComplete }) {
    const [phase, setPhase] = useState('start'); // start, memory_learn, memory_test, reaction, pattern, result
    const [scores, setScores] = useState({ memory: 0, reaction: 0, pattern: 0 });
    const [memoryInput, setMemoryInput] = useState('');
    const [reactionTime, setReactionTime] = useState(0);
    const [patternInput, setPatternInput] = useState('');

    // memory state
    const targetWords = ['APPLE', 'TABLE', 'PENNY'];
    const [timeLeft, setTimeLeft] = useState(5);

    // reaction state
    const [waitingForStimulus, setWaitingForStimulus] = useState(false);
    const [stimulusActive, setStimulusActive] = useState(false);
    const [reactionStartTime, setReactionStartTime] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (phase === 'memory_learn') {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setPhase('reaction');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [phase]);

    // Handle reaction test logic
    const startReactionTest = () => {
        setWaitingForStimulus(true);
        setStimulusActive(false);

        // Random delay between 1 and 3 seconds
        const delay = Math.floor(Math.random() * 2000) + 1000;
        timeoutRef.current = setTimeout(() => {
            setWaitingForStimulus(false);
            setStimulusActive(true);
            setReactionStartTime(Date.now());
        }, delay);
    };

    const handleStimulusClick = () => {
        if (stimulusActive) {
            const endTime = Date.now();
            const timeTaken = endTime - reactionStartTime;
            setReactionTime(timeTaken);
            setStimulusActive(false);

            // Calculate score based on reaction time (e.g. < 300ms is perfect)
            let score = 0;
            if (timeTaken < 300) score = 100;
            else if (timeTaken < 500) score = 80;
            else if (timeTaken < 800) score = 60;
            else score = 40;

            setScores(prev => ({ ...prev, reaction: score }));
            setTimeout(() => setPhase('pattern'), 1000);
        } else if (waitingForStimulus) {
            // Clicked too early
            clearTimeout(timeoutRef.current);
            alert('You clicked too early! Try again.');
            startReactionTest();
        }
    };

    const submitPattern = () => {
        // Correct answer is "A"
        const score = patternInput.toUpperCase() === 'A' ? 100 : 0;
        setScores(prev => ({ ...prev, pattern: score }));
        setPhase('memory_test');
    };

    const submitMemory = () => {
        const inputs = memoryInput.toUpperCase().split(',').map(s => s.trim());
        let correct = 0;
        targetWords.forEach(w => {
            if (inputs.includes(w)) correct++;
        });
        const score = (correct / 3) * 100;
        setScores(prev => ({ ...prev, memory: score }));
        setPhase('result');
    };

    const handleComplete = () => {
        const totalScore = (scores.memory + scores.reaction + scores.pattern) / 3;
        onComplete(Math.round(totalScore));
    }

    if (phase === 'start') {
        return (
            <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <BrainCircuit size={48} color="var(--accent-purple)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Cognitive Micro-Screening</h3>
                <p style={{ opacity: 0.8, marginBottom: '24px' }}>
                    This quick 3-stage assessment measures your memory retention, reaction time, and pattern recognition.
                </p>
                <button className="btn btn-primary" onClick={() => { setPhase('memory_learn'); setTimeLeft(5); }}>
                    Begin Assessment
                </button>
            </div>
        );
    }

    if (phase === 'memory_learn') {
        return (
            <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Eye size={48} color="var(--primary-teal)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Task 1: Memorization</h3>
                <p style={{ opacity: 0.8, marginBottom: '24px' }}>Remember these 3 words. You will be asked to recall them later.</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
                    {targetWords.map(w => (
                        <div key={w} style={{ padding: '16px 32px', background: 'var(--secondary-mint)', borderRadius: 'var(--border-radius-sm)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {w}
                        </div>
                    ))}
                </div>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-amber)' }}>
                    Hiding in {timeLeft} seconds...
                </div>
            </div>
        );
    }

    if (phase === 'reaction') {
        return (
            <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={48} color="var(--accent-amber)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Task 2: Reaction Time</h3>
                <p style={{ opacity: 0.8, marginBottom: '32px' }}>Click the red circle as soon as it appears.</p>

                {!waitingForStimulus && !stimulusActive && reactionTime === 0 && (
                    <button className="btn btn-primary" onClick={startReactionTest}>Start Reaction Test</button>
                )}

                {waitingForStimulus && (
                    <div style={{ padding: '24px', background: 'var(--secondary-gray)', width: '100%', borderRadius: 'var(--border-radius-md)' }}>
                        <p>Wait for it...</p>
                    </div>
                )}

                {stimulusActive && (
                    <div
                        onClick={handleStimulusClick}
                        style={{ width: '120px', height: '120px', background: '#ff4d4f', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 20px rgba(255, 77, 79, 0.5)' }}
                    ></div>
                )}

                {reactionTime > 0 && (
                    <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        Reaction time: {reactionTime} ms
                    </div>
                )}
            </div>
        );
    }

    if (phase === 'pattern') {
        return (
            <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Puzzle size={48} color="var(--primary-teal)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Task 3: Pattern Recognition</h3>
                <p style={{ opacity: 0.8, marginBottom: '24px' }}>Identify the missing letter in the sequence.</p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', marginBottom: '32px', fontSize: '2rem', fontWeight: 'bold', letterSpacing: '8px' }}>
                    <span>Z</span> <span>X</span> <span>V</span> <span>T</span> <span>R</span> <span>P</span> <span>N</span> <span>L</span> <span>J</span> <span>H</span> <span>F</span> <span>D</span> <span>B</span> <span>?</span>
                </div>

                <input type="text" value={patternInput} onChange={e => setPatternInput(e.target.value)} maxLength={1} placeholder="?"
                    style={{ padding: '16px', width: '80px', textAlign: 'center', fontSize: '1.5rem', border: '2px solid var(--primary-teal)', borderRadius: 'var(--border-radius-sm)', marginBottom: '24px' }} />

                <div>
                    <button className="btn btn-primary" onClick={submitPattern}>Next</button>
                </div>
            </div>
        );
    }

    if (phase === 'memory_test') {
        return (
            <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <BrainCircuit size={48} color="var(--accent-purple)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Final Task: Recall</h3>
                <p style={{ opacity: 0.8, marginBottom: '24px' }}>Type the 3 words you were asked to memorize earlier. Separate by commas.</p>

                <input type="text" value={memoryInput} onChange={e => setMemoryInput(e.target.value)} placeholder="Word 1, Word 2, Word 3"
                    style={{ padding: '16px', width: '100%', fontSize: '1.2rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 'var(--border-radius-sm)', marginBottom: '24px' }} />

                <button className="btn btn-primary" onClick={submitMemory}>Complete Assessment</button>
            </div>
        );
    }

    if (phase === 'result') {
        const totalScore = Math.round((scores.memory + scores.reaction + scores.pattern) / 3);
        const cogRiskIndicator = totalScore < 60 ? 'Warning: Significant cognitive age deviation' : 'Normal cognitive aging profile';
        // Calculate estimated cognitive age
        // If chron is 50, and score is 100, cognitive age is 45.
        // If chron is 50, and score is 40, cognitive age is 62.
        // Formula: Cognitive Age = ChronologicalAge + ( (100 - Score) / 10 ) * 3 - 5
        const ageOffset = (((100 - totalScore) / 10) * 3) - 5;
        const cognitiveAge = Math.round(chronologicalAge + ageOffset);

        return (
            <div className="glass-card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Cognitive Performance Results</h3>
                <p style={{ opacity: 0.7, marginBottom: '32px' }}>Multi-modal micro-assessment complete.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                    <div style={{ padding: '16px', background: 'var(--secondary-mint)', borderRadius: 'var(--border-radius-md)' }}>
                        <div style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '4px' }}>Chronological Age</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-navy)' }}>{chronologicalAge}</div>
                    </div>
                    <div style={{ padding: '16px', background: (cognitiveAge > chronologicalAge + 5) ? 'rgba(244, 180, 0, 0.2)' : 'var(--secondary-mint)', borderRadius: 'var(--border-radius-md)' }}>
                        <div style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '4px' }}>Cognitive Age</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-navy)' }}>{Math.max(20, cognitiveAge)}</div>
                    </div>
                </div>

                <div style={{ marginBottom: '32px', textAlign: 'left', background: 'var(--secondary-gray)', padding: '24px', borderRadius: 'var(--border-radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Performance Score</span>
                        <strong>{totalScore} / 100</strong>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                        <div style={{ width: `${totalScore}%`, height: '100%', background: 'var(--primary-teal)' }}></div>
                    </div>
                    <div style={{ color: totalScore < 60 ? 'var(--accent-amber)' : 'var(--accent-green)', fontWeight: 500 }}>
                        {cogRiskIndicator}
                    </div>
                </div>

                <button className="btn btn-primary" onClick={handleComplete}>
                    Proceed to Imaging Upload <ArrowRight size={18} />
                </button>
            </div>
        );
    }

    return null;
}
