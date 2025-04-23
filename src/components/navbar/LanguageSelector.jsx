import styled from "styled-components";
import { useLanguage } from "../../context/languageContext";

export default function LanguageSelector() {

    const { language, changeLanguage } = useLanguage();
    
    return (
        <StyledLanguageSelector>
            <select name="language" id="language"  value={language} onChange={(e) => changeLanguage(e.target.value)}>
                <option value="EN">EN</option>
                <option value="ES">ES</option>
            </select>
        </StyledLanguageSelector>
    )
}

const StyledLanguageSelector = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;

    select {
        border: none;
        background: none;
        color: var(--secondary-color);
        padding: 8px 12px;
        font-size: 1rem;
        font-weight: 600;
        font-family: poppins;
        width: 70px;

        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg width='10' height='7' viewBox='0 0 10 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23135846' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 10px center;
        background-size: 12px;

        &:focus {
            outline: none;
        }
    }
`;
