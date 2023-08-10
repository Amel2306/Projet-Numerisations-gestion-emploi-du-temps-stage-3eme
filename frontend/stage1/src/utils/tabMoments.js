import React, { createContext } from "react";

export const MomentsContext = createContext("");

export const MomentProvider = ({ children }) => {
  const tab_moments = [
    "Lundi Matin",
    "Lundi Aprés-midi",
    "Mardi Matin",
    "Mardi Aprés-midi",
    "Mercredi Matin",
    "Mercredi Aprés-midi",
    "Jeudi Matin",
    "Jeudi Aprés-midi",
    "Vendredi Matin",
    "Vendredi Aprés-midi",
  ];

  return (
    <MomentsContext.Provider value={{ tab_moments }}>
      {children}
    </MomentsContext.Provider>
  );
};
