import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import { useEffect, useState } from "react";
import axios from 'axios';

interface Room {
    _id: string;
    roomId: string;
    roomNumber: string;
    roomName: string;
    bedType: string;
    roomFloor: string;
    facilities: string[];
    rate: number;
    roomImage: string;
    roomStatus: 'Available' | 'Booked';
    description: string;
}

export default function RoomTable({ filter }) {
    const { t } = useTranslation();

    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const filteredRooms = (rooms || []).filter(room =>
        !filter || filter === "All Rooms" ? true :
        (filter === "Available" || filter === "Disponible") ? room.roomStatus === "Available" :
        (filter === "Booked" || filter === "Reservada") ? room.roomStatus === "Booked" : true
    );

    useEffect(() => {
        setLoading(true);

        const token = localStorage.getItem('token');

        axios.get('http://localhost:3000/api/rooms', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setRooms(res.data))
        .catch(err => setError(err.message || "Error fetching bookings"))
        .finally(() => setLoading(false));
    }, []);

    const theads = [
        { label: t("rooms.Room Name"), key: "roomName" },
        { label: t("rooms.Bed Type"), key: "bedType" },
        { label: t("rooms.Room Floor"), key: "roomFloor" },
        { label: t("rooms.Facilities"), key: "facilities" },
        { label: t("rooms.Rate"), key: "rate" },
        { label: t("rooms.Status"), key: "status" },
        { label: "", key: "actions" },
    ]

    if (loading) return <p>{t("Loading...")}</p>;
    if (error) return <p>{t("Error loading rooms")}: {error}</p>;

    return (
        <table>
            <thead>
                <tr>
                    {theads.map(h => <th key={h.key}>{h.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {filteredRooms.map((room) => (
                    <tr key={room._id}>
                        <td className="img-name">
                            <img src={room.roomImage || "/placeholder.jpg"} alt={room.roomName} />
                            <div>
                                <p className="roomNumber">{room.roomNumber}</p>
                                <p>{room.roomName}</p>
                            </div>
                        </td>
                        <td><p>{t(`rooms.${room.bedType}`)}</p></td>
                        <td><p>{`${t("rooms.Floor")} ${room.roomFloor}`}</p></td>
                        <td className="facilities">
                            {(room.facilities || []).map((facility, index) => (
                                <span key={index}>
                                    {t(`rooms.${facility}`)}
                                    {index < room.facilities.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </td>
                        <td><p>${room.rate} / {t("rooms.Night")}</p></td>
                        <td>
                            <p className={`status room ${room.roomStatus}`}>{t(`rooms.${room.roomStatus}`)}</p>
                        </td>
                        <td className="options"><TbDotsVertical /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}