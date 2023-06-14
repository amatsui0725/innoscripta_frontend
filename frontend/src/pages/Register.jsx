import { Container, Grid, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState();
  const { userRegister, loading, errors } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword) return setError("Password didn't match");
    try {
      await userRegister(name, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ mt: 2, minHeight: '100vh' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h3" align="center" sx={{ mb: 4, mt: 5 }}>
            User Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              sx={{ mb: 3 }}
            />
            {
              errors && 
              <Typography variant="body" align="center" color="error" sx={{ mb: 2 }}>
                {errors.name}
              </Typography>
            }
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              sx={{ mb: 3 }}
            />
            {
              errors && 
              <Typography variant="body" align="center" color="error" sx={{ mb: 2 }}>
                {errors.email}
              </Typography>
            }
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              sx={{ mb: 3 }}
            />
            {
              errors && 
              <Typography variant="body" align="center" color="error" sx={{ mb: 2 }}>
                {errors.password}
              </Typography>
            }
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              sx={{ mb: 3 }}
            />
            {
              error && 
              <Typography variant="body" align="center" color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            }
            <Button variant="contained" type="submit" fullWidth sx={{ mb: 2 }} disabled={loading}>
              Register
            </Button>
          </form>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary fw-bold text-decoration-none">
              Login
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;