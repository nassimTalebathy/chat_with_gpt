import { useContext } from "react";
import { AuthenticationContext } from "../auth/authentication.context";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { isAuthenticated, user } = useContext(AuthenticationContext);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div>
      <h1>Profile</h1>
      <ul>
        {user &&
          Object.entries(user).map((keyVal) => (
            <li key={keyVal[0]}>
              {keyVal[0]}: {keyVal[1]}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
