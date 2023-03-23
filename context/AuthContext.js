import {createContext, useState, useMemo, useCallback, useEffect} from 'react';
import { KEY_STORAGE_AUTH } from '../lib/constants';
import { useMyAsyncStorage } from '../hooks/useAsycnStorage';

export const authContextDefault = {
  token: '',
  name: '',
  email: '',
  role: '',
  userId: '',
};

export const AuthContext = createContext({
  auth: authContextDefault,
  setAuth: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const {setItem, getItem} = useMyAsyncStorage(authContextDefault);

  const getInitialUser = useCallback(async () => {
    const user = await getItem(KEY_STORAGE_AUTH);
    return user ? user : authContextDefault;
  }, []);

  const [auth, setAuth] = useState(authContextDefault);

  useEffect(() => {
    const fetchInitialUser = async () => {
      const initialUser = await getInitialUser();
      setAuth(initialUser);
    };
    fetchInitialUser();
  }, [getInitialUser]);

  useEffect(() => {
    if (auth !== null) {
      setItem(KEY_STORAGE_AUTH, auth);
    }
  }, [auth]);

  const logout = useCallback(() => {
    setAuth(authContextDefault);
  }, []);

  const memoizedValue = useMemo(
    () => ({auth, setAuth, logout}),
    [auth, setAuth, logout],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};