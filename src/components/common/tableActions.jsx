import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { useLocation } from "react-router"

export default function TableActions() {

    const location = useLocation();
    const pathname = location?.pathname || '';
    const section = pathname.split('/').pop() || 'dashboard';
    
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionActions = {
        guest: [
            { text: t("guest.All Guests") },
            { text: t("guest.Pending") },
            { text: t("guest.Booked") },
            { text: t("guest.Canceled") },
            { text: t("guest.Refund") },
        ],
        rooms: [
            { text: t("rooms.All Rooms") },
            { text: t("rooms.Available") },
            { text: t("rooms.Booked") },
        ],
        employees: [
            { text: t("employees.All Employees") },
            { text: t("employees.Active Employees") },
            { text: t("employees.Inactive Employees") },
        ],
    };

    const actions = sectionActions[section] || [];

    return (
        <StyledTableActions>
            {actions.map((action, index) => (
                <li
                    key={index}
                    className={activeIndex === index ? "active" : ""}
                    onClick={() => setActiveIndex(index)}
                >
                    {action.text}
                </li>
            ))}
        </StyledTableActions>
    )
}

const StyledTableActions = styled.ul`
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