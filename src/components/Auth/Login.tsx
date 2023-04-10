import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../auth/authentication.context";

const LoginComponent: React.FC<any> = () => {
  const { authError, onLogin } = useContext(AuthenticationContext);

  const initialApiKey = import.meta.env.VITE_OPENAI_KEY || "";
  const [apiKey, setApiKey] = useState(initialApiKey);

  const handleLogin = (e: React.FormEvent) => {
    // console.log("handleLogin event");
    e.preventDefault();
    apiKey && onLogin(apiKey);
  };

  return (
    <div style={{ minHeight: "300px", height: "100%", width: "100%" }}>
      <h2>Login Page</h2>
      <form>
        <input
          type="text"
          style={{ width: "50%", height: "30%" }}
          minLength={50}
          maxLength={100}
          placeholder="Enter your API KEY here"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      {authError && <div style={{ color: "red" }}>{authError}</div>}
    </div>
  );
};

export default LoginComponent;
