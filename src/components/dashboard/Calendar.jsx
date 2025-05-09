import styled from "styled-components";
import React, { useState, useEffect, use } from 'react';
import bookingsData from '../../datas/bookings.json';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function Calendar() {

    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [selectedDay, SetSelectedDay] = useState(currentDay)

    const [bookings, setBookings] = useState([]);

    const today = new Date();
    const isCurrentMonthAndYear = currentMonth === today.getMonth() && currentYear === today.getFullYear();

    useEffect(() => {
        generateCalendar(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    useEffect(() => {
        const filtered = bookingsData.filter(booking => {
            const bookingDate = new Date(booking.fecha_entrada);
            return (
                bookingDate.getMonth() === currentMonth &&
                bookingDate.getFullYear() === currentYear
            );
        });
    
        setBookings(filtered);
    }, [currentMonth, currentYear]);

    const generateCalendar = (month, year) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];
        
    
        const numDays = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const adjustedStart = (startingDay === 0) ? 6 : startingDay - 1;

        for (let i = 0; i < adjustedStart; i++) {
            days.push(null);
        }
    
        for (let i = 1; i <= numDays; i++) {
            days.push(i);
        }
    
        setDaysInMonth(days);
    };


    const handleMonth = (num) => {
        setCurrentMonth(currentMonth + num)
    }

    const handleDayClick = (day) => {
        console.log(`Has seleccionado el día: ${day}`);
    };

    return (
        <StyledCalendar>
            <div className="calendar-header">
                <span className="calendarTitle">Recent Booking Schedule</span>
                <div className="month">
                    <FaChevronLeft onClick={() => handleMonth(-1)} />
                    <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</span>
                    <FaChevronRight onClick={() => handleMonth(+1)} />
                </div>
            </div>
            <div className="calendar-grid">
                {weekDays.map((day, index) => (
                    <div key={index} className="week-day">{day}</div>
                ))}

                {daysInMonth.map((day, index) => {
                    const isToday = isCurrentMonthAndYear && day === currentDay;
                    
                    const hasBooking = bookings.some(booking => {
                        const bookingDate = new Date(booking.fecha_entrada);
                        return (
                            bookingDate.getDate() === day &&
                            bookingDate.getMonth() === currentMonth &&
                            bookingDate.getFullYear() === currentYear
                        );
                    });

                    return (
                        <div
                            key={index}
                            className={`day ${isToday ? 'today' : ''} ${hasBooking ? 'booked' : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            {day || ''}
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
    margin-top: 2rem;
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
        padding: 18px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        font-weight: 700;
    }

    .day:hover {
        background-color: #ddd;
    }

    .week-day {
        padding: 10px;
    }

    .today {
        background-color: #ccc;
        color: white;
        font-weight: bold;
    }

    .booked {
        background-color: var(--booked-text);
        color: #fff;
    }

    .month {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        width: 49%;
        position: relative;
        top: 10px;
        gap: 20px;

        span {
            font-size: 1.5rem;
        }
    }

    .calendarTitle {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        width: 49%;
        margin-bottom: 20px;
    }
`;