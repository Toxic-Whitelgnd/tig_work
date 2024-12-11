import express from 'express';
import User from '../model/userModel';
import { comparePassword, decryptPassword, OTP } from '../utils/utils';
import { console } from 'inspector';
import { set } from 'mongoose';
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const newUser = req.body;
        var re = await User.create(newUser);
        res.json({ message: "User registerd successfully", user: newUser });
    } catch (error: any) {
        console.log(error);
        res.json({ message: "Failed to register user", error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ 'email': email });

        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const isPasswordCorrect = decryptPassword(user!.password);
        console.log(isPasswordCorrect);
        if (isPasswordCorrect == password) {
            res.json({ user });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }

    } catch (error: any) {
        console.log(error);
        if (!res.headersSent) { // Check if response has already been sent
            res.status(500).json({ message: "Failed to log in user", error: error.message });
        }
    }
});

router.post('/verifyEmail', async (req, res) => {
    try {
        console.log(req.body);
        const { email } = req.body;
        const result = await User.findOne({ email: email });
        if (result != null) {
            const { success, otp } = await SendEmail(email,result.name);
            if (success) {
                res.status(200).json({ otp: otp });
            }
        }

        res.status(404).json(false);
    } catch (error) {
        console.log(error);
    }
});

router.post('/changepassword', async (req,res) =>{
    try {
        const { email, password } = req.body;
    
        // Check if email and password are provided
        if (!email || !password) {
           res.status(400).json({ message: 'Email and password are required' });
        }
    
        // Find the user
        const result = await User.findOne({ email: email });
        if (!result) {
          // If user is not found, return a 404 error
           res.status(404).json({ message: 'User not found' });
        }
    
        // Update the password
        const update = await User.updateOne({ email: email }, {
          $set: {
            password: password
          }
        });
    
        // If update is successful, return a success response
        if (update.acknowledged) {
           res.status(200).json({ message: 'Password updated successfully' });
        } else {
           res.status(500).json({ message: 'Failed to update password' });
        }
      } catch (error) {
        console.log(error);
    }
})

const SendEmail = async (email: string,name: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        var otp = OTP();
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Request For Password Change',
            text: `Dear ${name},

            Your One-Time Password (OTP) is: **${otp}**.

            Please use this code to complete your authentication. The OTP is valid for the next 10 minutes. Do not share this code with anyone for your account's security.

            If you did not request this code, please contact our support team immediately.

            Thank you,  
            Akatsuki`,
            //   html: '<h1>test</h1>'
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, otp: otp };
    } catch (error) {
        return { success: false, otp: null }
    }
}


export default router;