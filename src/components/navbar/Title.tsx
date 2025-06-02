import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { useLocation, useParams } from "react-router"
import { useEffect, useState } from "react";
import axios from "axios";

interface Guest {
  _id: string;
  personNumber?: string;
  personName: string;
  personImage?: string;
  specialRequest?: {
    text?: string;
    status?: boolean;
  };
}

export default function Title() {

    const location = useLocation();
    const { id } = useParams();
    const { t } = useTranslation();
    
    const [guest, setGuest] = useState<Guest | null>(null);

    const pathname = location?.pathname;
    const section = pathname ? pathname.split('/').pop() || 'dashboard' : 'dashboard';
    
    useEffect(() => {
        if (id) {
        axios.get<Guest>(`https://localhost:3000/api/guests/${id}`)
            .then(res => setGuest(res.data))
            .catch(err => {
            console.error("Error fetching guest:", err);
            setGuest(null);
            });
        }
    }, [id]);

    return (
        <StyledTitle>
            <HiOutlineBars3BottomLeft className="ico" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>{id ? t('titles.Guest Details') : t(`titles.${section}`)}</h1>
                { id && guest?.personName && (
                <h2 style={{ fontSize: '1rem', fontWeight: '400', color: '#135846' }}>
                    Guest / {guest.personName}
                </h2>
                )}
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