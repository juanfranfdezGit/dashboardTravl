import styled from 'styled-components';

export default function Dashboard() {
    
    return (
        <StyledDashboard>
            <h3>DASHBOARD</h3>
        </ StyledDashboard>
    )
}

const StyledDashboard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 120px);
    width: calc(100vw - 20vw);
    margin-left: 20vw;
    margin-top: 120px;
`;