import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { Work, Comment } from '../types';
import { mockWorks } from '../data/mockData';

interface AppState {
  works: Work[];
  currentWork: Work | null;
}

type Action =
  | { type: 'SET_WORKS'; payload: Work[] }
  | { type: 'ADD_WORK'; payload: Work }
  | { type: 'UPDATE_WORK'; payload: Work }
  | { type: 'SET_CURRENT_WORK'; payload: Work | null }
  | { type: 'ADD_COMMENT'; payload: { workId: string; comment: Comment } };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_WORKS':
      return { ...state, works: action.payload };
    case 'ADD_WORK':
      return { ...state, works: [action.payload, ...state.works] };
    case 'UPDATE_WORK':
      return {
        ...state,
        works: state.works.map(w => w.id === action.payload.id ? action.payload : w)
      };
    case 'SET_CURRENT_WORK':
      return { ...state, currentWork: action.payload };
    case 'ADD_COMMENT': {
      const { workId, comment } = action.payload;
      const updatedWorks = state.works.map(w =>
        w.id === workId
          ? { ...w, comments: [...w.comments, comment] }
          : w
      );
      const updatedCurrent = state.currentWork?.id === workId
        ? { ...state.currentWork, comments: [...state.currentWork.comments, comment] }
        : state.currentWork;
      return { ...state, works: updatedWorks, currentWork: updatedCurrent };
    }
    default:
      return state;
  }
}

const STORAGE_KEY = 'lesou-tribe-data';

function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.works && parsed.works.length > 0) {
        return parsed;
      }
    }
  } catch {
    console.error('Failed to load state from localStorage');
  }
  return { works: mockWorks, currentWork: null };
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ works: state.works }));
  } catch {
    console.error('Failed to save state to localStorage');
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  addComment: (workId: string, author: string, content: string) => void;
  addWork: (work: Work) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, null, loadState);

  useEffect(() => {
    saveState(state);
  }, [state.works]);

  const addComment = (workId: string, author: string, content: string) => {
    const comment: Comment = {
      id: `c${Date.now()}`,
      author,
      content,
      createdAt: new Date().toISOString().split('T')[0]
    };
    dispatch({ type: 'ADD_COMMENT', payload: { workId, comment } });
  };

  const addWork = (work: Work) => {
    dispatch({ type: 'ADD_WORK', payload: work });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, addComment, addWork }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
