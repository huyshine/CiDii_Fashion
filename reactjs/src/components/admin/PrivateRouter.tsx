import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticate } from "../../utils/authenticate";

type PrivateRouterProps = {
  children: JSX.Element;
};

const PrivateRouter = (props: PrivateRouterProps) => {
  const authenticate = isAuthenticate();
  if(authenticate.user.role !== 1) return <Navigate to="/"/>
  return props.children;
};

export default PrivateRouter;
