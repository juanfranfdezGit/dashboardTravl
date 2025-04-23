import styled from 'styled-components';
import NavbarActions from './navbar/Actions';
import LanguageSelector from './navbar/LanguageSelector';
import Title from './navbar/Title';

export default function Navbar() {
    
    return (
        <NavbarStyled>
            <Title />
            <NavbarActions />
            <LanguageSelector />
        </NavbarStyled>
    )
}

const NavbarStyled = styled.div `
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 80vw;
    margin-left: 20vw;
    background: var(--white);
    box-shadow: 13px 3px 40px #00000005;
    min-height: 120px;
    padding: 0 4rem;
`;