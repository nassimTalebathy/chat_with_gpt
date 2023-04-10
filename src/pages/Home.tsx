import reactLogo from "../assets/react.svg";
import viteLogo from "../../public/vite.svg";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Chat App!</h1>
      <p>This is the home page of the Chat App.</p>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
  );
};

export default Home;
