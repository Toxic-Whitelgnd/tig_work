import React, { useEffect, useState } from 'react'
import { Email, Password } from '../../../utils/svgIcons'
import { UserLogin } from '../../../types/userTypes';
import { Link } from 'react-router-dom';
import "../auth.css";
import img1 from "../../../assets/images/login1.png";
import img2 from "../../../assets/images/login2.png";
import { AuthLoginService } from '../../../service/authService';
import { useDispatch } from 'react-redux';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [errorTimeout, setErrorTimeout] = useState<number | null>(null);

    const dispatch = useDispatch();

    const validateLogin = (email: string, password: string) => {
        const errors: { email?: string; password?: string } = {};

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email format is invalid';
        }

        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }

        // Validate the inputs
        const validationErrors = validateLogin(email, password);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            const timeout = setTimeout(() => {
                setErrors({});
            }, 10000); // 10 seconds

            setErrorTimeout(timeout);
        }

        if (Object.keys(validationErrors).length === 0) {
            const userDetails: UserLogin = {
                email: email,
                password: password,
            };
            await AuthLoginService(userDetails, dispatch);
        }
    };

    useEffect(() => {
        return () => {
            if (errorTimeout) {
                clearTimeout(errorTimeout);
            }
        };
    }, [errorTimeout]);

    function handleForgotPassword(): void {
        console.log("implement");
    }

    return (
        <div>
            <div className='loginform'>
                <div className='login-back-img'>
                    <img src={img1} height={400}/>
                </div>

                <form className="form m-4" onSubmit={handleSubmit}>
                    <div className="flex-column">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="inputForm">
                        <Email />
                        <input
                            type="email"
                            className="input"
                            id="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {errors.email && <p className="error">{errors.email}</p>}

                    <div className="flex-column">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="inputForm">
                        <Password />
                        <input
                            type="password"
                            className="input"
                            id="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}

                    <div className="flex-row">
                        <div>
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe" className='ms-2'>Remember me</label>
                        </div>
                        <span onClick={handleForgotPassword} className="span">Forgot password?</span>
                    </div>

                    <button className="button-submit" type="submit">Sign In</button>

                    <p className="p">
                        Don't have an account?{' '}
                        <Link to='/register'><span className="span">Sign Up</span></Link>
                    </p>
                </form>
                <div className='login-back-img'>
                    <img src={img2} height={500}/>
                </div>
            </div>
        </div>
    )
}
