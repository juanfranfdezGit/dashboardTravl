import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/employeeSlice";

export default function EmployeeForm({ onClose }) {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    function formatDate() {
        const today = new Date();
    
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    
        const day = today.getDate();
        const month = monthNames[today.getMonth()];
        const year = today.getFullYear();
    
        function getDaySuffix(day) {
            if (day > 3 && day < 21) return 'th'; 
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        }
    
        const suffix = getDaySuffix(day);
    
        return `${month} ${day}${suffix} ${year}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const jobDesk = e.target.querySelectorAll('input[name="jobDesk"]:checked');
        const jobDeskValues = Array.from(jobDesk).map(f => f.value);

        const schedule = e.target.querySelectorAll('input[name="schedule"]:checked');
        const scheduleValues = Array.from(schedule).map(f => f.value);

        const employeeData = {
            id: "0000124",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
            name: e.target["employeeName"].value,
            contact: e.target["contact"].value,
            jobDesk: jobDeskValues,
            schedule: scheduleValues,
            joined: formatDate(),
            status: "Active"
        }

        dispatch(addEmployee(employeeData))
        console.log("Employee Data Submitted:", employeeData);
        onClose()
    };

    return (
        <StyledEmployeeForm>
             <form onSubmit={handleSubmit}>
                <p className="closebtn" onClick={onClose}>X</p>
                <h2>{t("form.Add Employee")}</h2>
                <div>
                    <input type="text" name="employeeName" id="employeeName" placeholder=" " required />
                    <label htmlFor="employeeName">{t("form.Employee Name")}</label>
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