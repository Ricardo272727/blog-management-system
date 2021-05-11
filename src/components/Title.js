import styled from "styled-components";
import { Typography } from "@material-ui/core";
import theme from "../theme";

const Title = styled(Typography)`
  color: ${theme.titles};
  font-weight: bold;
  text-align: left;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export default Title;
