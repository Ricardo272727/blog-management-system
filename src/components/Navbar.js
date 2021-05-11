import React from "react";
import _ from "lodash";
import styled from "styled-components";
import theme from "../theme";
import { useHistory } from "react-router-dom";

const createLink = (label, link) => ({ label, link });

const links = [
  createLink("Inventario", "/inventory/list"),
  createLink("Horarios", "/schedules/list"),
  createLink("Laboratorios", "/laboratory/list"),
  createLink("Licencias", "/license/list"),
];

const Navbar = (props) => {
  const history = useHistory();

  const Wrapper = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${theme.background};
    position: fixed;
    top: 0;
    left: 0;
  `;
  const NavItem = styled.button`
    padding: 0.8rem;
    background: ${theme.background};
    color: ${theme.titles};
    &:hover {
      background: ${theme.titles};
      color: ${theme.background};
    }
    cursor: pointer;
    border: none;
    outline: none;
  `;
  const redirect = (route) => history.push(route);
  return (
    <Wrapper>
      {_.map(links, (link, index) => (
        <NavItem key={index} onClick={() => redirect(link.link)}>
          {link.label}
        </NavItem>
      ))}
    </Wrapper>
  );
};

export default Navbar;
