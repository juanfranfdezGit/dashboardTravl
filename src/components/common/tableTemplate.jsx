import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import guestsData  from "../../datas/guests.json"
import roomsData  from "../../datas/rooms.json"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router"

export default function UserTable() {
    
    const location = useLocation();
    const pathname = location?.pathname || '';
    const section = pathname.split('/').pop() || 'dashboard';

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [guests] = useState(guestsData);
    const [rooms] = useState(roomsData);

    const theadsGuest = [
        { label: t("guest.Guest"), key: "guest" },
        { label: t("guest.Order Date"), key: "orderDate" },
        { label: t("guest.Check In"), key: "checkIn" },
        { label: t("guest.Check Out"), key: "checkOut" },
        { label: t("guest.Special Request"), key: "specialRequest" },
        { label: t("guest.Room Type"), key: "roomType" },
        { label: t("guest.Status"), key: "status" },
        { label: "", key: "actions" },
    ]

    const theadsRooms = [
        { label: t("rooms.Room Name"), key: "roomName" },
        { label: t("rooms.Bed Type"), key: "bedType" },
        { label: t("rooms.Room Floor"), key: "roomFloor" },
        { label: t("rooms.Facilities"), key: "facilities" },
        { label: t("rooms.Rate"), key: "rate" },
        { label: t("rooms.Status"), key: "status" },
        { label: "", key: "actions" },
    ]

    return (
        <StyledUserTable>
            <thead>
                <tr>
                    {section === "guest" ? (
                        theadsGuest.map((thead, index) => (
                            <th key={index}>{thead.label}</th>
                        ))
                    ) : (
                        theadsRooms.map((thead, index) => (
                            <th key={index}>{thead.label}</th>
                        ))
                    )}
                </tr>
            </thead>
            <tbody>
                {section === "guest" ? (
                    guests.map((guest, index) => (
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
                    ))
                ) : (
                    rooms.map((room, index) => (
                        <tr key={index}>
                          <td className="img-name">
                            <img src={room.image} alt={room.Name} />
                            <div>
                              <p className="id">{room.id}</p>
                              <p>{room.Name}</p>
                            </div>
                          </td>
                          <td><p>{t(`rooms.${room["Bed Type"]}`)}</p></td>
                          <td><p>{`${t("rooms.Floor")} ${room["Room Floor"]}`}</p></td>
                          <td className="facilities">
                            {room.Facilities.map((facility, index) => (
                              <span key={index}>{t(`rooms.${facility}`)}{index < room.Facilities.length - 1 ? ', ' : ''}</span>
                            ))}
                          </td>
                          <td><p>${room.Rate} /{t("rooms.Night")}</p></td>
                          <td>
                            <p className={`status ${room.Status}`}>{t(`rooms.${room.Status}`)}</p>
                          </td>
                          <td className="options"><TbDotsVertical /></td>
                        </tr>
                      ))
                )}
            </tbody>
        </StyledUserTable>
    )
}

const StyledUserTable = styled.table`
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

        p.status.Booked {
            background: var(--booked);
            color: var(--booked-text);
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
`;