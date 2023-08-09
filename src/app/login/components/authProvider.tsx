
"use client"
import { ReactNode, createContext, useState, useContext } from 'react';

const AuthContext =  createContext({});

export const   AuthProvider = ( {children}: {children:ReactNode} ) => {
  const [user, setUser] = useState('');
  const [auth,setAuth] = useState(false)

  

  return (
    <AuthContext.Provider value={{user,setUser,auth,setAuth}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUserContext = () => useContext(AuthContext);
