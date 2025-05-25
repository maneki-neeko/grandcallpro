import { createContext, useContext, ReactNode, useState } from 'react';

interface AppContextData {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [activePage, setActivePage] = useState('');

  const value = {
    activePage,
    setActivePage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useContextApp(): AppContextData {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}
