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
                <div className="guestDatas">
                    <h1>{guest.name}</h1>
                    <p>ID {guest.id}</p>
                    <div className="datasIcos">
                        <FaPhoneAlt className="phoneIco" />
                        <button><LuMessageSquareText /> Send Message</button>
                    </div>
                </div>
                <SlOptionsVertical className="infoIco" />
            </div>
            <div className="chechInDiv">
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
        margin-bottom: 32px;

        img {
            border-radius: 8px;
        }

        .guestDatas {
            display: flex;
            flex-direction: column;
            gap: 12px;

            h1 {
                font: normal normal 600 30px/46px Poppins;
            }

            p {
                font: normal normal normal 14px/21px Poppins;
                color: var(--main-color);
            }

            .datasIcos {
                display: flex;
                gap: 8px;

                .phoneIco {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    padding: 10px;
                    border: 1px solid var(--main-color);
                    border-radius: 8px;
                    color: var(--main-color);
                    cursor: pointer;
                }

                button {
                    cursor: pointer;
                    border-radius: 8px;
                    border: 1px solid var(--main-color);
                    background: var(--main-color);
                    color: var(--white);
                    padding: 0 20px;
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }
            }

        }


        .infoIco {
            margin-left: auto;
        }
    }

    .chechInDiv {
        display: flex;
        gap: 60px;
    }
`;