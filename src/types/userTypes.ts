export interface UserLogin {
    email: string;
    password: string;
}

export interface User {
    name: string;
    password?: string;
    mobilenumber?: string;
    email: string;
    isloggedin?: boolean;
    roles?: string[];
}

export const initialState: User = {
    name: '',
    password: '',
    mobilenumber: '',
    email: '',
    isloggedin: false,
    roles: ["USER"],
}

export interface userRegisterDTO {
    name: string;
    password?: string;
    mobilenumber?: string;
    email: string;
    roles?: string[];
} 

export interface userDetail {
    user:{
        _id: string;
        name: string;
        password?: string;
        mobilenumber?: string;
        email: string;
        roles?: string[];
    }
 
}