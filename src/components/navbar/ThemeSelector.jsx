import React from 'react';
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { useContext } from "react";

export default function ThemeSelector() {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <StyledThemeSelector>
            <button onClick={toggleTheme}>
                {theme === 'light' ? '🌞' : '🌙'}
            </button>
        </StyledThemeSelector>
    )
}

const StyledThemeSelector = styled.div `
    margin-right: 280px;

    button {
        width: 40px;
        height: 40px;
        background: var(--black);
        border: none;
        cursor: pointer;
    }
`; 