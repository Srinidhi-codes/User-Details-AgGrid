import { comparePassword, hashingPassword } from "../helpers/userHelpers.js";
import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { firstName, lastName, gender, dob, country, state, city, zip, areaOfInterest, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) {
            res.send({
                message: 'Already registered please login or try with new email.'
            })
        }
        const hashedPassword = await hashingPassword(password);
        const newUser = await new User({ firstName, lastName, gender, dob, country, state, city, zip, areaOfInterest, email, password: hashedPassword }).save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true,
            message: 'Registered Successfully',
            user: newUser._doc,
            token
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.send({
                success: false,
                message: "Invalid credentials"
            });
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials.'
            })
        }
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.send({
            success: true,
            message: 'Login Success',
            user: user._doc,
            token
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, dob, newPassword, confirmPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'Email is required' })
        }
        if (!dob) {
            res.status(400).send({ message: 'Answer is required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'New Password is required' })
        }
        if (!confirmPassword) {
            res.status(400).send({ message: 'Confirm Password is required' })
        }
        const userData = await User.findOne({ email, dob })
        if (!userData) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Dob"
            })
        }
        if (newPassword === confirmPassword) {
            const hashedPassword = await hashingPassword(confirmPassword)
            await User.findByIdAndUpdate(userData._id, { password: hashedPassword })
            return res.status(200).send({
                success: true,
                message: 'Password Reset Successfully'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}