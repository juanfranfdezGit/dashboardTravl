import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { useLocation } from "react-router"

export default function TableActions({ onAddClick, onFilter }) {

    const location = useLocation();
    const pathname = location?.pathname || '';
    const section = pathname.split('/').pop() || 'dashboard';
    
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionActions = {
        bookings: [
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
            { text: t("rooms.Add Room"), isAdd: true }
        ],
        users: [
            { text: t("employees.All Employees") },
            { text: t("employees.Active Employees") },
            { text: t("employees.Inactive Employees") },
            { text: t("employees.Add Employee"), isAdd: true }
        ],
    };

    const actions = sectionActions[section] || [];

    return (
        <StyledTableActions>
            {actions.map((action, index) => (
                <li
                    key={index}
                    className={!action.isAdd && activeIndex === index ? "active" : action.isAdd ? "add-button" : ""}
                    onClick={() => {
                        if (action.isAdd) {
                            onAddClick?.(); 
                        } else {
                            setActiveIndex(index);
                            onFilter?.(action.text);
                        }
                    }}
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

        &.add-button {
            margin-left: auto;
            margin-right: 40px;
            border: none;
            opacity: 1;
            color: var(--white);
            background: var(--room-available);
            border-radius: 8px;
            padding: 8px 32px;
            transition: all .5s;

            &:hover {
                box-shadow: 0 0 4px var(--black);
            }
        }
    }
`;