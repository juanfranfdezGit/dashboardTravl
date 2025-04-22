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
    align-items: center;
    height: calc(100vh - 120px);
    width: calc(100vw - 20vw);
    margin-left: 20vw;
    margin-top: 120px;
`;