import { Navigate } from "react-router-dom";
import LogOutComponent from "../components/Auth/LogOut";
import { useContext } from "react";
import { AuthenticationContext } from "../auth/authentication.context";

const LogOutPage = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return <LogOutComponent />;
};

export default LogOutPage;
