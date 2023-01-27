import React from 'react';
import { Container, Grid, LinearProgress, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { Title, Text } from './profile.styled';
import { SPACES, COLORS } from '../../theme';
import { NavComponent } from '../../todo/components/navigation/nav.component';
import { ButtonComponent } from '../../common/components/button';
import { authService } from '../../Auth/services/auth.service';
import { APP_KEYS } from '../../common/consts';
import { IApiError } from '../../common/types';

export const ProfileContainer = () => {
  const navigate = useHistory();

  const { isLoading, data: user } = useQuery(
    [APP_KEYS.QUERY_KEYS.USER],
    () => authService.current(),
    {
      refetchOnMount: true,
      onError: (error: IApiError) => {
        navigate.push(APP_KEYS.ROUTER_KEYS.HOME);
        if (error.message.includes('401')) {
          toast.error('Not Autorized!');
          return;
        }
        toast.error(error.message);
      }
    }
  );

  const onLogOutClick = () => {
    authService.logout();
    localStorage.removeItem(APP_KEYS.STORAGE_KEYS.TOKEN);
    toast.success('See you!');
    navigate.push(APP_KEYS.ROUTER_KEYS.HOME);
  };
  return (
    <Container style={{ paddingTop: SPACES.xl }}>
      <NavComponent />
      {isLoading && user ? (
        LinearProgress
      ) : (
        <Grid container alignItems="center" justifyContent="center" direction="column">
          <Container style={{ padding: SPACES.m, textAlign: 'center' }}>
            <Title variant="h2">Profile</Title>
          </Container>
          <Container maxWidth="xs" component={Paper} style={{ padding: SPACES.m }}>
            <Container style={{ height: '100px', marginBottom: SPACES.m }}>
              <img
                style={{
                  background: COLORS.secondary,
                  borderRadius: '50%',
                  height: '100%',
                  width: '30%',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
                src={user?.avatarUrl}
                alt={user?.name}
              />
            </Container>
            <Title>{user?.name}</Title>
            <Text>{user?.email}</Text>
            <ButtonComponent name="LogOut" onClick={onLogOutClick} />
          </Container>
        </Grid>
      )}
    </Container>
  );
};
