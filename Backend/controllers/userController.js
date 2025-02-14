
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or phone number already exists', success: false });
        }
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();
        console.log('newuser', newUser)
        res.status(201).json({ message: 'User created successfully', success: true, newUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
        console.log('internal eroor')
        console.log(error.message)
    }
}
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect password or email', user: false })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password or email', user: false })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie('accessToken', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            // httpOnly: true,
            secure: true
        });
        res.status(200).json({ message: "User logged in successfully", success: true, token, user });

    } catch (error) {

        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

const homePage = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const logout = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
    });
    return res.status(200).json({ message: 'User logged out successfully', success: true });
};


const imageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        console.log(req.file)
        const user = await User.findById(req.userId);
        console.log('this is the user', user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.image = req.file.filename;
        await user.save();

        res.status(200).json({ message: 'Image uploaded and saved successfully.' });
    } catch (error) {
        console.error('Error saving image URL:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const profileEdit = async (req, res) => {
    try {
        console.log(req.userId, 'from profile get fuvntion')

        const user = await User.findById({ _id: req.userId })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user })
        console.log(user, 'user form th edit')
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error while fetching user profile' });
    }
}

const profileEditPost = async (req, res) => {
    try {
        const id = req.userId
        const { email, phone } = req.body
        const existingUser = await User.findOne({ email: email });

        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).json({ error: 'Email or phone number already exists.' });
        }
        const existingPhone = await User.findOne({ phone: phone })
        if (existingPhone && existingPhone._id.toString() !== id) {
            return res.status(400).json({ error: 'Email or phone number already exists.' });
        }
        const updateUser = await User.updateOne({ _id: id }, { $set: req.body })
        res.status(200).json(updateUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Server error while updating profile.' });
    }

}

module.exports = { registerUser, userLogin, homePage, imageUpload, profileEdit, profileEditPost, logout }