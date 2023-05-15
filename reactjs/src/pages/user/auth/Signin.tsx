import React from "react";
import "../../../assets/css/auth.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { signin } from "../../../api/authenticate";

const { Text } = Typography;
type FormType = {
  name: string;
  email: string;
  password: string;
  role: number;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("* Please enter your email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"),
  password: yup
    .string()
    .required("* Please enter a password")
    .min(6, "* At least 6 characters")
    .trim(),
});
const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      const { data: user } = await signin(data);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Logged in successfully");
      const roleId = user.user.role == 1 ? navigate("/admin") : navigate("/");
    } catch (error) {
      toast.error("Error! Incorrect account or password");
    }
  };
  return (
    <div className="main-site main-childs">
      <div className="user-wrapper">
        <div className="user-nav">
          <a href="/signin" className="active">
            Sign In
          </a>
          <a href="/signup">Sign Up</a>
        </div>
        <form
          acceptCharset="UTF-8"
          id="formAcount"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter email or username"
              {...register("email")}
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
          {/* <input type="hidden" value={0} {...register("role")} /> */}
          <button className="btn">Sign In</button>
        </form>
        <div className="user-foot text-center">
          <a href="../forgot-password/index.html" className="clearfix">
            Forgot password?
          </a>
          <p className="clearfix">Or login with</p>
          <li className="loginFb">
            <span>
              <FaFacebookF />
            </span>
            <a href="#">Login Facebook</a>
          </li>
          <li className="loginGg">
            <span>
              <FcGoogle />
            </span>
            <a href="#">Login Google</a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Signin;
