import React from 'react'
import styled from 'styled-components';
import theme from '../theme';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const StyledLogoutButton = styled.button`
  border: none;
  background: transparent;
  color: ${theme.titles};
  padding: 1rem;
  position: fixed;
  bottom: 0;
  right: 0;
  cursor: pointer;
  &:hover{
    background: ${theme.titles};
    color: ${theme.background};
  }
`;

const LogoutButton = props => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("ap-username");
    history.replace('/');
  };

  return (
    <StyledLogoutButton onClick={logout}>
      <ExitToAppIcon fontSize="large"/>
    </StyledLogoutButton>    
  ) 
}

export default LogoutButton
