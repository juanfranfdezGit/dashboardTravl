import { createContext, useReducer, useEffect, useContext } from 'react';
import { loginReducer, initialState } from '../reducer/loginReducer'; 

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [state, dispatch] = useReducer(loginReducer, initialState); 

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLogged') === 'true';
    dispatch({ type: 'INIT', payload: storedLogin }); 
  }, []);

  const login = (username, password) => {
    const user = { username: 'admin', password: 'admin' };

    if (username === user.username && password === user.password) {
      localStorage.setItem('isLogged', 'true');
      dispatch({ type: 'LOGIN' });
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('isLogged');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <LoginContext.Provider value={{ isAuthenticated: state.isAuthenticated, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}