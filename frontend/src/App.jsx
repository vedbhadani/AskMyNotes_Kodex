import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import SetupPage from './pages/SetupPage';
import ChatPage from './pages/ChatPage';
import StudyPage from './pages/StudyPage';
import './index.css';

function AppContent() {
  const { currentPage, subjects, activeSubjectId } = useApp();
  const activeSubject = subjects.find(s => s.id === activeSubjectId);

  const pageTitle = {
    setup: { title: 'Subject Setup', subtitle: 'Create your 3 subjects and upload notes' },
    chat: { title: 'Ask My Notes', subtitle: `Querying: ${activeSubject?.name || '—'} · Answers grounded in your notes only` },
    study: { title: 'Study Mode', subtitle: 'Practice MCQs and short-answer questions' },
  }[currentPage];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <div className="topbar">
          <div>
            <div className="topbar-title">{pageTitle.title}</div>
            <div className="topbar-subtitle">{pageTitle.subtitle}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              fontSize: '0.72rem', color: 'var(--text-muted)',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '4px 10px'
            }}>
              AskMyNotes v1.0
            </div>
          </div>
        </div>

        {currentPage === 'setup' && <SetupPage />}
        {currentPage === 'chat' && <ChatPage />}
        {currentPage === 'study' && <StudyPage />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
