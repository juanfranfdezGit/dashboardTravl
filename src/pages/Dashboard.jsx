import styled from 'styled-components';
import CardsDashboard from '../components/dashboard/Cards';
import Calendar from '../components/dashboard/calendar';
import Statistics from '../components/dashboard/Statistics';

export default function Dashboard() {
    
    return (
        <StyledDashboard>
            <CardsDashboard />
            <Calendar />
            <Statistics />
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