import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function SubjectCard({ subject, index }) {
    const { updateSubject, addFiles, removeFile } = useApp();
    const fileInputRef = useRef(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFiles = (fileList) => {
        const accepted = Array.from(fileList).filter(f =>
            f.type === 'application/pdf' || f.type === 'text/plain'
        );
        if (accepted.length > 0) addFiles(subject.id, accepted);
    };

    return (
        <div className="subject-card">
            <div className="subject-card-num">Subject {index + 1}</div>
            <input
                type="text"
                placeholder="Enter subject name..."
                value={subject.name}
                onChange={e => updateSubject(subject.id, { name: e.target.value })}
                maxLength={40}
            />

            <div
                className={`file-upload-zone ${dragOver ? 'dragover' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            >
                <p>Drop files or <span>browse</span></p>
                <p style={{ marginTop: 2, fontSize: '0.67rem' }}>PDF, TXT · Multiple files allowed</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.txt"
                    onChange={e => handleFiles(e.target.files)}
                />
            </div>

            {subject.files.length > 0 && (
                <div className="file-list">
                    {subject.files.map((f, i) => (
                        <div key={i} className="file-item">
                            <span title={f.name}>{f.name}</span>
                            <span className="file-size">{formatFileSize(f.size)}</span>
                            <button className="remove-btn" onClick={() => removeFile(subject.id, i)}>✕</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function SetupPage() {
    const { subjects, checkSetupComplete, setCurrentPage } = useApp();

    const totalFiles = subjects.reduce((acc, s) => acc + s.files.length, 0);
    const namedCount = subjects.filter(s => s.name.trim()).length;

    const handleProceed = () => {
        if (checkSetupComplete()) setCurrentPage('chat');
    };

    return (
        <div className="page-content">
            <div className="welcome-banner">
                <h2>Set up your subjects</h2>
                <p>
                    Name each subject and upload your notes. Once done, you can ask questions and get
                    answers grounded strictly in your uploaded material.
                </p>
            </div>

            <div className="stat-row">
                <div className="stat-mini">
                    <div className="val">{namedCount}<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/3</span></div>
                    <div className="lbl">Subjects named</div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(namedCount / 3) * 100}%` }} />
                    </div>
                </div>
                <div className="stat-mini">
                    <div className="val">{totalFiles}</div>
                    <div className="lbl">Files uploaded</div>
                </div>
                <div className="stat-mini">
                    <div className="val">{subjects.filter(s => s.files.length > 0).length}<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/3</span></div>
                    <div className="lbl">Subjects with notes</div>
                </div>
            </div>

            <div className="subjects-grid">
                {subjects.map((s, i) => (
                    <SubjectCard key={s.id} subject={s} index={i} />
                ))}
            </div>

            <div className="setup-action-bar">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {subjects.map((s, i) => (
                        <div key={s.id} className="setup-status">
                            <span className={`setup-dot ${s.name ? 'done' : 'pending'}`} />
                            <span style={{ color: s.name ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                {s.name ? `"${s.name}"` : `Subject ${i + 1} — not named`}
                            </span>
                            {s.files.length > 0 && (
                                <span className="tag" style={{ marginLeft: 6 }}>
                                    {s.files.length} file{s.files.length !== 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    className="btn btn-primary btn-lg"
                    onClick={handleProceed}
                    disabled={namedCount < 3}
                >
                    Start Asking
                </button>
            </div>

            {namedCount < 3 && (
                <p style={{ textAlign: 'center', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 10 }}>
                    Name all 3 subjects to continue
                </p>
            )}
        </div>
    );
}
