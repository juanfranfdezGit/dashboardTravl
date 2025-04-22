import styled from 'styled-components';

export default function Navbar() {
    
    return (
        <NavbarStyled>
            <h2>NAVBAR</h2>
        </NavbarStyled>
    )
}

const NavbarStyled = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80vw;
    margin-left: 20vw;
    background: var(--white);
    box-shadow: 13px 3px 40px #00000005;
    min-height: 120px;
`;