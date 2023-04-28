import { Navigate, Outlet } from "react-router-dom";
const LoginCheckRoute = () => {
  let auth = localStorage.getItem("Zept_Auth_token_User");
  return auth ? <Navigate to="/" /> : <Outlet />;
};
export default LoginCheckRoute;
