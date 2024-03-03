import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import validator from 'validator'; 

const SignupPage = () => {
  const navigate = useNavigate(); 
  const [successMessage, setSuccessMessage] = useState('');

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').test('valid-email', 'Invalid email format', value => validator.isEmail(value)).required('Email is required'), // Validate email using validator
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    termsAndConditions: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSuccessMessage('Signup successful! Welcome email sent.');
      setSubmitting(false);
      navigate('/post-list'); 
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl items-center font-semibold mb-6">Signup</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <Field type="text" name="username" id="username" className="mt-1 p-2 w-full border rounded-md" />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field type="email" name="email" id="email" className="mt-1 p-2 w-full border rounded-md" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field type="password" name="password" id="password" className="mt-1 p-2 w-full border rounded-md" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <Field type="password" name="confirmPassword" id="confirmPassword" className="mt-1 p-2 w-full border rounded-md" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="termsAndConditions" className="flex items-center">
                  <Field type="checkbox" name="termsAndConditions" id="termsAndConditions" className="form-checkbox h-5 w-5 text-indigo-600" />
                  <span className="ml-2 text-sm text-gray-700">I agree to the terms and conditions</span>
                </label>
                <ErrorMessage name="termsAndConditions" component="div" className="text-red-500 text-sm" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700" disabled={isSubmitting}>Signup</button>
              <ErrorMessage name="general" component="div" className="text-red-500 text-sm mt-2" />
            </Form>
          )}
        </Formik>
        {successMessage && <div className="text-green-600 text-sm mt-2">{successMessage}</div>}
      </div>
    </div>
  );
};

export default SignupPage;
