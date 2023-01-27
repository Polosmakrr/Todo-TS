import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup.string().email('Not valid email').required('Email is required'),
  password: yup.string().min(8).required('Password is required')
});

export const registerValidationSchema = yup.object({
  email: yup.string().email('Not valid email').required('Email is required'),
  password: yup.string().min(8).required('Password is required'),
  name: yup.string().min(2).max(50).required('Name is required')
});
