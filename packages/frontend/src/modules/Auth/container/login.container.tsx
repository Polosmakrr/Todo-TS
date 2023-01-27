import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Container } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { IApiError, IUser } from '../../common/types';
import { STORAGE_KEYS, QUERY_KEYS } from '../../common/consts/app-keys.const';
import { ButtonComponent } from '../../common/components/button';
import { InputComponent } from '../../common/components/input/input.component';
import { loginValidationSchema } from '../../todo/schema/auth-validation.schema';
import { authService } from '../services/auth.service';
import { StyledTypography } from './styled';

export const LoginPageContainer = () => {
  const navigate = useHistory();
  const queryClient = useQueryClient();

  const onGoBackClick = () => {
    navigate.goBack();
  };

  const login = useMutation({
    mutationFn: async (user: IUser) => authService.login(user),
    onSuccess: (user) => {
      queryClient.invalidateQueries([QUERY_KEYS.USER]);
      localStorage.setItem(STORAGE_KEYS.TOKEN, user.token!);
      navigate.push('/todos');
      toast.success(`Welcome ${user.name}`);
    },
    onError: (error: IApiError) => {
      if (error.message.includes('401')) {
        toast.error('Email or Passord is Wrong!');
        return;
      }
      toast.error(error.message);
    }
  });

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      style={{ minHeight: '100vh' }}
    >
      <StyledTypography>Login</StyledTypography>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={loginValidationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={(values) => {
          login.mutate(values);
        }}
      >
        {(formik: FormikProps<IUser>) => (
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <InputComponent name="email" label="Email" />
            <InputComponent name="password" label="Password" />
            <Container style={{ textAlign: 'center' }}>
              <ButtonComponent name="GoBack" onClick={onGoBackClick} />
              <ButtonComponent name="Login" onClick={formik.handleSubmit} />
            </Container>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};
