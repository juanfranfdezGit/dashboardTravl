import React from 'react';
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { useContext } from "react";

import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";

export default function ThemeSelector() {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <StyledThemeSelector>
            <button onClick={toggleTheme}>
                {theme === 'light' ? <MdOutlineWbSunny className='ico' /> : <FiMoon className='ico' />}
            </button>
        </StyledThemeSelector>
    )
}

const StyledThemeSelector = styled.div `
    margin-right: 370px;

    button {
        width: 40px;
        height: 40px;
        background: var(--pending);
        border: none;
        border-radius: 8px;
        cursor: pointer;

        .ico {
            font-size: 24px;
        }
    }
`; 