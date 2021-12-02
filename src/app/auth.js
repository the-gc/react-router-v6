import React from 'react'

export const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  }
}

const AuthContextType = {
  user: null,
  signin: () => {},
  signout: () => {}
}



export const AuthContext = React.createContext(AuthContextType);

export function useAuth() {
  return React.useContext(AuthContext);
}