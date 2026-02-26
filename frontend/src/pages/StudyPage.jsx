import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { generateStudyContent } from '../utils/mockApi';

function MCQCard({ q, index }) {
    const [selected, setSelected] = useState(null);
    const [revealed, setRevealed] = useState(false);

    const handleOption = (key) => {
        if (selected) return;
        setSelected(key);
        setRevealed(true);
    };

    return (
        <div className="mcq-card">
            <div className="mcq-num">{index + 1}</div>
            <div className="mcq-question">{q.question}</div>
            <div className="mcq-options">
                {q.options.map((opt, i) => {
                    const key = String.fromCharCode(65 + i);
                    let cls = 'mcq-option';
                    if (revealed && key === q.correctKey) cls += ' correct';
                    else if (selected === key && key !== q.correctKey) cls += ' selected-wrong';

                    return (
                        <div key={key} className={cls} onClick={() => handleOption(key)}>
                            <div className="option-key">{key}</div>
                            <span>{opt}</span>
                        </div>
                    );
                })}
            </div>

            {revealed && (
                <div className="answer-reveal">
                    <div className="ans-label">Explanation</div>
                    <div className="ans-text">{q.explanation}</div>
                    {q.citation && <span className="citation" style={{ display: 'inline-flex', marginTop: 6 }}>{q.citation}</span>}
                </div>
            )}
        </div>
    );
}

function ShortAnsCard({ q, index }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="short-ans-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
                <div className="mcq-num" style={{ background: '#ebfbee', color: 'var(--accent-green)' }}>{index + 1}</div>
            </div>
            <div className="short-ans-q">{q.question}</div>
            <button
                className={`btn btn-sm ${revealed ? 'btn-ghost' : 'btn-secondary'}`}
                onClick={() => setRevealed(v => !v)}
            >
                {revealed ? 'Hide answer' : 'Show model answer'}
            </button>
            <div className={`short-ans-answer ${revealed ? 'visible' : ''}`}>
                <div style={{ marginBottom: 6 }}>{q.answer}</div>
                {q.citation && <span className="citation">{q.citation}</span>}
            </div>
        </div>
    );
}

export default function StudyPage() {
    const { subjects, activeSubjectId, setActiveSubjectId, activeSubject, setCurrentPage, isSetupComplete } = useApp();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => { setContent(null); }, [activeSubjectId]);

    const generateContent = async () => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setContent(generateStudyContent(activeSubject));
        setLoading(false);
    };

    if (!isSetupComplete) {
        return (
            <div className="page-content">
                <div className="empty-state" style={{ paddingTop: 80 }}>
                    <h3>Setup not complete</h3>
                    <p>Name all 3 subjects before using Study Mode.</p>
                    <button className="btn btn-primary" onClick={() => setCurrentPage('setup')}>Go to Setup</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-content">
            <div className="study-header">
                <div>
                    <div className="study-title">Study Mode</div>
                    <div className="study-subtitle">Practice questions based on your uploaded notes</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                    {subjects.map(s => (
                        <button
                            key={s.id}
                            className={`subject-tab ${activeSubjectId === s.id ? 'active' : ''}`}
                            onClick={() => { setActiveSubjectId(s.id); setContent(null); }}
                        >
                            {s.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 3 }}>{activeSubject?.name}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                            {activeSubject?.files.length > 0
                                ? `${activeSubject.files.length} note file${activeSubject.files.length !== 1 ? 's' : ''} loaded`
                                : 'No files uploaded — questions will be generic'}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-blue)' }}>5</div>
                            <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)' }}>MCQs</div>
                        </div>
                        <div style={{ width: 1, background: 'var(--border)' }} />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-green)' }}>3</div>
                            <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)' }}>Short Ans</div>
                        </div>
                    </div>
                </div>
            </div>

            {!content && !loading && (
                <div className="empty-state" style={{ paddingTop: 32 }}>
                    <h3>Generate practice questions</h3>
                    <p>5 MCQs and 3 short-answer questions based on your {activeSubject?.name} notes.</p>
                    <button className="btn btn-primary btn-lg" onClick={generateContent} style={{ marginTop: 6 }}>
                        Generate Questions
                    </button>
                </div>
            )}

            {loading && (
                <div className="empty-state" style={{ paddingTop: 32 }}>
                    <h3>Generating...</h3>
                    <p>Analyzing {activeSubject?.name} notes</p>
                    <div style={{ display: 'flex', gap: 5 }}>
                        {[0, 1, 2].map(i => <div key={i} className="typing-dot" style={{ width: 8, height: 8, animationDelay: `${i * 0.2}s` }} />)}
                    </div>
                </div>
            )}

            {content && !loading && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            Generated for <strong style={{ color: 'var(--text-primary)' }}>{activeSubject?.name}</strong>
                        </div>
                        <button className="btn btn-secondary btn-sm" onClick={generateContent}>Regenerate</button>
                    </div>

                    <div className="questions-section">
                        <div className="questions-section-title">Multiple Choice</div>
                        {content.mcqs.map((q, i) => <MCQCard key={i} q={q} index={i} />)}
                    </div>

                    <div className="questions-section">
                        <div className="questions-section-title">Short Answer</div>
                        {content.shortAnswer.map((q, i) => <ShortAnsCard key={i} q={q} index={i} />)}
                    </div>
                </div>
            )}
        </div>
    );
}
