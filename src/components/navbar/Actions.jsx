import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { BiMessageDetail } from "react-icons/bi";

export default function NavbarActions() {
    
    return (
        <StyledNavbarActions>
            <li><IoSearchOutline className="ico"/></li>
            <li><CiHeart className="ico"/></li>
            <li><CiMail className="ico"/></li>
            <li><CiBellOn className="ico"/></li>
            <li><BiMessageDetail className="ico opacit"/></li>
            <img src="/assets/portrait.jpg" alt="photo" />
        </StyledNavbarActions>
    )
}

const StyledNavbarActions = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 55px;
    border-right: 1px solid #0002;
    padding: 0 30px;

    .ico {
        transform: scale(1.5);
        color: var(--main-color);
        cursor: pointer;

        &.opacit {
            opacity: .7;
        }
    }

    img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        object-position: center;
        border-radius: 8px;
    }
`;
