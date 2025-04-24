import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import guestsData  from "../../../datas/guests.json"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserTable() {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [guests] = useState(guestsData);

    return (
        <StyledUserTable>
            <thead>
                <tr>
                    {/* <th><input type="checkbox" name="check" id="check" /></th> */}
                    <th>{t("users.Guest")}</th>
                    <th>{t("users.Order Date")}</th>
                    <th>{t("users.Check In")}</th>
                    <th>{t("users.Check Out")}</th>
                    <th>{t("users.Special Request")}</th>
                    <th>{t("users.Room Type")}</th>
                    <th>{t("users.Status")}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {guests.map((guest, index) => (
                    <tr key={index} onClick={() => navigate(`/dashboard/users/${guest.id}`)}>
                        {/* <td><input type="checkbox" name="check" id="check" /></td> */}
                        <td className="guest">
                            <img src={guest.image} alt={guest.name} />
                            <div>
                                <p>{guest.name}</p>
                                <p className="guestId">#{guest.id}</p>
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
                            <p>{t(`users.${guest.specialRequest.text}`)}</p>
                        </td>
                        <td><p>{guest.roomType}</p></td>
                        <td><p className={`status ${guest.status}`}>{t(`users.${guest.status}`)}</p></td>
                        <td className="options"><TbDotsVertical /></td>
                    </tr>
                ))}
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

      p.guestId {
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

      &.guest {
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
      }

      &.options {
        text-align: center;
      }
    }
  }

  th:nth-child(9), td:nth-child(9) {
    width: 40px;
    text-align: center;
  }

  th:nth-child(2), td:nth-child(2) { width: 290px; } 
  th:nth-child(3), td:nth-child(3) { width: 150px; }
  th:nth-child(4), td:nth-child(4),
  th:nth-child(5), td:nth-child(5) { width: 120px; }
  th:nth-child(6), td:nth-child(6) { width: 140px; }
  th:nth-child(7), td:nth-child(7) { width: 140px; }
  th:nth-child(8), td:nth-child(8) { width: 100px; }

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

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid black;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    background-color: white;
    display: inline-block;

    &:checked {
      border-color: #135846;
    }

    &:checked::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 8px;
      height: 8px;
      background-color: #135846;
      border-radius: 2px;
    }
  }
`;