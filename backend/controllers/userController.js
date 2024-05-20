import { comparePassword, hashingPassword } from "../helpers/userHelpers.js";
import User from "../models/user.js";

export const getAllUser = async (req, res) => {
    try {
        const userData = await User.find({});
        return res.status(200).send({
            success: true,
            message: "Successfully fetched all used details",
            userData
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Successfully fetched User",
            userData
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Check if there is a new password provided
        if (req.body.newPassword) {
            const { newPassword } = req.body;
            const hashedPassword = await hashingPassword(newPassword);
            req.body.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        return res.status(200).send({
            success: true,
            message: "Successfully Updated the User Details",
            user: updatedUser
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: 'Successfully Deleted User Details'
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}