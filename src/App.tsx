import AppRouter from "./utils/router";
import "./App.css";
import { AuthenticationContextProvider } from "./auth/authentication.context";

const App = () => {
  return (
    <>
      <AuthenticationContextProvider>
        <AppRouter />
      </AuthenticationContextProvider>
    </>
  );
};

export default App;
