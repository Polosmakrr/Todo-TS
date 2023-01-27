import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { APP_KEYS } from '../../common/consts';
import { ButtonComponent } from '../../common/components/button';
import { SPACES, FONTS } from '../../theme';
import { StyledTypographyTitle } from './styled';

export const MainNavContainer = () => {
  const navigate = useHistory();

  const onSignUpClick = () => {
    navigate.push(APP_KEYS.ROUTER_KEYS.REGISTRATION);
  };
  const onLoginClick = () => {
    navigate.push(APP_KEYS.ROUTER_KEYS.LOGIN);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      style={{ minHeight: '100vh' }}
    >
      <StyledTypographyTitle variant="h1">Planing To Do list</StyledTypographyTitle>
      <ButtonComponent
        styles={{
          wigth: SPACES.xl,
          height: SPACES.xl,
          fontSize: FONTS.SIZES.m,
          marginBottom: SPACES.xl
        }}
        name="Login"
        onClick={onLoginClick}
      />

      <ButtonComponent
        styles={{
          wigth: SPACES.xl,
          height: SPACES.xl,
          fontSize: FONTS.SIZES.m
        }}
        name="SignUp"
        onClick={onSignUpClick}
      />
    </Grid>
  );
};
