import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import pages from "../pages";
import { HashRouter, BrowserRouter } from "react-router-dom";

const { ProfilePage, ChatRoom, LoginPage, NotFound, Home, LogOutPage } = pages;
const PATHS = [
  { path: "/chat", element: () => <ChatRoom /> },
  { path: "/login", element: () => <LoginPage /> },
  { path: "/logOut", element: () => <LogOutPage /> },
  { path: "/profile", element: () => <ProfilePage /> },
  { path: "*", element: () => <NotFound /> },
];

const AppRouter = () => {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        {PATHS.map((x) => (
          <Route path={x.path} element={x.element()} />
        ))}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
