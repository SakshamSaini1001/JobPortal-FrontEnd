import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
interface PublicRouteProps {
  children: JSX.Element;
}
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = useSelector((state: any) => state.jwt);
  if (token) {
    return <Navigate to="/" />;
  }
  // const decoded: any = jwtDecode(token);
  // if (allowedRoles && !allowedRoles.includes(decoded.applicationType)) {
  //   return <Navigate to="/unauthorized" />;
  // }
  return children;
};

export default PublicRoute;
