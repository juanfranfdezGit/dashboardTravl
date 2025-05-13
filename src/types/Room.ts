export default interface Room {
    roomId: string;
    roomNumber: string;
    roomName: string;
    bedType: string;
    roomFloor: string;
    facilities: string[];
    rate: number;
    roomImage: string;
    roomStatus: "Available" | "Booked";
    description: string;
}