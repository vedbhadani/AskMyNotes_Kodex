import { createContext, useContext, useState } from 'react';

const SUBJECT_COLORS = ['s0', 's1', 's2'];
const SUBJECT_ICONS = ['📘', '🧪', '📐'];

const defaultSubjects = [
  { id: 0, name: '', description: '', files: [], color: 's0', icon: '📘', chatHistory: [] },
  { id: 1, name: '', description: '', files: [], color: 's1', icon: '🧪', chatHistory: [] },
  { id: 2, name: '', description: '', files: [], color: 's2', icon: '📐', chatHistory: [] },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [activeSubjectId, setActiveSubjectId] = useState(0);
  const [currentPage, setCurrentPage] = useState('setup'); // 'setup' | 'chat' | 'study'
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const updateSubject = (id, fields) =>
    setSubjects(prev => prev.map(s => (s.id === id ? { ...s, ...fields } : s)));

  const addFiles = (id, newFiles) =>
    setSubjects(prev =>
      prev.map(s => (s.id === id ? { ...s, files: [...s.files, ...newFiles] } : s))
    );

  const removeFile = (subjectId, fileIdx) =>
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId ? { ...s, files: s.files.filter((_, i) => i !== fileIdx) } : s
      )
    );

  const addMessage = (subjectId, message) =>
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId ? { ...s, chatHistory: [...s.chatHistory, message] } : s
      )
    );

  const activeSubject = subjects.find(s => s.id === activeSubjectId);

  const checkSetupComplete = () => {
    const complete = subjects.every(s => s.name.trim() !== '');
    setIsSetupComplete(complete);
    return complete;
  };

  return (
    <AppContext.Provider
      value={{
        subjects,
        activeSubjectId,
        setActiveSubjectId,
        activeSubject,
        currentPage,
        setCurrentPage,
        isSetupComplete,
        updateSubject,
        addFiles,
        removeFile,
        addMessage,
        checkSetupComplete,
        SUBJECT_ICONS,
        SUBJECT_COLORS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
