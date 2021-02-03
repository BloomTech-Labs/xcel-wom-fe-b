import React, { useState, createContext } from 'react';

export const WOContext = createContext();

export const WOProvider = props => {
  const [workorders, setWorkorders] = useState([]);
  return (
    <WOContext.Provider value={[workorders, setWorkorders]}>
      {props.children}
    </WOContext.Provider>
  );
};
