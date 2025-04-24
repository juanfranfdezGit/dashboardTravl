import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function RoomsActions() {

    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    const actions = [
        { text: t("rooms.All Rooms") },
        { text: t("rooms.Available") },
        { text: t("rooms.Booked") },
    ];

    const handleClick = (index) => {
        setActiveIndex(index);
    };
        
    return (
        <StyledRoomsActions>
             {actions.map((action, index) => (
                <li
                key={index}
                className={`${activeIndex === index ? "active" : ""}`}
                onClick={() => handleClick(index)}
                >
                {action.text}
            </li>
            ))}
        </ StyledRoomsActions>
    )
}

const StyledRoomsActions = styled.ul`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 2rem;

    li {
        padding: 4px 32px;
        border-bottom: 1px solid var(--grey-dark);
        opacity: .6;
        transition: all .5s;
        cursor: pointer;

        &:hover {
            opacity: 1;
        }

        &.active {
            color: var(--main-color);
            border-bottom: 2px solid var(--main-color);
            padding: 4px 32px 5px 32px;
            opacity: 1;
        }
    }
`;