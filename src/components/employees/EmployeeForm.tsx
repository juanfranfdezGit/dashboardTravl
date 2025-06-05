import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import axios from "axios";

export default function EmployeeForm({ onClose }) {

    const { t } = useTranslation();

    function formatDateISO() {
        const today = new Date();
        return today.toISOString(); 
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const jobDesk = form.querySelectorAll<HTMLInputElement>('input[name="jobDesk"]:checked');
        const jobDeskValues = Array.from(jobDesk).map(f => f.value);

        const schedule = form.querySelectorAll<HTMLInputElement>('input[name="schedule"]:checked');
        const scheduleValues = Array.from(schedule).map(f => f.value);

        const employeeData = {
            personImage: "https://randomuser.me/api/portraits/women/1.jpg",
            personName: (form.elements.namedItem("personName") as HTMLInputElement).value,
            contact: (form.elements.namedItem("contact") as HTMLInputElement).value,
            jobDesk: jobDeskValues,
            schedule: scheduleValues,
            joined: new Date().toISOString(),
            status: "Active"
        };

        axios.post("http://localhost:3000/api/employees", employeeData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            console.log("Empleado creado:", res.data);
            onClose();
        })
        .catch((error) => {
            console.log("Error al agregar empleado:", error);
        });
    };

    return (
        <StyledEmployeeForm>
             <form onSubmit={handleSubmit}>
                <p className="closebtn" onClick={onClose}>X</p>
                <h2>{t("form.Add Employee")}</h2>
                <div>
                    <input type="text" name="personName" id="personName" placeholder=" " required />
                    <label htmlFor="personName">{t("form.Employee Name")}</label>
                </div>
                <div>
                    <input type="number" name="contact" id="contact" placeholder=" " required />
                    <label htmlFor="contact">{t("form.Contact")}</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" id="Answering Guest Inquiries" name="jobDesk" value="Answering Guest Inquiries" /> {t("form.Answering Guest Inquiries")}</label>
                    <label><input type="checkbox" id="Directing Phone Calls" name="jobDesk" value="Directing Phone Calls" /> {t("form.Directing Phone Calls")}</label>
                    <label><input type="checkbox" id="Inventory Checks" name="jobDesk" value="Inventory Checks" /> {t("form.Inventory Checks")}</label>
                    <label><input type="checkbox" id="Front Desk Operation" name="jobDesk" value="Front Desk Operation" /> {t("form.Front Desk Operation")}</label>
                    <label><input type="checkbox" id="Hotel Maintenance" name="jobDesk" value="Hotel Maintenance" /> {t("form.Hotel Maintenance")}</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" id="Monday" name="schedule" value="Monday" /> {t("form.Monday")}</label>
                    <label><input type="checkbox" id="Tuesday" name="schedule" value="Tuesday" /> {t("form.Tuesday")}</label>
                    <label><input type="checkbox" id="Wednesday" name="schedule" value="Wednesday" /> {t("form.Wednesday")}</label>
                    <label><input type="checkbox" id="Thursday" name="schedule" value="Thursday" /> {t("form.Thursday")}</label>
                    <label><input type="checkbox" id="Friday" name="schedule" value="Friday" /> {t("form.Friday")}</label>
                    <label><input type="checkbox" id="Saturday" name="schedule" value="Saturday" /> {t("form.Saturday")}</label>
                    <label><input type="checkbox" id="Sunday" name="schedule" value="Sunday" /> {t("form.Sunday")}</label>
                </div>
                <div>
                    <input type="submit" id="Submit" value={t("form.Add Employee")} />
                </div>
            </form>
        </StyledEmployeeForm>
    )
}

const StyledEmployeeForm = styled.div `
    width: 100vw;
    height: 100vh;
    background: var(--overlay-back);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 5rem;

    form {
        background: var(--white);
        padding: 4rem 8rem;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: start;
        flex-direction: column;
        position: relative;

        .closebtn {
            position: absolute;
            right: 4rem;
            top: 2rem;
            cursor: pointer;
            font-weight: 900;
            font-size: 1.5rem;
        }

        h2 {
            margin-bottom: 2rem;
        }

        div {
            position: relative;
            display: flex;
            margin-bottom: 20px;
            width: 100%;

            label {
                position: absolute;
                left: 8px;
                pointer-events: none;
                top: 4px;
            }

            input {
                width: 100%;
                padding: 8px 12px;
                border-radius: 4px;
                border: 1px solid var(--overlay-back);
            }

            select {
                width: 100%;
                padding: 4px 8px;
                font-size: 1rem;
                font-family: poppins;
                border-radius: 4px;
            }

            textarea {
                resize: none;  
                width: 100%;
                padding: 4px 8px;
                font-size: 1rem;
                font-family: poppins;
                line-height: 1.5;
            }
        }

        .checkbox {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            padding: 2rem;
            max-width: 50vw;
            border: 1px solid var(--pending-text);
            flex-wrap: wrap;
            border-radius: 4px;

            label {
                position: relative;
                font-size: 1rem;
            }

            input[type="checkbox"] {
                appearance: none;
                width: 20px;
                height: 20px;
                padding: 6px;
                border: 2px solid var(--pending-text);
                border-radius: 4px;
                cursor: pointer;
                pointer-events: all;
                position: relative;
                transition: background 0.2s ease-in-out;
            }

            input[type="checkbox"]:checked {
                background-color: #2ecc71;
                border-color: #2ecc71;
            }

            input[type="checkbox"]:checked::after {
                content: "✔";
                color: white;
                position: absolute;
                top: -3px;
                left: 2px;
                font-size: 0.9rem;
            }
        }

        input:focus + label,
        input:not(:placeholder-shown) + label,
        textarea:focus + label,
        textarea:not(:placeholder-shown) + label {
            opacity: 0;
        }

        input[type="submit"] {
            width: 40%;
            margin: 12px auto;
            padding: 12px;
            color: var(--white);
            border: none;
            background: var(--room-available);
            font-size: 1rem;
            cursor: pointer;

            &:hover {
                box-shadow: 0 0 4px var(--black);
            }
        }
    }
`;