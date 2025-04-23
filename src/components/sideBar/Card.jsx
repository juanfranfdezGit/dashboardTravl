import styled from "styled-components"
import Button from "../common/Button";
import { useTranslation } from 'react-i18next';

export default function Card({ name, mail, image }) {

    const { t } = useTranslation();

    return (
        <StyledCard>
            <img src={image} alt="photo" />
            <h3>{name}</h3>
            <p>{mail}</p>
            <Button type='solid' text={t("sidebar.Contact Us")} />
        </StyledCard>
    )
}

const StyledCard = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80%;
    gap: 12px;
    box-shadow: 0 0 10px var(--black);
    border-radius: 14px;
    padding: 2rem;
    text-align: center;
    margin-top: 40px;

    img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        object-position: center;
        border-radius: 8px;
    }

    button {
        background: var(--main-color-light);
        color: var(--main-color);
        max-height: 47px;
        max-width: 158px;
        font-size: .8rem;
    }

    h3 {
        font-size: 1rem;
    }

    p {
        font-size: .8rem;
        opacity: .6;
    }
`;