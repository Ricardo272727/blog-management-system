import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";

import theme from "../theme";
import Title from "./Title";
import Navbar from "./Navbar";
import LogoutButton from "./LogoutButton";
import "./styles/index.css";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: ${theme.background};
  color: ${theme.text};
  overflow-x: hidden;
`;

const Page = ({ title, redirect, children }) => {
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <Navbar />
      <StyledPage>
        <Grid container style={{ padding: "2rem" }}>
          <Title variant="h2">{title}</Title>
        </Grid>
        <Grid container style={{ padding: "2rem" }}>
          <Grid container>{children}</Grid>
        </Grid>
      </StyledPage>
      <LogoutButton />
    </>
  );
};

export default Page;
