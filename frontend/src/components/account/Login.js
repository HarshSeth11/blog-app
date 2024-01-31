import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../app/Slices/authSlice";
import Input from "../form/Input";
import { useForm } from "react-hook-form";
import Button from "../form/Button";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // used useFrom here
  const { register, handleSubmit } = useForm();

  // checking if the user is loggedin
  const isLoggedIn = useSelector((state) => state.authReducer.auth.isLogin);

  // redirect user if already loggedin
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);


  // Handle on submit 
  const onSubmit = async (data) => {
    console.log(data);
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const results = await response.json();
    console.log(results.msg);

    if (results.success) {
      alert("You're Successfully logged in");
      dispatch(login(results));
      navigate("/");
    } else if (!results.success) {
      alert(results.msg);
    }
  };

  return (
    <div className="page">
      <div className="box">
        <div className="login-form">
          <div class="col-lg-12 login-title">LOGIN</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Enter email"
              type="email"
              className="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              placeholder="Enter Password"
              type="password"
              className="password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="from-group">
              <Button type="submit" className="btn signup-btn col-6">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
