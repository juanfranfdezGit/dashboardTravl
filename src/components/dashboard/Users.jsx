import styled from 'styled-components';

export default function Users() {
    
    return (
        <StyledUsers>
            <h3>Users</h3>
        </ StyledUsers>
    )
}

const StyledUsers = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 80vw;
    margin-left: 20vw;
    overflow-y: scroll;
    position: relative;
`;