import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchGuestData } from "../../redux/guestSlice";

export default function GuestTable({ filter }) {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: guests, loading: guestsLoading, error: guestsError } = useSelector((state) => state.guests);

    const filteredGuest = (guests || []).filter((guest) => {
        if (filter === "All Guests") {
            return true;
        } else if (filter === "Pending" || filter === "Pendiente") {
            return guest.status === "Pending";
        } else if (filter === "Booked" || filter === "Reservado") {
            return guest.status === "Booked";
        } else if (filter === "Canceled" || filter === "Cancelado") {
            return guest.status === "Canceled";
        } else if (filter === "Refund" || filter === "Reembolso") {
            return guest.status === "Refund";
        }
        return true;
    });

    useEffect(() => {
        if (guests.length === 0) {
            dispatch(fetchGuestData());
        }
    }, [dispatch, guests.length]);

    const theads = [
        { label: t("guest.Guest"), key: "guest" },
        { label: t("guest.Order Date"), key: "orderDate" },
        { label: t("guest.Check In"), key: "checkIn" },
        { label: t("guest.Check Out"), key: "checkOut" },
        { label: t("guest.Special Request"), key: "specialRequest" },
        { label: t("guest.Room Type"), key: "roomType" },
        { label: t("guest.Status"), key: "status" },
        { label: "", key: "actions" },
    ]

    if (guestsLoading) return <p>Loading...</p>;
    if (guestsError) return <p>Error loading guests: {guestsError}</p>;

    return (
        <table>
            <thead>
                <tr>
                    {theads.map((header, index) => (
                        <th key={index}>{header.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {filteredGuest.map((guest, index) => (
                    <tr key={index} onClick={() => navigate(`/dashboard/guest/${guest.id}`)}>
                        <td className="img-name">
                            <img src={guest.image} alt={guest.name} />
                            <div>
                                <p>{guest.name}</p>
                                <p className="id">#{guest.id}</p>
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
                            <p>{t(`guest.${guest.specialRequest.text}`)}</p>
                        </td>
                        <td><p>{guest.roomType}</p></td>
                        <td><p className={`status ${guest.status}`}>{t(`guest.${guest.status}`)}</p></td>
                        <td className="options"><TbDotsVertical /></td>
                    </tr>
                ))};
            </tbody>
        </table>
    );
}