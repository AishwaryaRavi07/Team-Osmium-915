import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {app} from "./firebaseConfig"
import {getAuth, signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider} from "firebase/auth";

const UserLogin = ({ setUserState }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const googleProvider= new GoogleAuthProvider();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    signInWithEmailAndPassword(auth,user.email,user.password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Sign In Successful',
        showConfirmButton: false,
        timer: 3500
      })
      
      navigate('/');
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Invalid Credentials!")
      // ..
    });
  };

  const GoogleAuthentication =(e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    signInWithPopup(auth, googleProvider)
  .then((result) => {
    console.log(result.user)
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Sign In Successful',
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/')
  }).catch((error) => {
    alert(error.message) 
  });

  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
    }
  }, [formErrors]);
  return (
    <div className="container">
      <div className="login">
        <form>
          <h1 style={{ margin: "10px" }}>Login</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className="error">{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className="error">{formErrors.password}</p>
          <button className="button_common" onClick={loginHandler}>
            Login
          </button>
          <button className="google-signup-button" onClick={GoogleAuthentication}>
          <img src="./google-icon.png"/>
            Sign In With Google
          </button>
        </form>
        <NavLink to="/studentreg">Not yet registered? Register Now</NavLink>
      </div>
    </div>
  );
};
export default UserLogin;