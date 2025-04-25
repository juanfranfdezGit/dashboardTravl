import styled from 'styled-components';
import CardsDashboard from '../components/dashboard/dashboard/cards';

export default function Dashboard() {
    
    return (
        <StyledDashboard>
            <CardsDashboard />
        </ StyledDashboard>
    )
}

const StyledDashboard = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 84vw;
    margin-left: 16vw;
    overflow-y: scroll;
    position: relative;
    padding: 2rem;
`;