import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Email, Password } from '../../../utils/svgIcons'
import { AuthChangePassword, AuthVerifyEmail } from '../../../service/authService';
import { toast } from 'react-toastify';
import { ForgotPassOTP, UserLogin } from '../../../types/userTypes';
import { encryptPassword, hashPassword } from '../../../utils/utils';
import img1 from "../../../assets/images/forgotpass.png";

export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    const [isEmailvalid, setEmailvalid] = useState(false);
    const [isOTPvalid, setOTPvalid] = useState(false);
    const [otpverify, setVerifyOtp] = useState(0);

    const handleSubmit = async () => {
   
        const res = await AuthVerifyEmail(email);
        if (res) {
            setEmailvalid(true);
            setVerifyOtp(res.otp);
            toast.success("Enter the OTP send to email");
        } else {
            toast.error("Invalid Email");
        }
    };

    function handleOTP() {
        if (otp === otpverify.toString()) {
            toast.success("OTP Verified");
            setOTPvalid(true);
            setEmailvalid(false);
        }
        else {
            toast.error("Invalid OTP");
        }
    }

    const handleChangepAssword = async () => {
        const loginDetails: UserLogin = {
            email: email,
            password: encryptPassword(password),
        }
        await AuthChangePassword(loginDetails);
    }

    return (
        <div>
            <div className='loginform'>
                <div className='login-back-img'>
                    <img src={img1} height={500}/>
                </div>

                <div className="formPass m-4" style={isOTPvalid || isEmailvalid ? {height: 300} : {height:200}}>
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
                    {
                        isEmailvalid ? <> <div className="flex-column">
                            <label htmlFor="password">OTP</label>
                        </div>
                            <div className="inputForm">
                                <Password />
                                <input
                                    type="number"
                                    className="input"
                                    id="otp"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>   </> : <></>
                    }

                    {
                        isOTPvalid ? <>
                            <div className="flex-column">
                                <label htmlFor="password">New Password</label>
                            </div>
                            <div className="inputForm">
                                <Password />
                                <input
                                    type="password"
                                    className="input"
                                    id="password"
                                    placeholder="Enter your New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </> : <></>
                    }

                    {
                        isEmailvalid ? <button className="button-submit" onClick={handleOTP}>Verifiy OTP</button> :
                            isOTPvalid !== true ? <button className="button-submit" onClick={handleSubmit}>Verifiy Email</button> : <></>
                    }
                    {
                        isOTPvalid ? <button className="button-submit" onClick={handleChangepAssword}>Change Password</button>
                            : <></>
                    }


                    <p className="p">
                        Don't have an account?{' '}
                        <Link to='/register'><span className="span">Sign Up</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
