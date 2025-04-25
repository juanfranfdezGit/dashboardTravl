import styled from 'styled-components';
import UserActions from './users/UserActions';
import UserTable from './users/UserTable';

export default function Users() {
    return (
        <StyledUsers>
            <UserActions />
            <UserTable />
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