// controllers/announcementController.js
import User from '../model/User.js';
import Announcement from '../model/Announcement.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";



export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    //check user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        // throw error
        throw new Error("User already exists");
    }


    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // if new user , create new user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,

    });
    res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: user,
    })
});


// @desc Logic user
// @route POST /api/v1/users/login
// @access Public

export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({
        email
    });
    if (userFound && await bcrypt.compare(password, userFound?.password)) {
        res.json({
            status: "success",
            message: "User logged in successfully",
            userFound,
            token: generateToken(userFound?._id)
        })
    } else {
        throw new Error("Invalid login credentials")
    }

});



// @desc    Get all announcements
// @route   GET /api/v1/announcements
// @access  Public
export const getAllAnnouncements = asyncHandler(async (req, res) => {
    const announcements = await Announcement.find();
    res.json({
        status:"success",
        message:"Succesfully got all announcements",announcements,
    });
  });
  
  // @desc    Create a new announcement
  // @route   POST /api/v1/announcements
  // @access  Public
  export const createAnnouncement = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const newAnnouncement = new Announcement({ title, content });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  });
  
  // @desc    Update an announcement
  // @route   PUT /api/v1/announcements/:id
  // @access  Public
  export const updateAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedAnnouncement) {
      res.status(404);
      throw new Error('Announcement not found');
    }
    res.json({
        status: "success",
        message: "Announcement updated successfully",
        updateAnnouncement,
    });
  });
  
  // @desc    Delete an announcement
  // @route   DELETE /api/v1/announcements/:id
  // @access  Public
  export const deleteAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      res.status(404);
      throw new Error('Announcement not found');
    }
    res.status(201).json({
        status:"success",
        message:"Announcement deleted Successfully",
    });
  });