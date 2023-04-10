import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import pages from "../pages";
import { BrowserRouter } from "react-router-dom";

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
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        {PATHS.map((x) => (
          <Route path={x.path} element={x.element()} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
