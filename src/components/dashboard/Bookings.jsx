import styled from 'styled-components';

export default function Bookings() {
    
    return (
        <StyledBookings>
            <h3>Bookings</h3>
        </ StyledBookings>
    )
}

const StyledBookings = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 80vw;
    margin-left: 20vw;
    overflow-y: scroll;
    position: relative;
    gap: 2rem;
`;