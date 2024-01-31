import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../componentsStyle/Account.css";
import { useDispatch } from "react-redux";
import { signup } from "../../app/Slices/authSlice";
import { useForm } from "react-hook-form";
import Input from "../form/Input";
import Button from "../form/Button";

export default function Signup() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const createUser = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:5000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const results = await response.json();
      console.log(results);

      if (results.success) {
        dispatch(signup(results));
        navigate("/");
      } else if (!results.success && results.obj) {
        for (let key in results.obj) {
          alert(`${key} already exists`);
        }
      } else if (!results.success) {
        alert(results.error);
        console.log(results.error);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div className="page">
      <div className="box">
        <div className="signup-form">
          <div class="col-lg-12 login-title">SIGN UP</div>
          <form onSubmit={handleSubmit(createUser)}>
            <Input
              placeholder="Name"
              type="text"
              className="name"
              {...register("name", { required: true })}
            />
            <Input
              placeholder="Username"
              type="text"
              className="username"
              {...register("username", { required: true })}
            />
            <Input
              placeholder="Email"
              type="email"
              className="email"
              {...register("email", { required: true })}
            />
            <Input
              placeholder="Password"
              type="password"
              className="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Enter 8 word password",
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                },
              })}
            />
            <div className="from-group">
              <Button type="submit" className="btn signup-btn col-6">
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
