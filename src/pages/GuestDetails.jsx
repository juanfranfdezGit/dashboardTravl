import styled from "styled-components";
import { useParams } from 'react-router-dom';
import guestsData from '../datas/guests.json';

export default function UsersDetails() {
    
    const { id } = useParams();

    const guest = guestsData.find(guest => guest.id.toString() === id);
  
    if (!guest) return <p>Huésped no encontrado.</p>;

    return (
        <StyledUsersDetails>
            <h1>{guest.name}</h1>
            <p>ID: #{guest.id}</p>
            <p>Check-In: {guest.checkIn.date} a las {guest.checkIn.hour}</p>
            <p>Check-Out: {guest.checkOut.date} a las {guest.checkOut.hour}</p>
            <p>Room Type: {guest.roomType}</p>
            <p>Status: {guest.status}</p>
        </StyledUsersDetails>
    )
}

const StyledUsersDetails = styled.div`
        display: flex;
        flex-direction: column;  
        justify-content: flex-start;
        width: 80vw;
        margin-left: 20vw;
        overflow-y: scroll;
        position: relative;
        gap: 2rem;
        height: 80vh;
`;