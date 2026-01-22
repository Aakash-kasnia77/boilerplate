import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email('Enter a valid email address.')
    .required('Email is required.'),
  password: yup.string().required('Password is required.'),
})

export const signupSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email('Enter a valid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match.')
    .required('Confirm password is required.'),
})
