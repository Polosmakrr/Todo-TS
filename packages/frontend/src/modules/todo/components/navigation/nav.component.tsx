import React from 'react';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ButtonComponent } from '../../../common/components/button';
import { APP_KEYS } from '../../../common/consts';

export const NavComponent = () => {
  const navigate = useHistory();

  const onProfileClick = () => {
    navigate.push(APP_KEYS.ROUTER_KEYS.PROFILE);
  };

  const onTodosClick = () => {
    navigate.push(APP_KEYS.ROUTER_KEYS.TODOS);
  };
  return (
    <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
      <ButtonComponent name="Todos" onClick={onTodosClick} />
      <ButtonComponent name="Profile" onClick={onProfileClick} />
    </Container>
  );
};
