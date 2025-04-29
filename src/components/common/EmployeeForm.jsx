import styled from "styled-components";
import { useState } from "react";

export default function EmployeeForm() {

    const [ data, setData ] = useState([]);
    const [ err, setErr ] = useState("");
    
    return (
        <StyledEmployeeForm>
            <form action="">
                <div>
                    <input type="text" />
                    <label htmlFor=""></label>
                    <p className="err"></p>
                </div>
            </form>
        </StyledEmployeeForm>
    )
}

const StyledEmployeeForm = styled.div `

`;