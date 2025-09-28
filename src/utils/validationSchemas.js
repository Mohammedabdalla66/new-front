import * as yup from 'yup';

// Password validation regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

// Phone number validation for Oman (+968)
const omanPhoneRegex = /^968\d{8}$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
});

export const companyRegisterSchema = yup.object({
  companyName: yup
    .string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters'),
  commercialRegistrationNumber: yup
    .string()
    .required('Commercial registration number is required')
    .min(5, 'Registration number must be at least 5 characters'),
  taxNumber: yup
    .string()
    .optional(),
  companyEmail: yup
    .string()
    .required('Company email is required')
    .email('Please enter a valid email address'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(omanPhoneRegex, 'Please enter a valid Oman phone number (+968XXXXXXXX)'),
  contactPersonName: yup
    .string()
    .required('Contact person name is required')
    .min(2, 'Name must be at least 2 characters'),
  companyType: yup
    .string()
    .required('Please select a company type')
    .notOneOf([''], 'Please select a company type'),
  city: yup
    .string()
    .required('City is required'),
  street: yup
    .string()
    .required('Street is required'),
  zipCode: yup
    .string()
    .required('Zip code is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordRegex, 'Password must contain at least one letter and one number'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

export const clientRegisterSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(omanPhoneRegex, 'Please enter a valid Oman phone number (+968XXXXXXXX)'),
  nationality: yup
    .string()
    .required('Please select your nationality')
    .notOneOf([''], 'Please select your nationality'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordRegex, 'Password must contain at least one letter and one number'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});