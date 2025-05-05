import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router"

import RoomTable from "./RoomsTable";
import GuestTable from "./GuestTable";
import EmployeeTable from "./EmployeeTable";

export default function TableTemplate({ filter }) {
    
    const location = useLocation();
    const pathname = location?.pathname || '';
    const section = pathname.split('/').pop() || 'dashboard';

    const navigate = useNavigate();

    return (
        <StyledTableTemplate>
            {section === "rooms" && <RoomTable filter={filter} />}
            {section === "guest" && <GuestTable filter={filter} navigate={navigate} />}
            {section === "employees" && <EmployeeTable filter={filter} />}
        </StyledTableTemplate>
    )
}

const StyledTableTemplate = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: 'Poppins', sans-serif;

    table {
        width: 100%;
    }

    thead {
        background-color: #f5f5f5;

        th {
            text-align: left;
            padding: 12px 16px;
            font-size: 0.85rem;
            border-bottom: 1px solid #ddd;
            vertical-align: middle; 
        }
    }

    tbody {
        tr {
            border-bottom: 1px solid #e0e0e0;
            cursor: pointer;

            &:hover {
                background-color: #f9f9f9;
            }
        }

        td {
        padding: 14px 16px;
        font-size: 1.3rem;
        vertical-align: middle;

        p {
            margin: 2px 0;
            font-size: .8rem;
        }

        span {
            font-size: .8rem;
        }

        p.id {
            color: var(--main-color);
        }

        p.status {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px 12px;
            border-radius: 8px;
        }

        p.status.Active,
        p.status.Inactive {
            text-transform: uppercase;
            font-weight: 600;
            margin-left: -28px;
        }

        p.status.Active {
            color: var(--main-color);
        }

        p.status.Inactive {
            color: var(--secondary-color);
        }

        p.status.Booked {
            background: var(--booked);
            color: var(--booked-text);

            &.room {
                background: var(--room-booked);
                color: var(--white);
            }
        }

        p.status.Available {
            background: var(--room-available);
            color: var(--white);
        }

        p.status.Refund {
            background: var(--refund);
            color: var(--refund-text);
        }

        p.status.Canceled {
            background: var(--canceled);
            color: var(--canceled-text);
        }

        p.status.Pending {
            background: var(--pending);
            color: var(--pending-text);
        }

        p.hour {
            font-size: .7rem;
        }

        &.img-name {
            display: flex;
            align-items: center;
            gap: 16px;


            div {
                display: flex;
                flex-direction: column;
            }
        }

        &.options {
            text-align: center;
        }
        }
    } 

    img {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
    }

    .roomId {
        color: var(--main-color);
    }

    td.notes p {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 12px;
        background: var(--main-color-light);
        border-radius: 8px;
        cursor: pointer;
    }

    td.notes.active p {
        background: none;
        border: 1px solid var(--main-color);
        color: var(--main-color);
    }

    ul {
        display: flex;

        li {
            margin-left: 4px;
            font-size: .8rem;
        }
    }

    .phone {
        transform: scale(1.5);
        margin-top: 4px;
        margin-right: 12px;
    }

    .check {
        font-size: .7rem;
        margin-top: 4px;
        cursor: pointer;
        color: var(--main-color);
    }
`;