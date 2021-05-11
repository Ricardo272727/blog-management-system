import styled from "styled-components";

import theme from "../theme";

const Table = styled.table`
  margin-top: 2rem;
  width: 100%;
  thead {
    background: ${theme.activeButton};
    color: ${theme.button};
    th{
      padding: 0.5rem;
      font-weight: bold;
      text-decoration: underline ${theme.texts};
      font-size: 18px;
    }
  }
  tbody {
    width: 100%;
    background: ${theme.secondary};
    color: ${theme.titles};
    padding: 0.5rem;
    text-align: center;
  }
`;

export default Table;
