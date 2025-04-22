import styled from "styled-components";
import { FaHotel } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";

export default function Logo() {
    
    return (
        <Container>
            <StarIcon />
            <HotelIcon />
        </ Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const HotelIcon = styled(FaHotel)`
  color: var(--main-color);
  font-size: 3rem;          
  margin-bottom: 1rem;
`;

const StarIcon = styled(GiStarsStack)`
  color: var(--secondary-color);
  font-size: 2rem;   
`;

