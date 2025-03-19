import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
interface PublicRouteProps {
  children: JSX.Element;
}
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = useSelector((state: any) => state.jwt);
  const location = useLocation();

  // Allow access to both /login and /signup for unauthenticated users
  if (!token) {
    return children;
  }

  // If user is authenticated, prevent access to login/signup and redirect to home
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
