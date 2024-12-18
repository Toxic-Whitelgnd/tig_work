import axios, { AxiosResponse } from "axios";
import { ForgotPassOTP, User, userDetail, UserLogin, userRegisterDTO } from "../types/userTypes";
import { hashPassword } from "../utils/utils";
import { toast } from "react-toastify";
import { BACKENDURL } from "../utils/cosntants";
import { loginRegisterUser } from "../slice/userSlice";

export const AuthRegisterService = async (userData: User, dispatch : any) => {
    const userRegister : userRegisterDTO = {
        name: userData.name,
        email: userData.email,
        mobilenumber: userData.mobilenumber, 
        password: await hashPassword(userData.password || ''),
        roles: ["USER"]
    } 

    try {
        JSON.stringify(userRegister);

        const res : AxiosResponse<Object> = await axios.post(`${BACKENDURL}/api/users/register/`,
            userRegister
        );
        
        dispatch(loginRegisterUser(userRegister));

        toast.success("User Registered");
        window.location.href = '#/';
    } catch (error) {
        console.error(error);
        toast.error("Some Network Error");
    }
}

export const AuthLoginService = async (userData: UserLogin, dispatch : any) => {
     JSON.stringify(userData);
    try {
        const res : AxiosResponse<userDetail> = await axios.post(`${BACKENDURL}/api/users/login/`, userData);
        if(res.status == 401) {
            toast.error("Invalid Credentials");
        }
        const user : User = {
            name: res.data.user.name,
            email: res.data.user.email,
            password: res.data.user.password,
            mobilenumber: res.data.user.mobilenumber,
            roles: res.data.user.roles,
        }

        dispatch(loginRegisterUser(user));
        window.location.href = '#/';
    } catch (error: any) {
        if(error.status == 401){
            toast.error("Invalid Password");
        }
        if(error.status == 404){
            toast.error("Invalid Email and Password");
        }

    }
}

export const AuthVerifyEmail = async (email: string) => {
    try {
        const res = await axios.post(`${BACKENDURL}/api/users/verifyEmail`, {
            email: email
        });
        if(res.status == 200){
            console.log(res.data.otp);
            const forgotpass : ForgotPassOTP = {
                success: true,
                otp: res.data.otp
            }
            return forgotpass;
        }
       
    } catch (error) {
        console.log(error);
        const forgotpass : ForgotPassOTP = {
            success: false,
            otp: 0
        }
        return forgotpass;
    }
}

export const AuthChangePassword = async (loginData: UserLogin) =>{
    try {
        const res = await axios.post(`${BACKENDURL}/api/users/changepassword`, {
            email: loginData.email,
            password: loginData.password
        });
        if(res.status == 200){
            toast.success("Password changed Successfully");
            window.location.href = '#/login';
        }
    } catch (error) {
        console.log(error);
    }
}