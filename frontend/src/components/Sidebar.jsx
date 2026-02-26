import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
    { id: 'setup', label: 'Setup' },
    { id: 'chat', label: 'Ask My Notes' },
    { id: 'study', label: 'Study Mode' },
];

export default function Sidebar() {
    const { subjects, currentPage, setCurrentPage } = useApp();

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-mark">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                </div>
                <h1>AskMyNotes</h1>
            </div>

            <div className="sidebar-section">
                <div className="sidebar-section-label">Navigation</div>
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.id}
                        className={`sidebar-nav-btn ${currentPage === item.id ? 'active' : ''}`}
                        onClick={() => setCurrentPage(item.id)}
                    >
                        {item.label}
                    </button>
                ))}

                <div className="divider" />

                <div className="sidebar-section-label">Subjects</div>
                {subjects.map((s, i) => (
                    <div key={s.id} className="sidebar-nav-btn" style={{ cursor: 'default' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                fontSize: '0.8rem', fontWeight: 500,
                                color: s.name ? 'var(--text-primary)' : 'var(--text-muted)',
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                            }}>
                                {s.name || `Subject ${i + 1}`}
                            </div>
                            <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)' }}>
                                {s.files.length} file{s.files.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                        <span style={{
                            width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                            background: s.name ? (s.files.length > 0 ? 'var(--accent-green)' : 'var(--text-muted)') : 'var(--border)'
                        }} />
                    </div>
                ))}
            </div>

            <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Study copilot · grounded in your notes
            </div>
        </aside>
    );
}
