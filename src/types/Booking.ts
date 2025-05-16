import Guest from './Guest';
import Room from './Room';

export interface Booking {
    bookingID: string,
    guest: Guest;
    room: Room;
    createDate: Date;
    updateDate: Date;
    deleteDate: Date | null;
    checkIn: Date;
    checkOut: Date;
    status: "Pending" | "Booked" | "Canceled" | "Refund";
}