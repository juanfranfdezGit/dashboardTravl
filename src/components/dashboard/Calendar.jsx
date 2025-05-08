import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import bookingsData from '../../datas/bookings.json';

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [currentDay, setCurrentDay] = useState(new Date().getDate());

    useEffect(() => {
        generateCalendar(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    const generateCalendar = (month, year) => {
        const firstDay = new Date(year, month, 1); // El primer día del mes
        const lastDay = new Date(year, month + 1, 0); // El último día del mes
        const days = [];

        // Determinamos cuántos días hay en el mes
        const numDays = lastDay.getDate();
        const startingDay = firstDay.getDay(); // El día de la semana del primer día del mes

        // Llenamos los días con el número correcto de días del mes
        for (let i = 1; i <= numDays; i++) {
            days.push(i);
        }

        // Establecer el estado de los días
        setDaysInMonth(days);
    };

    const handleDayClick = (day) => {
        console.log(`Has seleccionado el día: ${day}`);
    };

    return (
        <StyledCalendar>
            <div className="calendar-header">
                <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</span>
            </div>
            <div className="calendar-grid">
                {daysInMonth.map((day, index) => {
                    const isToday = day === currentDay;
                    return (
                        <div
                            key={index}
                            className={`day ${isToday ? 'today' : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </StyledCalendar>
    );
}

const StyledCalendar = styled.div`
    background: white;
    padding: 2rem;
    width: 46.5%;
    margin: 2rem auto;
    cursor: pointer;

    .calendar-header {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
        text-align: center;
    }

    .day {
        padding: 10px;
        background-color: #f0f0f0;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
    }

    .day:hover {
        background-color: #ddd;
    }

    .today {
        background-color: #ccc;
        color: white;
        font-weight: bold;
    }
`;