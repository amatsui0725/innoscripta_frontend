import {
  Container,
  TextField,
  Grid,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin, errorMessage, errors, loading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userLogin(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent={"center"}>
        <Grid item md={4} sx={{ mt: 5 }}>
          <Typography
            variant="h3"
            component="div"
            align="center"
            sx={{ mb: 4 }}
            color="initial"
            fontFamily="monospace"
          >
            User Login
          </Typography>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errorMessage}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            {errors && (
              <Typography
                variant="body"
                align="center"
                color="error"
                sx={{ mb: 2 }}
              >
                {errors.email}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            {errors && (
              <Typography
                variant="body"
                align="center"
                color="error"
                sx={{ mb: 2 }}
              >
                {errors.name}
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mb: 2 }}
              disabled={loading}
            >
              Login
            </Button>
          </form>
          <Typography variant="body1" color="initial" align="center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary fw-bold text-decoration-none"
            >
              Register
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
