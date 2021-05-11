import styled from "styled-components";
import theme from '../theme';

const TransparentButton = styled.button`
  border: none;
  outline: none;
  padding: 0.5rem;
  cursor: pointer;
  background: transparent;
  color: white;
  &:hover{
    color: ${theme.titles};
  }
`;

export default TransparentButton;
