import styled from "styled-components";
import { FaHotel } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";

export default function Logo({ title, span }) {
    
    return (
        <Container>
          <div className="logoImg">
            <StarIcon />
            <HotelIcon />
          </div>
          <div className="logoText">
            <p className="logoTitle">{title}</p>
            <span className="logoSpan">{span}</span>
          </div>
        </ Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 20px;

    .logoImg {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .logoText {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      .logoTitle {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: -8px;
      }

      .logoSpan {
        font-size: 1rem;
        opacity: .5;
        text-transform: capitalize;
      }
    }
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

