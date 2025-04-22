import Logo from "./sideBar/Logo";
import styled from 'styled-components';
import SidebarList from "./sideBar/SidebarList";
import Card from "./sideBar/card";
import Copyright from "./sideBar/Copyright";

export default function Sidebar() {
    return (
        <StyledSidebar>
            <Logo title='travl' span='hotel admin dashboard' />
            <SidebarList />
            <Card name='William Johanson' mail='williamjohn@gmail.com' image='/assets/portrait.jpg' />
            <Copyright />
        </StyledSidebar> 
    );
}

const StyledSidebar = styled.div`
    display: flex;
    justify-content: flex-start;
    position: absolute;
    flex-direction: column;
    padding: 3rem;
    left: 0;
    top: 0;
    width: 20vw;
    height: 100vh;
    background: var(--white);
    box-shadow: 13px 3px 40px #00000005;
`;