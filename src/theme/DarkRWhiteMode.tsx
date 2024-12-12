import React, { createContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

type DarkRWhiteModeType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const DarkRWhiteModeContext = createContext<DarkRWhiteModeType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const DarkRWhiteModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <DarkRWhiteModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkRWhiteModeContext.Provider>
  );
};
