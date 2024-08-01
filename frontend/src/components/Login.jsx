import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        checked: false,
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email: formData.email,
                password: formData.password,
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div>
            <div className="container my-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            aria-describedby="emailHelp"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            name="checked"
                            checked={formData.checked}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;

