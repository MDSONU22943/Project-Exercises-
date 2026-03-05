import { createContext, useState } from 'react';
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);

    return (
        <GameContext.Provider value={{ score, setScore }}>
          {children}
        </GameContext.Provider>
      );
}
