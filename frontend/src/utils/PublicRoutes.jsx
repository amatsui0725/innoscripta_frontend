import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  const { storageData } = useAuth();

  return !storageData ? <Outlet /> : <Navigate to={"/"} />;
};

export default PublicRoutes;
