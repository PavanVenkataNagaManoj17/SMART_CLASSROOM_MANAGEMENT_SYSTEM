import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            if (response.data.role === 'teacher') {
                window.location.href = '/teacher-dashboard';
            } else if (response.data.role === 'student') {
                window.location.href = '/student-dashboard';
            }
        } catch (error) {
            console.error('Login error', error);
        }
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
                color: 'black',
            }}
        >
            <Container
                component={Paper}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: 400,
                }}
            >
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Smart Classroom Management System
                </Typography>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2 }}
                        onClick={() => window.location.href = '/signup'}
                    >
                        Signup
                    </Button>
                </form>
            </Container>
        </Box>
    );
};

export default Login;