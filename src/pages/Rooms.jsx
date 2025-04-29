import styled from 'styled-components';
import { useState } from 'react';
import TableActions from '../components/common/tableActions';
import TableTemplate from '../components/common/tableTemplate'
import RoomForm from '../components/common/RoomForm';

export default function Rooms() {

    const [formActive, setFormActive] = useState(false);
    const [filter, setFilter] = useState("");

    
    const handleAddClick = () => {
        setFormActive(true);
    };

    const handleFilter = (filter) => {
        setFilter(filter);
    };
    
    return (
        <StyledRooms>
            <TableActions onAddClick={handleAddClick} onFilter={handleFilter} />
            <TableTemplate filter={filter} />
            {formActive && <RoomForm onClose={() => setFormActive(false)} />}
        </ StyledRooms>
    )
}

const StyledRooms = styled.div`
    display: flex;
    flex-direction: column;  
    justify-content: flex-start;
    width: 84vw;
    margin-left: 16vw;
    overflow-y: scroll;
    position: relative;
    gap: 2rem;
    height: 80vh;
`;