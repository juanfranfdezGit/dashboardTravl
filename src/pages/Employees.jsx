import styled from 'styled-components';
import { useState } from 'react';
import TableActions from '../components/common/tableActions';
import TableTemplate from '../components/common/tableTemplate';
import EmployeeForm from '../components/employees/EmployeeForm';

export default function Contact() {
    
    const [formActive, setFormActive] = useState(false);
    const [filter, setFilter] = useState("");
    
    const handleAddClick = () => {
        setFormActive(true);
    };

    const handleFilter = (filter) => {
        setFilter(filter);
    };
    
    return (
        <StyledContact>
            <TableActions onAddClick={handleAddClick} onFilter={handleFilter}  />
            <TableTemplate filter={filter} />
            {formActive && <EmployeeForm onClose={() => setFormActive(false)} />}
        </ StyledContact>
    )
}

const StyledContact = styled.div`
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