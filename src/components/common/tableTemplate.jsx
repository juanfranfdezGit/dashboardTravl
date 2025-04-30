import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router"
import { MdOutlinePhone } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

import { fetchRoomData } from "../../redux/roomSlice";
import { fetchEmployeeData } from "../../redux/employeeSlice";
import { fetchGuestData } from "../../redux/guestSlice";

export default function TableTemplate({ filter }) {
    
    const location = useLocation();
    const pathname = location?.pathname || '';
    const section = pathname.split('/').pop() || 'dashboard';

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);
    const { data: employees, loading: employeesLoading, error: employeesError } = useSelector((state) => state.employees);
    const { data: guests, loading: guestsLoading, error: guestsError } = useSelector((state) => state.guests);


    const filteredRooms = (rooms || []).filter((room) => {
        if (filter === "All Rooms") {
            return true;
        } else if (filter === "Available" || filter === "Disponible") {
            return room.status === "Available";
        } else if (filter === "Booked" || filter === "Reservada") {
            return room.status === "Booked";
        }
        return true;
    });

    const filteredGuest = (guests || []).filter((guest) => {
        if (filter === "All Guests") {
            return true;
        } else if (filter === "Pending" || filter === "Pendiente") {
            return guest.status === "Pending";
        } else if (filter === "Booked" || filter === "Reservado") {
            return guest.status === "Booked";
        } else if (filter === "Canceled" || filter === "Cancelado") {
            return guest.status === "Canceled";
        } else if (filter === "Refund" || filter === "Reembolso") {
            return guest.status === "Refund";
        }
        return true;
    });

    const filteredEmployee = (employees || []).filter((employee) => {
        if (filter === "All Employees") {
            return true;
        } else if (filter === "Active Employees" || filter === "Empleados Activos") {
            return employee.status === "Active";
        } else if (filter === "Inactive Employees" || filter === "Empleados Inactivos") {
            return employee.status === "Inactive";
        }
        return true;
    });
    
    useEffect(() => {
        if (employees.length === 0) {
          dispatch(fetchEmployeeData());
        }
    }, [dispatch, employees.length]);

    useEffect(() => {
        if (rooms.length === 0) {
            dispatch(fetchRoomData());
        }
    }, [dispatch, rooms.length]);

    useEffect(() => {
        if (guests.length === 0) {
            dispatch(fetchGuestData());
        }
    }, [dispatch, guests.length]);

    const theads = {
        guest: [
            { label: t("guest.Guest"), key: "guest" },
            { label: t("guest.Order Date"), key: "orderDate" },
            { label: t("guest.Check In"), key: "checkIn" },
            { label: t("guest.Check Out"), key: "checkOut" },
            { label: t("guest.Special Request"), key: "specialRequest" },
            { label: t("guest.Room Type"), key: "roomType" },
            { label: t("guest.Status"), key: "status" },
            { label: "", key: "actions" },
        ],
        rooms: [
            { label: t("rooms.Room Name"), key: "roomName" },
            { label: t("rooms.Bed Type"), key: "bedType" },
            { label: t("rooms.Room Floor"), key: "roomFloor" },
            { label: t("rooms.Facilities"), key: "facilities" },
            { label: t("rooms.Rate"), key: "rate" },
            { label: t("rooms.Status"), key: "status" },
            { label: "", key: "actions" },
        ],
        employees: [
            { label: t("employees.Name") , key: "Name"},
            { label: t("employees.Job Desk") , key: "Job Desk"},
            { label: t("employees.Schedule") , key: "Schedule"},
            { label: t("employees.Contact") , key: "Contact"},
            { label: t("employees.Status") , key: "Status"},
            { label: "", key: "actions" },
        ]
    }

    const headers = theads[section] || [];

    if (roomsLoading || employeesLoading || guestsLoading) {
        return <p>Loading...</p>;
    }
    
    if (roomsError || employeesError || guestsError) {
        return <p>Error: {roomsError || employeesError || guestsError}</p>;
    }

    return (
        <StyledTableTemplate>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {(() => {
                switch (section) {
                case "guest":
                    return filteredGuest.map((guest, index) => (
                    <tr key={index} onClick={() => navigate(`/dashboard/guest/${guest.id}`)}>
                        <td className="img-name">
                            <img src={guest.image} alt={guest.name} />
                            <div>
                                <p>{guest.name}</p>
                                <p className="id">#{guest.id}</p>
                            </div>
                        </td>
                        <td><p>{guest.orderDate}</p></td>
                        <td>
                            <p>{guest.checkIn.date}</p>
                            <p className="hour">{guest.checkIn.hour}</p>
                        </td>
                        <td>
                            <p>{guest.checkOut.date}</p>
                            <p className="hour">{guest.checkOut.hour}</p>
                        </td>
                        <td className={`notes ${guest.specialRequest.status ? "active" : ""}`}>
                            <p>{t(`guest.${guest.specialRequest.text}`)}</p>
                        </td>
                        <td><p>{guest.roomType}</p></td>
                        <td><p className={`status ${guest.status}`}>{t(`guest.${guest.status}`)}</p></td>
                        <td className="options"><TbDotsVertical /></td>
                    </tr>
                    ));

                case "rooms":
                    console.log(filteredRooms)
                    return filteredRooms.map((room, index) => (
                    <tr key={index}>
                        <td className="img-name">
                            <img src={room.image} alt={room.name} />
                            <div>
                                <p className="roomNumber">{room.roomNumber}</p>
                                <p>{room.name}</p>
                            </div>
                        </td>
                        <td><p>{t(`rooms.${room.bedType}`)}</p></td>
                        <td><p>{`${t("rooms.Floor")} ${room.roomFloor}`}</p></td>
                        <td className="facilities">
                        {(room.facilities || []).map((facility, index) => (
                            <span key={index}>
                            {t(`rooms.${facility}`)}
                            {index < (room.facilities?.length || 0) - 1 ? ', ' : ''}
                            </span>
                        ))}
                        </td>
                        <td><p>${room.rate} /{t("rooms.Night")}</p></td>
                        <td>
                            <p className={`status room ${room.status}`}>{t(`rooms.${room.status}`)}</p>
                        </td>
                        <td className="options"><TbDotsVertical /></td>
                    </tr>
                    ));

                case "employees":
                    return filteredEmployee.map((emp, index) => (
                    <tr key={index}>
                        <td className="img-name">
                            <img src={emp.image} alt={emp.name} />
                            <div>
                                <p>{emp.name}</p>
                                <p className="id">#{emp.id}</p>
                                <p>{`${t("employees.Joined on")} ${emp.joined}`}</p>
                            </div>
                        </td>
                        <td>
                            {emp["jobDesk"].map((task, i) => (
                                <span key={i}>
                                {t(`employees.${task}`)}
                                {i < emp["jobDesk"].length - 1 ? ", " : "."} {/* Reemplaza la coma por un punto en el último item */}
                                </span>
                            ))}
                        </td>
                        <td>
                            {emp.schedule.map((day, i) => (
                                <span key={i}>
                                {`${t(`employees.${day}`)}`}
                                {i < emp.schedule.length - 1 ? ", " : "."} {/* Reemplaza la coma por un punto en el último item */}
                                </span>
                            ))}
                            <p className="check">Check Schedule</p>
                        </td>
                        <td><p><MdOutlinePhone className="phone" /> {emp.contact}</p></td>
                        <td>
                            <p className={`status employee ${emp.status}`}>{t(`employees.${emp.status}`)}</p>
                        </td>
                        <td className="options"><TbDotsVertical /></td>
                    </tr>
                    ));

                default:
                    return null;
                }
            })()}
            </tbody>
        </StyledTableTemplate>
    )
}

const StyledTableTemplate = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: 'Poppins', sans-serif;

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