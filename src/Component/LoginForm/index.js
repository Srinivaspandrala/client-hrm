import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPass, setShowPass] = useState('password');
    const [redirectTo, setRedirectTo] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                Cookies.set('token', data.user.token, { expires: 1 }); // Set token to expire in 5 minutes
                Cookies.set('fullname', data.user.fullname, { expires: 1 }); // Set fullname to expire in 5 minutes
                setMessage('Login successful!');
                setRedirectTo('/home');
            } else {
                setMessage(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setMessage('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onHandleSignup = () => {
        navigate('/register');
    };

    const onShowPass = () => {
        setShowPass((prev) => (prev === 'password' ? 'text' : 'password'));
    };

    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div className="login-form">
            <form className="login-form__container" onSubmit={handleLogin}>
                <div className="login-form__input-container">
                    <label className="login-form__label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="login-form__input"
                        required
                    />
                </div>
                <div className="login-form__input-container">
                    <label className="login-form__label">Password:</label>
                    <input
                        type={showPass}
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        className="login-form__input"
                        required
                    />
                </div>

                <div className="login-form__show-password">
                    <div className="login-form__toggle-password">
                        <input
                            type="checkbox"
                            id="show-password"
                            onChange={onShowPass}
                            aria-label="Toggle password visibility"
                            className="ck"
                        />
                        <label className="login-form__checkbox-label" htmlFor="show-password">
                            Show Password
                        </label>
                    </div>
                    <div className="login-form__forgot-password">
                        <Link className="login-form__link" to="/forgotpassword">
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                {message && <p className="login-form__error">{message}</p>}

                <button type="submit" className="btnlogin" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <button
                    type="button"
                    className="login-form__button"
                    onClick={onHandleSignup}
                    disabled={loading}
                >
                    Signup
                </button>
            </form>
            {loading && (
                <div className='overlay'>
                    <div class="loader">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                        <div class="bar4"></div>
                        <div class="bar5"></div>
                        <div class="bar6"></div>
                        </div>
                </div>
            )}
        </div>
    );
}

export default LoginForm;
