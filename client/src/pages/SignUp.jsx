import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const emailInpRef = useRef();
    const usernameInpRef = useRef();
    const passwordInpRef = useRef();
    const [role, setRole] = useState('BUYER');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailInpRef.current.value;
        const username = usernameInpRef.current.value;
        const password = passwordInpRef.current.value;

        axios.post('http://localhost:1234/register', { email, username, password, role })
            .then((res) => {
                toast.success("Account created! Please login.");
                navigate('/login');
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Registration failed");
            });
      
    };


    const handleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AddCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        inputRef={usernameInpRef}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="password"
                        name="password"
                        type="password"
                        inputRef={passwordInpRef}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        inputRef={emailInpRef}
                    />
                    <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        name="role"
                        value={role} onChange={handleChange}                    >
                        <FormControlLabel value="SELLER" control={<Radio />} label="Seller" />
                        <FormControlLabel value="BUYER" control={<Radio />} label="Buyer" />
                    </RadioGroup>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <Typography component={Link} to="/login">Already have an account ? Login</Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;