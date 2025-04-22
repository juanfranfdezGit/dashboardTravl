import styled from "styled-components"

export default function Copyright() {
    return (
        <StyledCopyright>
            <p className="title">Travl Hotel Admin Dashboard</p>
            <p className="description">© 2020 All Rights Reserved</p>
            <p className="name">Made with ♥ by Juan Francisco Romero Fdez</p>
        </StyledCopyright>
    )
}

const StyledCopyright = styled.div `
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 40px;
    text-align: start;

    .title {
        font-size: 1rem;
    }

    .description {
        font-size: .8rem;
        color: var(--main-color);
        margin-bottom: 40px;
    }

    .name {
        font-size: 1rem;
        color: var(--main-color);
    }
`;