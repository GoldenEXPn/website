// TokenContext.js
import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);
