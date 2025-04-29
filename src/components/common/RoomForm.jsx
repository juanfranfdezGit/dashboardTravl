import styled from "styled-components";
import { useState } from "react";

export default function RoomForm() {

    const [ data, setData ] = useState([]);
    const [ err, setErr ] = useState("");
    
    return (
        <StyledRoomForm>
            <form action="">
                <div>
                    <input type="text" />
                    <label htmlFor=""></label>
                    <p className="err"></p>
                </div>
            </form>
        </StyledRoomForm>
    )
}

const StyledRoomForm = styled.div `

`;