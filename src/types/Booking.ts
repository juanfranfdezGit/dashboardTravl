import Guest from './Guest';
import Room from './Room';

export interface Booking {
    guest: Guest;
    room: Room;
    orderDate: string;
    checkIn: {
        date: string;
        hour: string;
    };
    checkOut: {
        date: string;
        hour: string;
    };
    status: "Pending" | "Booked" | "Canceled" | "Refund";
}