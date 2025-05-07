import styled from 'styled-components';
import NavbarActions from './navbar/Actions';
import LanguageSelector from './navbar/LanguageSelector';
import Title from './navbar/Title';
import ThemeSelector from './navbar/ThemeSelector';

export default function Navbar() {
    
    return (
        <NavbarStyled>
            <Title />
            <ThemeSelector />
            <NavbarActions />
            <LanguageSelector />
        </NavbarStyled>
    )
}

const NavbarStyled = styled.div `
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 86vw;
    margin-left: 16vw;
    background: var(--white);
    box-shadow: 13px 3px 40px #00000005;
    min-height: 120px;
    padding: 0 4rem;
`;