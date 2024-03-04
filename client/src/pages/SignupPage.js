import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import validator from 'validator';

export default function SignupPage() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      navigate('/postlist');
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!validator.isEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    if (formData.password !== formData['confirm-password']) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData['terms-and-conditions']) {
      newErrors.termsAndConditions = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {errors.username && <span className="text-red-500">{errors.username}</span>}
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {errors.password && <span className="text-red-500">{errors.password}</span>}
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirm-password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms-and-conditions"
            className="form-checkbox h-5 w-5 text-indigo-600"
            onChange={handleChange}
          />
          <span>I agree to the terms and conditions</span>
        </label>
        {errors.termsAndConditions && <span className="text-red-500">{errors.termsAndConditions}</span>}
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          SignUp
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
