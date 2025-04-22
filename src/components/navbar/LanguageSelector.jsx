import styled from "styled-components";

export default function LanguageSelector() {
    
    return (
        <StyledLanguageSelector>
            <select name="" id="">
                <option value="">EN</option>
                <option value="">ES</option>
            </select>
        </StyledLanguageSelector>
    )
}

const StyledLanguageSelector = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
`;
