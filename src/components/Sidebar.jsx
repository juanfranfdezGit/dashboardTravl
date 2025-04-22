import Logo from "./common/Logo";
import styled from 'styled-components';

export default function Sidebar() {
    
    return (
        <Sidebar>
            <Logo />
        <Sidebar />
    )
}

const Sidebar = styled.div `
    display: flex;
    justify-content: center;
`;