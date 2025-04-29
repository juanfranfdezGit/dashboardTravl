import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function RoomForm({ onClose }) {

    const { t } = useTranslation();

    const [data, setData] = useState({});
    const [err, setErr] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const facilities = form.querySelectorAll('input[name="Facilities"]:checked');
        const facilitiesValues = Array.from(facilities).map(f => f.value);

        const roomData = {
            name: formData.get("Room Name"),
            bedType: formData.get("Bed Type"),
            floor: formData.get("Room Floor"),
            rate: formData.get("Rate"),
            facilities: facilitiesValues,
        }

        setData(roomData);
        console.log("Room Data Submitted:", roomData);
        onClose()
    };
    
    return (
        <StyledRoomForm>
            <form onSubmit={handleSubmit}>
                <p className="closebtn" onClick={onClose}>X</p>
                <h2>{t("form.Add Room")}</h2>
                <div>
                    <input type="text" name="Room Name" id="Room Name" placeholder=" " required />
                    <label htmlFor="Room Name">{t("form.Room Name")}</label>
                </div>
                <div>
                    <input type="text" name="Bed Type" id="Bed Type" placeholder=" " required />
                    <label htmlFor="Bed Type">{t("form.Bed Type")}</label>
                </div>
                <div>
                    <input type="text" name="Room Floor" id="Room Floor" placeholder=" " required />
                    <label htmlFor="Room Floor">{t("form.Room Floor")}</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="AC" /> {t("form.AC")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Shower" /> {t("form.Shower")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Double Bed" /> {t("form.Double Bed")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Towel" /> {t("form.Towel")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Bathup" /> {t("form.Bathup")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Coffe Set" /> {t("form.Coffe Set")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Wifi" /> {t("form.Wifi")}</label>
                    <label><input type="checkbox" id="Facilites" name="Facilities" value="Balcony" /> {t("form.Balcony")}</label>
                </div>
                <div>
                    <input type="number" name="Rate" id="Rate" placeholder=" " required />
                    <label htmlFor="Rate">{t("form.Rate")}</label>
                </div>
                <div>
                    <input type="submit" id="Submit" value={t("form.Add Room")} />
                </div>
            </form>
        </StyledRoomForm>
    )
}

const StyledRoomForm = styled.div `
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