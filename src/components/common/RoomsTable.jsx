import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { fetchRoomData } from "../../redux/roomSlice";

export default function RoomTable({ filter }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { data: rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);

    const filteredRooms = (rooms || []).filter((room) => {
        if (filter === "All Rooms") {
            return true;
        } else if (filter === "Available" || filter === "Disponible") {
            return room.status === "Available";
        } else if (filter === "Booked" || filter === "Reservada") {
            return room.status === "Booked";
        }
        return true;
    });

    useEffect(() => {
        if (rooms.length === 0) {
            dispatch(fetchRoomData());
        }
    }, [dispatch, rooms.length]);

    const theads = [
        { label: t("rooms.Room Name"), key: "roomName" },
        { label: t("rooms.Bed Type"), key: "bedType" },
        { label: t("rooms.Room Floor"), key: "roomFloor" },
        { label: t("rooms.Facilities"), key: "facilities" },
        { label: t("rooms.Rate"), key: "rate" },
        { label: t("rooms.Status"), key: "status" },
        { label: "", key: "actions" },
    ]

    if (roomsLoading) return <p>Loading...</p>;
    if (roomsError) return <p>Error loading rooms: {roomsError}</p>;

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
                {filteredRooms.map((room, index) => (
                    <tr key={index}>
                        <td className="img-name">
                            <img src={room.image || "/placeholder.jpg"} alt={room.name} />
                            <div>
                                <p className="roomNumber">{room.roomNumber}</p>
                                <p>{room.name}</p>
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
                            <p className={`status room ${room.status}`}>{t(`rooms.${room.status}`)}</p>
                        </td>
                        <td className="options"><TbDotsVertical /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}