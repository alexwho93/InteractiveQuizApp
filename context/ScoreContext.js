"use client";

import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);

  const resetScore = () => setScore(0);

  return (
    <ScoreContext.Provider value={{ score, setScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  return useContext(ScoreContext);
}
