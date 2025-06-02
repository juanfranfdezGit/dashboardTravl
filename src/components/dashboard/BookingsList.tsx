import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Booking {
  _id: string;
  guest: {
    _id: string;
    personNumber?: string;
    personName: string;
    personImage?: string;
    checkIn?: {
        date: string;
        hour: string;
    };
    checkOut?: {
        date: string;
        hour: string;
    };
  };
  room: {
    _id: string;
    roomNumber: string;
    roomName: string;
    bedType: string;
    roomFloor: string;
    facilities: string[];
    rate: number;
    roomImage: string;
    roomStatus: string;
    description: string;
  };
  checkIn: string;
  checkOut: string;
  status: string;
}

interface BookingsListProps {
  selectedDay: Date | null;
}

export default function BookingsList({ selectedDay }) {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get<Booking[]>('https://localhost:3000/api/bookings')
        .then(res => setBookings(res.data))
        .catch(err => console.error('Error fetching bookings:', err))
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!selectedDay) {
        setFilteredBookings([]);
        return;
        }

        const filtered = bookings.filter(booking => {
        const checkInDate = new Date(booking.checkIn);
        const checkOutDate = new Date(booking.checkOut);

        const sameDay = (date: Date) =>
            date.getDate() === selectedDay.getDate() &&
            date.getMonth() === selectedDay.getMonth() &&
            date.getFullYear() === selectedDay.getFullYear();

        return sameDay(checkInDate) || sameDay(checkOutDate);
        });

        setFilteredBookings(filtered);
    }, [selectedDay, bookings]);

    if (loading) return <p>Loading bookings...</p>;

    if (filteredBookings.length === 0) return <p>No bookings for selected day.</p>;

    return (
        <StyledBookingsList>
            <ul>
                {filteredBookings.map((booking, index) => (
                    <li key={index}>
                        <img src="/assets/images/room01.jpg" alt="room" />
                        <div>
                            <p>{booking.room.bedType || "queen bed"} <span>{booking.room.roomNumber || "A-114"}</span></p>
                            <p>{booking.guest.personName || "Nombre Cliente"}</p>
                        </div>
                        <p className="date">
                            {new Date(booking.checkIn).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                        </p>
                    </li>
                ))}
            </ul>
            <p className="more">Ver Mas</p>
        </StyledBookingsList>
    )
}

const StyledBookingsList = styled.div `
    width: 95%;
    background: white;
    padding: 2rem;
    margin-top: 2rem;
    border-radius: 8px;

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;

        li {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 70%;
            gap: 20px;

            img {
                width: 30%;
                border-radius: 8px;
            }

            .date {
                margin-left: auto;
                padding: 4px 1rem;
                background: green;
                border-radius: 8px;
            }
        }
    }

    .more {
        color: green;
        cursor: pointer;
        margin-top: 1rem;
        margin-left: 15rem;
    }
`;