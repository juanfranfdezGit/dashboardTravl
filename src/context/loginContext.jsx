import { createContext, useState, useContext, useEffect } from 'react';

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLogged') === 'true';
    setIsAuthenticated(storedLogin);
  }, []);

  const login = (username, password) => {
    const user = { username: 'admin', password: 'admin' };
  
    if (username === user.username && password === user.password) {
      localStorage.setItem('isLogged', 'true');
      setIsAuthenticated(true);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('isLogged');
    setIsAuthenticated(false);
  };

  return (
    <LoginContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}