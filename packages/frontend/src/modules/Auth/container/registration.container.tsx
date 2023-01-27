import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Container } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { IApiError, IUser } from '../../common/types';
import { ButtonComponent } from '../../common/components/button';
import { registerValidationSchema } from '../../todo/schema';
import { InputComponent } from '../../common/components/input/input.component';
import { authService } from '../services/auth.service';
import { StyledTypography } from './styled';

export const RegistartionPageContainer = () => {
  const navigate = useHistory();
  const onGoBackClick = () => {
    navigate.goBack();
  };

  const registration = useMutation({
    mutationFn: async (user: IUser) => authService.register(user),
    onSuccess: () => {
      navigate.push('/login');
      toast.success('Registration Successfully');
      toast.success('Now you could logged In');
    },
    onError: (error: IApiError) => {
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
      <StyledTypography>Registartion</StyledTypography>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        validationSchema={registerValidationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={(values) => {
          registration.mutate(values);
        }}
      >
        {(formik: FormikProps<IUser>) => (
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <InputComponent name="name" label="Name" />
            <InputComponent name="email" label="Email" />
            <InputComponent name="password" label="Password" />
            <Container style={{ textAlign: 'center' }}>
              <ButtonComponent name="GoBack" onClick={onGoBackClick} />
              <ButtonComponent name="SignUp" onClick={formik.handleSubmit} />
            </Container>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};
