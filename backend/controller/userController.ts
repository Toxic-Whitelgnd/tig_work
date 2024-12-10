import express from 'express';
import User from '../model/userModel';
import { comparePassword } from '../utils/utils';
import { console } from 'inspector';

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
        const isPasswordCorrect = await comparePassword(password, user!.password);
        
        if (isPasswordCorrect) {
             res.json({user});
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


export default router;