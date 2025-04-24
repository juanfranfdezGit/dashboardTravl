import styled from 'styled-components';
import RoomsActions from './rooms/RoomsActions';
import RoomTable from './rooms/RoomsTable';

export default function Rooms() {
    
    return (
        <StyledRooms>
            <RoomsActions />
            <RoomTable />
        </ StyledRooms>
    )
}

const StyledRooms = styled.div`
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