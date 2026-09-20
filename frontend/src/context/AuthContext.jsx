import React, { createContext, useContext, useState } from 'react';
import api, { SESSION_KEY, getApiError, readSession } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const login = async (email, password) => {
    const token = btoa(`${email}:${password}`);
    let editorResponse;
    try {
      editorResponse = await api.get('/editor/posts', { headers: { Authorization: `Basic ${token}` }, skipAuthRedirect: true, params: { size: 1 } });
    } catch (editorError) {
      if (![401, 403].includes(editorError.response?.status)) throw new Error(getApiError(editorError));
    }
    if (editorResponse?.status === 200) {
      const next = { email, token, role: 'EDITOR' };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
      setSession(next);
      return next;
    }
    try {
      await api.get('/author/posts', { headers: { Authorization: `Basic ${token}` }, skipAuthRedirect: true, params: { size: 1 } });
      const next = { email, token, role: 'AUTHOR' };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
      setSession(next);
      return next;
    } catch (authorError) {
      if (authorError.response?.status === 401 && editorErrorStatusWas401(editorResponse)) throw new Error('Invalid email or password');
      if (authorError.response?.status === 401 && editorResponse === undefined) throw new Error('Invalid email or password');
      if (authorError.response?.status !== 403) throw new Error(getApiError(authorError));
    }
    throw new Error('Unable to verify your account');
  };

  const editorErrorStatusWas401 = () => false;

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
