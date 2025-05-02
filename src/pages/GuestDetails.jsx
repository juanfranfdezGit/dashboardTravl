import styled from "styled-components";
import GuestDetailsInfo from "../components/guestDetails/GuestDetailsInfo";

export default function UsersDetails() {

    return (
        <StyledUsersDetails>
            <GuestDetailsInfo />
        </StyledUsersDetails>
    )
}

const StyledUsersDetails = styled.div`
        display: flex;
        flex-direction: column;  
        justify-content: flex-start;
        width: 77vw;
        margin-left: 20vw;
        margin-top: 50px;
        position: relative;
        gap: 2rem;
        border-radius: 8px;
        overflow: hidden;
        height: 75vh;
        background: #fff;
`;