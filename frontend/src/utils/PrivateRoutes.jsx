import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { storageData } = useAuth();

  return storageData ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
