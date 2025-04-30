import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function EmployeeForm({ onClose }) {

    const { t } = useTranslation();

    const [data, setData] = useState({});
    const [err, setErr] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const jobDesk = form.querySelectorAll('input[name="JobDesk"]:checked');
        const jobDeskValues = Array.from(jobDesk).map(f => f.value);

        const Schedule = form.querySelectorAll('input[name="Schedule"]:checked');
        const ScheduleValues = Array.from(Schedule).map(f => f.value);

        const employeeData = {
            name: formData.get("Room Name"),
            bedType: formData.get("Bed Type"),
            floor: formData.get("Room Floor"),
            rate: formData.get("Rate"),
            jobDesk: jobDeskValues,
            Schedule: ScheduleValues,
        }

        setData(employeeData);
        console.log("Employee Data Submitted:", employeeData);
        onClose()
    };

    return (
        <StyledEmployeeForm>
             <form onSubmit={handleSubmit}>
                <p className="closebtn" onClick={onClose}>X</p>
                <h2>{t("form.Add Employee")}</h2>
                <div>
                    <input type="text" name="Employee Name" id="Employee Name" placeholder=" " required />
                    <label htmlFor="Employee Name">{t("form.Employee Name")}</label>
                </div>
                <div>
                    <input type="number" name="Contact" id="Contact" placeholder=" " required />
                    <label htmlFor="Contact">{t("form.Contact")}</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Answering Guest Inquiries" /> {t("form.Answering Guest Inquiries")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Directing Phone Calls" /> {t("form.Directing Phone Calls")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Inventory Checks" /> {t("form.Inventory Checks")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Front Desk Operation" /> {t("form.Front Desk Operation")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Hotel Maintenance" /> {t("form.Hotel Maintenance")}</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" id="Schedule" name="Schedule" value="Monday" /> {t("form.Monday")}</label>
                    <label><input type="checkbox" id="Schedule" name="Schedule" value="Tuesday" /> {t("form.Tuesday")}</label>
                    <label><input type="checkbox" id="Schedule" name="Schedule" value="Wednesday" /> {t("form.Wednesday")}</label>
                    <label><input type="checkbox" id="Schedule" name="Schedule" value="Thursday" /> {t("form.Thursday")}</label>
                    <label><input type="checkbox" id="Schedule" name="Schedule" value="Friday" /> {t("form.Friday")}</label>
                    <label><input type="checkbox" id="Schedule" name="Schedule" value="Saturday" /> {t("form.Saturday")}</label>
                    <label><input type="checkbox" id="Schedule" name="Schedule" value="Sunday" /> {t("form.Sunday")}</label>
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
    padding-top: 10rem;

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
            top: 3rem;
            cursor: pointer;
            font-weight: 900;
            font-size: 1.5rem;
        }

        h2 {
            margin-bottom: 1rem;
        }

        div {
            position: relative;
            display: flex;
            margin-bottom: 18px;
            width: 100%;

            label {
                position: absolute;
                left: 8px;
                pointer-events: none;
                top: 0;
            }

            input {
                width: 100%;
                padding: 4px 8px;
            }
        }

        .checkbox {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            border: 1px solid var(--pending-text);
            padding: 2rem;
            max-width: 50vw;
            flex-wrap: wrap;
            
            label {
                position: relative;
                font-size: 1rem;
            }

            input[type="checkbox"] {
                appearance: none;
                width: 20px;
                height: 20px;
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
        input:not(:placeholder-shown) + label {
            opacity: 0;
        }

        input[type="submit"] {
            padding: 12px;
            color: var(--white);
            border: none;
            background: var(--main-color);
            font-size: 1rem;
            cursor: pointer;
        }
    }
`;