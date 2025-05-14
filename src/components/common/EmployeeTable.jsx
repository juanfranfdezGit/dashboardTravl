import { useTranslation } from 'react-i18next';
import { TbDotsVertical } from "react-icons/tb";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePhone } from "react-icons/md";

import { fetchEmployeeData } from "../../redux/employeeSlice.ts";

export default function EmployeeTable({ filter }) {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { data: employees, loading: employeesLoading, error: employeesError } = useSelector((state) => state.employees);

    const filteredEmployee = (employees || []).filter((employee) => {
        if (filter === "All Employees") {
            return true;
        } else if (filter === "Active Employees" || filter === "Empleados Activos") {
            return employee.status === "Active";
        } else if (filter === "Inactive Employees" || filter === "Empleados Inactivos") {
            return employee.status === "Inactive";
        }
        return true;
    });

    useEffect(() => {
        if (employees.length === 0) {
          dispatch(fetchEmployeeData());
        }
    }, [dispatch, employees.length]);

    const theads = [
        { label: t("employees.Name") , key: "Name"},
        { label: t("employees.Job Desk") , key: "Job Desk"},
        { label: t("employees.Schedule") , key: "Schedule"},
        { label: t("employees.Contact") , key: "Contact"},
        { label: t("employees.Status") , key: "Status"},
        { label: "", key: "actions" },
    ]

    if (employeesLoading) return <p>Loading...</p>;
    if (employeesError) return <p>Error loading employees: {employeesError}</p>;

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
                {filteredEmployee.map((emp, index) => (
                    <tr key={index}>
                        <td className="img-name">
                            <img src={emp.image} alt={emp.name} />
                            <div>
                                <p>{emp.name}</p>
                                <p className="id">#{emp.id}</p>
                                <p>{`${t("employees.Joined on")} ${emp.joined}`}</p>
                            </div>
                        </td>
                        <td>
                            {emp["jobDesk"].map((task, i) => (
                                <span key={i}>
                                {t(`employees.${task}`)}
                                {i < emp["jobDesk"].length - 1 ? ", " : "."} {/* Reemplaza la coma por un punto en el último item */}
                                </span>
                            ))}
                        </td>
                        <td>
                            {emp.schedule.map((day, i) => (
                                <span key={i}>
                                {`${t(`employees.${day}`)}`}
                                {i < emp.schedule.length - 1 ? ", " : "."} {/* Reemplaza la coma por un punto en el último item */}
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
                ))};
            </tbody>
        </table>
    );
}