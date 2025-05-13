import { Person } from "./Person";

export default interface Guest extends Person {
    guestId: string;
    specialRequest: {
        text: string;
        status: boolean;
    }
}