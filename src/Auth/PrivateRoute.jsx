import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Spinner from "../shared components/Spinner";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  let { loading, user } = useContext(AuthContext);
  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
}

export default PrivateRoute;
