import { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useHistory } from "react-router-dom";

const StyledWelcomePage = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap");

  width: 100vw;
  height: 100vh;
  background: ${theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
    color: ${theme.titles};
    font-weight: bold;
    font-family: "Alfa Slab One", cursive;
    font-size: 5.5rem;
  }
  p {
    text-align: center;
    color: ${theme.text};
    font-weight: bold;
    font-size: 1.5rem;
    font-family: "Alfa Slab One", cursive;
    cursor: pointer;
    :hover {
      color: ${theme.titles};
    }
  }
`;

const WelcomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const goLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.replace("/login");
    }, 2500);
  };

  const msgStyle = {};
  if (loading) {
    msgStyle.display = "none";
  }

  return (
    <StyledWelcomePage>
      <div>
        <h1>Sistema de gestión de bitácora - FCC BUAP</h1>
        <p onClick={goLogin} style={msgStyle}>
          Click para continuar
        </p>
        <center>
          <ScaleLoader
            color={theme.titles}
            loading={loading}
            width={30}
            height={150}
            radius={2}
            margin={2}
          />
        </center>
      </div>
    </StyledWelcomePage>
  );
};

export default WelcomePage;
