import React from "react";
import styled from "styled-components";

import theme from "../theme";

const Button = styled.button`
  background: ${theme.button};
  color: white;
  padding: 0.35rem 1rem;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${theme.activeButton};
    color: ${theme.background};
  }
`;

export default Button;
