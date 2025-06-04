import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import { useEffect, useState } from "react";
import axios from 'axios';
import { MdOutlinePhone } from "react-icons/md";

interface Employee {
  _id: string;
  personName: string;
  personImage: string;
  joined: string;
  jobDesk: string[];
  schedule: string[];
  contact: string;
  status: 'Active' | 'Inactive';
}

export default function EmployeeTable({ filter }) {

    const { t } = useTranslation();

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const filteredEmployee = (employees || []).filter(employee =>
        !filter || filter === "All Employees" ? true :
        ["Active Employees", "Empleados Activos"].includes(filter) ? employee.status === "Active" :
        ["Inactive Employees", "Empleados Inactivos"].includes(filter) ? employee.status === "Inactive" : true
    );

    useEffect(() => {
        setLoading(true);

        const token = localStorage.getItem('token');

        axios.get('http://localhost:3000/api/employees', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setEmployees(res.data))
        .catch(err => setError(err.message || "Error fetching bookings"))
        .finally(() => setLoading(false));
    }, []);

    const theads: {label: string, key: string}[] = [
        { label: t("employees.Name") , key: "Name"},
        { label: t("employees.Job Desk") , key: "Job Desk"},
        { label: t("employees.Schedule") , key: "Schedule"},
        { label: t("employees.Contact") , key: "Contact"},
        { label: t("employees.Status") , key: "Status"},
        { label: "", key: "actions" },
    ]

    if (loading) return <p>{t("Loading...")}</p>;
    if (error) return <p>{t("Error loading employees")}: {error}</p>;

    return (
        <table>
            <thead>
                <tr>
                    {theads.map(h => <th key={h.key}>{h.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {filteredEmployee.map((emp) => (
                    <tr key={emp._id}>
                        <td className="img-name">
                            <img src={emp.personImage} alt={emp.personName} />
                            <div>
                                <p>{emp.personName}</p>
                                <p className="id">#{emp._id}</p>
                                <p>{`${t("employees.Joined on")} ${emp.joined}`}</p>
                            </div>
                        </td>
                        <td>
                            {emp["jobDesk"].map((task, i) => (
                                <span key={i}>
                                {t(`employees.${task}`)}
                                {i < emp["jobDesk"].length - 1 ? ", " : "."} 
                                </span>
                            ))}
                        </td>
                        <td>
                            {emp.schedule.map((day, i) => (
                                <span key={i}>
                                {`${t(`employees.${day}`)}`}
                                {i < emp.schedule.length - 1 ? ", " : "."} 
                                </span>
                            ))}
                            <p className="check">Check Schedule</p>
                        </td>
                        <td><p><MdOutlinePhone className="phone" /> {emp.contact}</p></td>
                        <td>
                            <p className={`status employee ${emp.status}`}>{t(`employees.${emp.status}`)}</p>
                        </td>
                        <td className="options"><TbDotsVertical /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}