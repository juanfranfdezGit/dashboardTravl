import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext } from "../context/themeContext";
import ThemeSelector from "../components/navbar/ThemeSelector";

const mockToggleTheme = jest.fn();

const ThemeProviderWrapper = ({ children }) => (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: mockToggleTheme }}>
        {children}
    </ThemeContext.Provider>
);

test('should toggle theme when button is clicked', () => {
    render(
        <ThemeProviderWrapper>
        <ThemeSelector />
        </ThemeProviderWrapper>
    );

    fireEvent.click(screen.getByRole('button'));  
    expect(mockToggleTheme).toHaveBeenCalledTimes(1); 
});

test('should toggle theme and update header class', () => {
    const header = document.createElement('header');
    header.id = 'main-header';
    header.className = 'light';
    document.body.appendChild(header);
  
    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {
        header.className = 'dark';  
      } }}>
        <ThemeSelector />
      </ThemeContext.Provider>
    );
  
    fireEvent.click(screen.getByRole('button'));
  
    expect(header.className).toBe('dark');
  });