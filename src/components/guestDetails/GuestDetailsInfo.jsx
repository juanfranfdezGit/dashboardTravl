import styled from "styled-components";
import { FaPhoneAlt } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import guestsData from '../../datas/guests.json';
import { useParams } from 'react-router-dom';
import { SlOptionsVertical } from "react-icons/sl";

export default function GuestDetailsInfo() {

    const { id } = useParams();

    const guest = guestsData.find(guest => guest.id.toString() === id);
  
    if (!guest) return <p>Huésped no encontrado.</p>;

    return (
        <StyledGuestDetailsInfo>
            <div className="guestInfo">
                <img src={guest.image} alt={guest.name} />
                <div>
                    <h1>{guest.name}</h1>
                    <p>ID {guest.id}</p>
                    <div>
                        <FaPhoneAlt />
                        <button><LuMessageSquareText /> Send Message</button>
                    </div>
                </div>
                <SlOptionsVertical className="infoIco" />
            </div>
            <div>
                <div>
                    <span>Check In</span>
                    <p>{guest.checkIn.date} | {guest.checkIn.hour}</p>
                </div>
                <div>
                    <span>Check Out</span>
                    <p>{guest.checkOut.date} | {guest.checkOut.hour}</p>
                </div>
            </div>
        </StyledGuestDetailsInfo>
    )
}

const StyledGuestDetailsInfo = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    border-bottom: 1px solid var(--pending-text);
    position: absolute;
    left: 3rem;
    top: 3rem;
    width: 30vw;
    padding-bottom: 2rem;

    .guestInfo {
        display: flex;
        width: 100%;
        gap: 32px;
        margin-bottom: 20px;

        img {
            border-radius: 8px;
        }

        h1 {
            font: normal normal 600 30px/46px Poppins;
        }

        p {
            font: normal normal normal 14px/21px Poppins;
            color: var(--main-color);
        }

        .infoIco {
            margin-left: auto;
        }
    }
`;