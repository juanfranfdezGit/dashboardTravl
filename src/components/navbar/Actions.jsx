import styled from "styled-components";
import { CiMail } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { useLogin } from '../../context/loginContext';

export default function NavbarActions() {
    
    const { logout } = useLogin();

    return (
        <StyledNavbarActions>
            <li><CiMail className="ico"/><p className="numb">3</p></li>
            <li><CiBellOn className="ico"/><p className="numb">87</p></li>
            <li><MdLogout className="ico" onClick={() => logout()} /></li>
            <img src="/assets/portrait.jpg" alt="photo"  />
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
    
    li {
        position: relative;

        .numb {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            background: var(--secondary-color);
            font-size: .6rem;
            color: var(--white);
            top: -14px;
            right: -16px;
            width: 24px;
            height: 24px;
            pointer-events: none;
        }

        .ico {
            transform: scale(1.5);
            color: var(--main-color);
            cursor: pointer;

            &.opacit {
                opacity: .6;
            }
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
