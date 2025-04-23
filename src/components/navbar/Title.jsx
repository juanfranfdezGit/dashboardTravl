import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { useLocation } from "react-router"

export default function Title() {

    const location = useLocation();
    const { t } = useTranslation();

    const pathname = location?.pathname;
    const section = pathname ? pathname.split('/').pop() || 'dashboard' : 'dashboard';
    
    return (
        <StyledTitle>
            <HiOutlineBars3BottomLeft className="ico" />
            <h1>{t(`titles.${section}`)}</h1>
        </StyledTitle>
    )
}

const StyledTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin-right: auto;

    .ico {
        transform: scale(2);
    }

    h1 {
        font-size: 2rem;
        font-weight: 600;
    }
`;