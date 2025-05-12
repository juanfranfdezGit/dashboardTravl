import styled from 'styled-components';
import { useState } from 'react';
import CardsDashboard from '../components/dashboard/Cards';
import Calendar from '../components/dashboard/Calendar';
import Statistics from '../components/dashboard/Statistics';
import BookingsList from '../components/dashboard/BookingsList';

export default function Dashboard() {

    const [selectedDay, setSelectedDay] = useState(new Date());

    return (
        <StyledDashboard>
            <CardsDashboard />
            <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay}  />
            <Statistics />
            <BookingsList selectedDay={selectedDay} />
        </ StyledDashboard>
    )
}

const StyledDashboard = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 84vw;
    height: 87vh;
    margin-left: 16vw;
    overflow-y: scroll;
    position: relative;
    padding: 2rem;
`;