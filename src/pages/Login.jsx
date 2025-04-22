import Button from "../components/common/Button"
import styled from 'styled-components';
import Logo from "../components/sideBar/Logo";
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLogin } from '../context/loginContext';

export default function Login() {
  const { login, isAuthenticated  } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const success = login(username, password);
  
    if (success) {
      navigate('/dashboard');
    } else {
      alert('Credenciales incorrectas');
    }
  };

    return (
        <>
            <Container> 
                <div className="container">
                    <Logo />

                    <h1>Login</h1>
                    <form action="post" onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <input id="username" type="text" placeholder=" " onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username">Username</label>
                            <FaUser className="inputIcon" />
                        </div>
                        <div className="inputContainer">
                            <input id="password" type="password" placeholder=" " onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="password">Password</label>
                            <MdOutlinePassword className="inputIcon" />
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
    gap: 12px;
    width: 150%;
  }

  .inputContainer {
    display: flex;
    width: 100%;
    position: relative;

      input {
        padding: 12px 0rem 12px 58px;
        border: 1px solid #ccc;
        border-radius: 6px;
        width: 100%;
      }

      label {
        display: block;
        margin-top: 0.5rem;
        position: absolute;
        left: 58px;
        pointer-events: none;
      }

      .inputIcon {
        position: absolute;
        left: 24px;
        top: 12px;
      }

      input:focus + label,
      input:not(:placeholder-shown) + label {
          opacity: 0;
      }
  }
`;