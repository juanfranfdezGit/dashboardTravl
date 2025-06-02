import styled from "styled-components";
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

interface CalendarProps {
  selectedDay: Date | null;
  setSelectedDay: (date: Date) => void;
}

export default function Calendar({ selectedDay, setSelectedDay }) {

    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [daysInMonth, setDaysInMonth] = useState<(number | null)[]>([]);
    const [currentDay, setCurrentDay] = useState(today.getDate());

    const [bookings, setBookings] = useState<Booking[]>([]);

    const isCurrentMonthAndYear = currentMonth === today.getMonth() && currentYear === today.getFullYear();

    useEffect(() => {
        generateCalendar(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.get<Booking[]>('http://localhost:3000/api/bookings', {
                    params: {
                        year: currentYear,
                        month: currentMonth + 1,
                    }
                });
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setBookings([]);
            }
        }
        fetchBookings();
    }, [currentMonth, currentYear]);

    const generateCalendar = (month: number, year: number) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days: (number | null)[] = [];
        
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

    const handleMonth = (num: number) => {
        let newMonth = currentMonth + num;
        let newYear = currentYear;

        if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        } else if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const handleDayClick = (day: number | null) => {
        if (!day) return;
        const selectedDate = new Date(currentYear, currentMonth, day);
        setSelectedDay(selectedDate);
    };

    return (
        <StyledCalendar>
            <div className="calendar-header">
                <span className="calendarTitle">Recent Booking Schedule</span>
                <div className="month">
                    <FaChevronLeft onClick={() => handleMonth(-1)} />
                    <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</span>
                    <FaChevronRight onClick={() => handleMonth(1)} />
                </div>
            </div>
            <div className="calendar-grid">
                {weekDays.map((day, index) => (
                    <div key={index} className="week-day">{day}</div>
                ))}

                {daysInMonth.map((day, index) => {
                    if (day === null) {
                        return <div key={index} className="day empty"></div>;
                    }

                    const isToday = isCurrentMonthAndYear && day === currentDay;

                    const hasBooking = bookings.some(booking => {
                        const bookingDate = new Date(booking.checkIn);
                        return (
                            bookingDate.getDate() === day &&
                            bookingDate.getMonth() === currentMonth &&
                            bookingDate.getFullYear() === currentYear
                        );
                    });

                    const hasCheckOut = bookings.some(booking => {
                        const checkOutDate = new Date(booking.checkOut);
                        return (
                            checkOutDate.getDate() === day &&
                            checkOutDate.getMonth() === currentMonth &&
                            checkOutDate.getFullYear() === currentYear
                        );
                    });

                    return (
                        <div
                            key={index}
                            className={[
                                'day',
                                isToday ? 'today' : '',
                                hasBooking ? 'booked' : '',
                                hasCheckOut ? 'checkOut' : '',
                                (hasBooking && hasCheckOut) ? 'both' : ''
                            ].filter(Boolean).join(' ')}
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
    margin-top: 2rem;
    cursor: pointer;
    border-radius: 8px;

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

    .checkOut {
        background-color: var(--refund-text);
        color: #fff;
    }

    .both {
        background-color: var(--calendar-both);
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