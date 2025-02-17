

const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt');

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
console.log(req.body)
  try {
    // Get admin credentials from environment variables
    const storedEmail = process.env.ADMIN_EMAIL;
    const storedPassword = process.env.ADMIN_PASSWORD;

    // Check if the provided email and password match the stored values
    if (email !== storedEmail || password !== storedPassword) {
      return res.status(400).json({ login: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: 'admin' }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('adminToken', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'strict',
      secure: true,
      // httpOnly: true,
    });

    return res.status(200).json({ login: true, token });

  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({ error: 'Server error' });
  }

}
exports.adminLogout = (req, res) => {
  res.clearCookie('adminToken', {
    httpOnly: true,
  });
  return res.status(200).json({ message: 'User logged out successfully', success: true });
};

exports.dashboard = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}

exports.userEdit = async (req, res) => {
  try {
    console.log(req.params.userId, 'this is prams id')
    const user = await User.findById({ _id: req.params.userId })

    res.status(200).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
}

exports.userEditPost = async (req, res) => {
  try {
    const id = req.params.userId
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
    res.status(500).json({ message: 'Server error' });
  }
}

exports.userRemove = async (req, res) => {
  try {
    const id = req.params.userId
    const result = await User.deleteOne({ _id: id })
    res.status(200).json({ sucess: true })
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.userSearch = async (req, res) => {
  try {
    const result = await User.find({
      "$or": [{
        name: { $regex: req.params.key }
      }, {
        email: { $regex: req.params.key }
      }]

    })
    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}
exports.addUser = async (req, res) => {

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
    console.log(newUser)
    res.status(201).json({ message: 'User created successfully', success: true, newUser });

  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
    console.log('internal eroor')
    console.log(error.message)
  }

}

