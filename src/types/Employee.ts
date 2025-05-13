export interface Employee {
    id: string;
    image: string;
    name: string;
    joined: string;
    jobDesk: string[];
    schedule: string[];
    contact: string;
    status: "Active" | "Inactive";
}