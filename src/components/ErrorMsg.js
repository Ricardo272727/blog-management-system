import styled from "styled-components";
import theme from "../theme";

const StyledError = styled.div`
  width: 100%;
  text-align: center;
  background: ${theme.titles};
  color: ${theme.background};
  margin-left: 0.5rem;
`;

const ErrorMsg = ({ error }) => {
  const style = {
    display: error ? "block" : "none",
    padding: error ? "0.5rem 1rem" : 0,
  };
  return (
    <StyledError>
      <center style={style}>
        <p>{error}</p>
      </center>
    </StyledError>
  );
};

export default ErrorMsg;
