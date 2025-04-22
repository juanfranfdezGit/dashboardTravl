import Button from "../components/common/Button"
import styled from 'styled-components';
import Logo from "../components/common/Logo";
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";

export default function Login() {

    return (
        <>
            <Container> 
                <div className="container">
                    <Logo />

                    <h1>Login</h1>
                    <form action="">
                        <div>
                            <input type="text" />
                            <label htmlFor="">Username</label>
                            <FaUser />
                        </div>
                        <div>
                            <input type="password" />
                            <label htmlFor="">Password</label>
                            <MdOutlinePassword />
                        </div>
                        <Button type='solid' text='Login' />
                    </form>
                </div>
            </ Container>
        </>
    )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--main-color);
  position: relative;

  .container {
    background: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 16px var(--black);
    padding: 4rem 8rem;
  }

  h1 {
    margin-bottom: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
  }

  input {
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
  }

  label {
    display: block;
    margin-top: 0.5rem;
  }

  img {
    max-width: 100%;
  }
`;