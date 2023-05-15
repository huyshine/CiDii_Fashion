import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Typography } from "antd";
import { SubmitHandler } from "react-hook-form/dist/types";
import "../../../assets/css/auth.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../api/authenticate";
import { toast } from "react-toastify";

const { Text } = Typography;
type FormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("* Please enter username")
    .min(6, "* At least 6 characters")
    .trim(),
  email: yup
    .string()
    .required("* Please enter your email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"),
  password: yup
    .string()
    .required("* Please enter a password")
    .min(6, "* At least 6 characters")
    .trim(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Password confirm is required')
});
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await signup(data).then(() => {
        toast.success(
          "Successful account registration, redirect after 3 seconds"
        );
        reset();
        setTimeout(() => navigate("/signin"), 3000);
      }).catch(() => {
      toast.error("Email already exists in the system");
      })
    } catch (error) {
      toast.error("Error! Please try again later.");
    }
  };
  return (
    <div className="main-site main-childs">
      <div className="user-wrapper">
        <div className="user-nav">
          <a href="/signin">Sign In</a>
          <a href="/signup" className="active">
            Sign Up
          </a>
        </div>
        <form
          acceptCharset="UTF-8"
          id="formAcount"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="What's your name?"
              autoComplete="off"
              {...register("name")}
            />
            <Text type="danger">{errors.name?.message}</Text>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter email or username"
              {...register("email")}
              autoComplete="off"
            />
            <Text type="danger">{errors.email?.message}</Text>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            <Text type="danger">{errors.password?.message}</Text>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="rePassword"
              placeholder="Password"
              {...register("confirmPassword")}
            />
            <Text type="danger">{errors.confirmPassword?.message}</Text>
          </div>
          <button className="btn btn-signup" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
