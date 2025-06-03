import { createContext, useReducer, useEffect, useContext } from 'react';
import { loginReducer, initialState } from '../reducer/loginReducer'; 

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [state, dispatch] = useReducer(loginReducer, initialState); 

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLogged') === 'true';
    dispatch({ type: 'INIT', payload: storedLogin }); 
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('isLogged', 'true');

      dispatch({ type: 'LOGIN' });
      return true;
    } catch (error) {
      console.log('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
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