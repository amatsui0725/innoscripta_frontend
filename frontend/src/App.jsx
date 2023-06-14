import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Setting from "./pages/Settings";
import Feed from "./pages/Feed";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import Header from "./components/bar/Header";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/*" Component={PrivateRoutes}>
            <Route path="" Component={Home} />
            <Route path="feed" Component={Feed} />
            <Route path="setting" Component={Setting} />
          </Route>
          <Route path="/*" Component={PublicRoutes}>
            <Route path="login" Component={Login} />
            <Route path="register" Component={Register} />
          </Route>
        </Routes>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
