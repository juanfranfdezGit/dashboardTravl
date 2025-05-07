import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme);
        document.documentElement.className = savedTheme; 

        const themeLink = document.getElementById('theme-style');
        themeLink.href = savedTheme === 'light' ? 'src/styles/variables-light.css' : 'src/styles/variables-dark.css';
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.className = newTheme;

        const themeLink = document.getElementById('theme-style');
        themeLink.href = newTheme === 'light' ? 'src/styles/variables-light.css' : 'src/styles/variables-dark.css';

        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};