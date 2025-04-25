import styled from 'styled-components';

export default function Contact() {
    
    return (
        <StyledContact>
            <h3>Contact</h3>
        </ StyledContact>
    )
}

const StyledContact = styled.div`
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