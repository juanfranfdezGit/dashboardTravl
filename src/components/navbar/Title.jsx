import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { useLocation, useParams } from "react-router"
import guestsData from '../../datas/guests.json';

export default function Title() {

    
    const location = useLocation();
    const { id } = useParams();
    const { t } = useTranslation();
    
    const guest = guestsData.find(guest => guest.id.toString() === id);

    const pathname = location?.pathname;
    const section = pathname ? pathname.split('/').pop() || 'dashboard' : 'dashboard';
    
    return (
        <StyledTitle>
            <HiOutlineBars3BottomLeft className="ico" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>{id ? t('titles.Guest Details') : t(`titles.${section}`)}</h1>
                {id ? <h2 style={{ fontSize: '1rem', fontWeight: '400', color: '#135846' }}>Guest / {guest.name}</h2> : ""}
            </div>
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