import styled from "styled-components";
import { useState, useEffect } from 'react';
import bookingsData from '../../datas/bookings.json';

export default function BookingsList({ selectedDay }) {

    const [filteredBookings, setFilteredBookings] = useState([]);

    useEffect(() => {
        if (!selectedDay) return;

        const filtered = bookingsData.filter(booking => {
            const entryDate = new Date(booking.fecha_entrada);
            const exitDate = new Date(booking.fecha_salida);

            const sameDay = (date) =>
                date.getDate() === selectedDay.getDate() &&
                date.getMonth() === selectedDay.getMonth() &&
                date.getFullYear() === selectedDay.getFullYear();

            return sameDay(entryDate) || sameDay(exitDate);
        });

        setFilteredBookings(filtered);
    }, [selectedDay]);

    return (
        <StyledBookingsList>
            <ul>
                {filteredBookings.map((booking, index) => (
                    <li key={index}>
                        <img src="/assets/images/room01.jpg" alt="room" />
                        <div>
                            <p>{booking.tipo_habitacion || "queen bed"} <span>{booking.numero_habitacion || "A-114"}</span></p>
                            <p>{booking.nombre_cliente || "Nombre Cliente"}</p>
                        </div>
                        <p className="date">
                            {new Date(booking.fecha_entrada).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
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