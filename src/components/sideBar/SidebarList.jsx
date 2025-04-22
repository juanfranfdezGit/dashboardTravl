import styled from "styled-components";
import { useState } from "react";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

export default function SidebarList() {

    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const links = [
        { icon: <RiLayoutMasonryFill className="icos" />, label: "Dashboard", path: "/dashboard" },
        { icon: <IoKeyOutline className="icos" />, label: "Room", path: "/dashboard/rooms" },
        { icon: <CiCalendarDate className="icos" />, label: "Bookings", path: "/dashboard/bookings" },
        { icon: <FaUser className="icos" />, label: "Guest", path: "/dashboard/users" },
        { icon: <IoExtensionPuzzleOutline className="icos" />, label: "Concierge", path: "/dashboard/contact" },
    ];

    const handleClick = (index, path) => {
        setActiveIndex(index);
        navigate(path);
      };
    
    return (
        <StyledList>
          {links.map((link, index) => (
            <li
              key={index}
              className={`sidebarLinks ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleClick(index, link.path)}
            >
              {link.icon} {link.label}
            </li>
          ))}
        </StyledList>
    );
}

const StyledList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
    margin-top: 60px;

    .sidebarLinks {
        opacity: .4;
        cursor: pointer;
        transition: all .5s;
        display: flex;
        align-items: center;

        &:hover {
            opacity: 1;
        }

        &.active {
            color: var(--secondary-color);
            opacity: 1;
        }

        .icos {
            margin-right: 20px;
        }
    }
`;