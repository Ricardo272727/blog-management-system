import styled from "styled-components";
import { Paper } from "@material-ui/core";

import theme from "../../theme";

const SecondaryPaper = styled(Paper)`
  && {
    background-color: ${theme.secondary};
  }
`;

export default SecondaryPaper;
