import React, { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import Input from "../components/Input";
import Icon from "../images/undraw_Data_re_80ws.svg";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import { authenticate } from "../api";
import ErrorMsg from "../components/ErrorMsg";

const StyledLogin = styled.div`
  width: 100%;
  height: 100vh;
  background: ${theme.background};
  color: ${theme.titles};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBox = styled.div`
  width: 25%;
  padding: 1rem;
  background: ${theme.button};
  text-align: center;
`;

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
`;

const Login = (props) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [state, setState] = useState({ username: "", password: "" });
  const onChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    if (state.username && state.password) {
      authenticate(state)
        .then((result) => {
          if(result.error){
            setError("Usuario o contraseña inválidos");
          } else {
            localStorage.setItem("ap-token", result.token);          
            setError("Bienvenido");
            setTimeout(() => history.push("/inventory/list"), 2000);
          }
        })
        .catch((err) => {
          setError("Usuario o contraseña inválidos");
        });
    } else {
      setError("Usuario y contraseña son requeridos");
    }
  };

  return (
    <StyledLogin>
      <StyledBox>
        <div style={{ width: "80%", margin: "2rem auto 3rem auto" }}>
          <StyledImg src={Icon} />
        </div>
        <div>
          <h2>Sistema de gestión de bitácora</h2>
        </div>

        <Input
          label="Nombre de usuario"
          placeholder="Nombre de usuario"
          name="username"
          type="text"
          onChange={onChange}
          value={state.username}
        />
        <Input
          label="Contraseña"
          placeholder="Contraseña"
          name="password"
          type="password"
          onChange={onChange}
          value={state.password}
        />
        <ErrorMsg error={error} />
        <Button
          onClick={handleLogin}
          style={{ width: "100%", marginTop: "1rem" }}
        >
          Iniciar sesión
        </Button>
      </StyledBox>
    </StyledLogin>
  );
};

export default Login;
