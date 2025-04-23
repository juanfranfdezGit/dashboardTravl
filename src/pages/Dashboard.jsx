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
    align-items: flex-start;
    flex-wrap: wrap;
    width: 80vw;
    margin-left: 20vw;
    overflow-y: scroll;
    position: relative;
`;