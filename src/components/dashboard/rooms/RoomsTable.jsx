import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import roomsData from "../../../datas/rooms.json";
import { useState } from "react";

export default function RoomTable() {
  const { t } = useTranslation();
  const [rooms] = useState(roomsData);

  return (
    <StyledUserTable>
      <thead>
        <tr>
          <th>{t("rooms.Room Name")}</th>
          <th>{t("rooms.Bed Type")}</th>
          <th>{t("rooms.Room Floor")}</th>
          <th>{t("rooms.Facilities")}</th>
          <th>{t("rooms.Rate")}</th>
          <th>{t("rooms.Status")}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room, index) => (
          <tr key={index}>
            <td className="room">
              <img src={room.image} alt={room.Name} />
              <div>
                <p>{room.id}</p>
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
        ))}
      </tbody>
    </StyledUserTable>
  );
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
            font-size: 0.8rem;
        }

        span {
            margin: 2px 0;
            font-size: 0.8rem;
        }

        p.status {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px 12px;
            border-radius: 8px;
        }

        p.status.Available {
            background: var(--room-available);
            color: var(--white);
        }

        p.status.Booked {
            background: var(--room-booked);
            color: var(--white);
        }

        &.room {
            display: flex;
            align-items: center;
            gap: 16px;

            img {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            object-fit: cover;
            }

            div {
            display: flex;
            flex-direction: column;
            }

            p.roomId {
            color: var(--main-color);
            }
        }

        &.options {
            text-align: center;
        }
    }
    }

    th:nth-child(1), td:nth-child(1) { width: 280px; } 
    th:nth-child(2), td:nth-child(2) { width: 150px; } 
    th:nth-child(3), td:nth-child(3) { width: 150px; } 
    th:nth-child(4), td:nth-child(4) { width: 380px; } 
    th:nth-child(5), td:nth-child(5) { width: 120px; } 
    th:nth-child(6), td:nth-child(6) { width: 140px; }
    th:nth-child(7), td:nth-child(7) { width: 60px; }  
`;