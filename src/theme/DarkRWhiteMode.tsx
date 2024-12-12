import React, {createContext, useState, ReactNode} from 'react';

type Theme = 'light' | 'dark'; // Define los posibles valores para el tema (claro o oscuro).

type DarkRWhiteModeType = {
  theme: Theme; // El estado actual del tema.
  toggleTheme: () => void; // Función para alternar entre los temas.
};

// Crear un contexto con un valor por defecto: tema claro y una función vacía.
export const DarkRWhiteModeContext = createContext<DarkRWhiteModeType>({
  theme: 'light',
  toggleTheme: () => {},
});

// Componente proveedor para envolver a otros componentes y proporcionarles el contexto.
export const DarkRWhiteModeProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light'); // Estado que guarda el tema actual.

  // Función para alternar entre 'light' y 'dark'.
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Proveer el estado actual del tema y la función toggle a los componentes hijos.
  return (
    <DarkRWhiteModeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </DarkRWhiteModeContext.Provider>
  );
};
