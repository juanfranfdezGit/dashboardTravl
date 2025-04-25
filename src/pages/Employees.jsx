import styled from 'styled-components';
import TableActions from '../components/common/tableActions';
import TableTemplate from '../components/common/tableTemplate';

export default function Contact() {
    
    return (
        <StyledContact>
            <TableActions />
            <TableTemplate />
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