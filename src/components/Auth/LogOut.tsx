import React, { useContext } from "react";
import { AuthenticationContext } from "../../auth/authentication.context";

const LogOutComponent: React.FC<any> = () => {
  const { authError, setAuthError, onLogout } = useContext(
    AuthenticationContext
  );

  const handleLogOutClick = (event: React.MouseEvent) => {
    onLogout();
    setAuthError(undefined);
  };

  return (
    <div style={{ minHeight: "300px", height: "100%", width: "100%" }}>
      <h2>Logout Page</h2>
      <div>
        <button onClick={(e) => handleLogOutClick(e)}>Log Out</button>
      </div>
      {authError && <div style={{ color: "red" }}>{authError}</div>}
    </div>
  );
};

export default LogOutComponent;
