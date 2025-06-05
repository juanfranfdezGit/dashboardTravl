import styled from "styled-components";
import { FaPhoneAlt } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useState } from "react";
import axios from "axios";

interface Guest {
    _id: string;
    personName: string;
    personImage: string;
    specialRequest?: {
        status: boolean;
        text: string;
    };
}

interface Room {
    roomImage: string;
    bedType: string;
}

interface Booking {
    _id: string;
    guest: Guest;
    room: Room;
    createDate: string; 
    checkIn: string; 
    checkOut: string;
    status: string;
}

export default function GuestDetailsInfo() {

    const { id } = useParams();

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if (id) {
        axios.get<Booking[]>(`http://localhost:3000/api/bookings`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                const guestBooking = res.data.find(b => b._id === id);
                if (guestBooking) {
                    setBooking(guestBooking);
                    console.log("Param ID:", id);
                    console.log("Booking IDs:", res.data.map(b => ({ bookingId: b._id, guestId: b.guest._id })));
                } else {
                    console.warn("Guest not found")
                }
            })
            .catch(err => {console.error("Error fetching guest:", err);})
            .finally(() => {setLoading(false);});
        }
    }, [id]);
    
    if (loading) return <p>Loading...</p>;
    if (!booking) return <p>Huésped no encontrado.</p>;

    const guest = booking.guest;
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);

    return (
        <StyledGuestDetailsInfo>
            <div className="guestInfo">
                <img src={guest.personImage} alt={guest.personName} />
                <div className="guestDatas">
                    <h1>{guest.personName}</h1>
                    <p>ID {guest._id}</p>
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
                    <p>{checkInDate.toLocaleDateString()} | {checkInDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div>
                    <span>Check Out</span>
                    <p>{checkOutDate.toLocaleDateString()} | {checkOutDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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