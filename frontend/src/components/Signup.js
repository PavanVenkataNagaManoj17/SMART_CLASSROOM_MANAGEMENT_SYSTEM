import React, { useState } from 'react';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Container, TextField, Button, Typography, Box, IconButton, Paper, MenuItem, Alert } from '@mui/material';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [darkMode, setDarkMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password, role });
            if (response.status === 201) {
                setSuccessMessage('Signup successful! Redirecting to login...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000); // Redirect after 2 seconds
            } else {
                setErrorMessage('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error', error);
            setErrorMessage('Signup failed. Please try again.');
        }
    };

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(https://source.unsplash.com/random/1920x1080)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: darkMode ? 'white' : 'black',
            }}
        >
            <IconButton
                onClick={handleThemeToggle}
                sx={{ position: 'absolute', top: 16, right: 16 }}
            >
                {darkMode ? <FaSun /> : <FaMoon />}
            </IconButton>
            <Container
                component={Paper}
                className="signup-container"
                sx={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: 400,
                }}
            >
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Signup
                </Typography>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Role"
                        select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Signup
                    </Button>
                </form>
            </Container>
        </Box>
    );
};

export default Signup;