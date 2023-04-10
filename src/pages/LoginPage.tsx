import { useContext } from "react";
import { AuthenticationContext } from "../auth/authentication.context";
import LoginComponent from "../components/Auth/Login";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  if (isAuthenticated) {
    return <Navigate to={"/chat"} replace={true} />;
  }

  return <LoginComponent />;
};

export default LoginPage;
