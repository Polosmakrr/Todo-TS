import * as yup from 'yup';

export const todoValidationSchema = yup.object({
  title: yup.string().min(2).max(100).required('Title is required'),
  description: yup.string().min(2).required('Description is required'),
  compleated: yup.boolean(),
  isprivate: yup.boolean()
});
