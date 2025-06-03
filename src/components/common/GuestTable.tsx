import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Guest {
    personName: string;
    specialRequest?: {
        status: boolean;
        text: string;
    };
}

interface Room {
    roomImage: string;
    roomType: string;
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

export default function GuestTable({ filter }) {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        const token = localStorage.getItem('token');

        axios.get('http://localhost:3000/api/bookings', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setBookings(res.data))
        .catch(err => setError(err.message || "Error fetching bookings"))
        .finally(() => setLoading(false));
    }, []);
    
    const filteredBookings = (bookings || []).filter(booking => {
        if (!filter || filter === "All" || filter === "All Guests") return true;
        if (filter === "Pending" || filter === "Pendiente") return booking.status === "Pending";
        if (filter === "Booked" || filter === "Reservado") return booking.status === "Booked";
        if (filter === "Canceled" || filter === "Cancelado") return booking.status === "Canceled";
        if (filter === "Refund" || filter === "Reembolso") return booking.status === "Refund";
        return true;
    });

    const theads = [
        { label: t("bookings.Guest"), key: "guest.personName" },
        { label: t("bookings.Order Date"), key: "createDate" },
        { label: t("bookings.Check In"), key: "checkIn" },
        { label: t("bookings.Check Out"), key: "checkOut" },
        { label: t("bookings.Special Request"), key: "guest.specialRequest" },
        { label: t("bookings.Room Type"), key: "room.roomType" },
        { label: t("bookings.Status"), key: "status" },
        { label: "", key: "actions" },
    ]

    if (loading) return <p>{t("Loading...")}</p>;
    if (error) return <p>{t("Error loading bookings")}: {error}</p>;

    return (
        <table>
            <thead>
                <tr>
                    {theads.map(h => <th key={h.key}>{h.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {filteredBookings.map(booking => {
                    const guest: Guest = booking.guest || { personName: 'Unknown', specialRequest: { status: false, text: '' } };
                    const room: Room = booking.room || { roomImage: '/default-room.png', roomType: '-' };
                    const specialRequest = guest.specialRequest || { status: false, text: '' };

                    const createDate = new Date(booking.createDate).toLocaleDateString();
                    const checkInDate = new Date(booking.checkIn).toLocaleDateString();
                    const checkInHour = new Date(booking.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const checkOutDate = new Date(booking.checkOut).toLocaleDateString();
                    const checkOutHour = new Date(booking.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                        <tr key={booking._id} onClick={() => navigate(`/dashboard/guest/${booking._id}`)}>
                        <td className="img-name">
                            <img src={room.roomImage || '/default-room.png'} alt={guest.personName || 'Guest'} />
                            <div>
                            <p>{guest.personName || 'Unknown'}</p>
                            <p className="id">#{booking._id}</p>
                            </div>
                        </td>
                        <td><p>{createDate}</p></td>
                        <td>
                            <p>{checkInDate}</p>
                            <p className="hour">{checkInHour}</p>
                        </td>
                        <td>
                            <p>{checkOutDate}</p>
                            <p className="hour">{checkOutHour}</p>
                        </td>
                        <td className={`notes ${specialRequest.status ? "active" : ""}`}>
                            <p>{specialRequest.text ? t(`guest.${specialRequest.text}`) : '-'}</p>
                        </td>
                        <td><p>{room.roomType || '-'}</p></td>
                        <td><p className={`status ${booking.status}`}>{t(`guest.${booking.status}`)}</p></td>
                        <td className="options"><TbDotsVertical /></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}