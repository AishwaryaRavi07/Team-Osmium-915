import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLogin = ({ setUserState }) => {
  const navigate = useNavigate();
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

  const loginHandler = (e,email,password) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);

    if (user.email=="admin@admin.com" && user.password=="admin"){
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Sign In Successful, Your PMI ID is 563 799 9876',
        showConfirmButton: false,
        timer: 3500

      })
      navigate("/")

    }


  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("", user).then((res) => {
        alert(res.data.message);
        setUserState(res.data.user);
        
      });
    }
  }, [formErrors]);
  return (
    <div className="container">
      <div className="login" >
        <form>
          <h1 style={{ margin: "10px" }}>Admin Login</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className="error" >{formErrors.email}</p>
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
        </form>
        
      </div>
    </div>
  );
};
export default AdminLogin;