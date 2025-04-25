import styled from 'styled-components';
import TableActions from '../components/common/tableActions';
import TableTemplate from '../components/common/tableTemplate'

export default function Users() {
    return (
        <StyledUsers>
            <TableActions />
            <TableTemplate />
        </ StyledUsers>
    )
}

const StyledUsers = styled.div`
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