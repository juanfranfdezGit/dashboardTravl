type Person = {
    name: string;
    image: string;
}

export interface Guest extends Person {
    id: string;
    specialRequest: {
        text: string;
        status: boolean;
    }
    status: "Pending" | "Booked" | "Canceled" | "Refund";
}