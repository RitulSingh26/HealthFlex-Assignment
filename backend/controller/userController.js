import express from 'express';
import user from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async(req,res,next)=>{
    const {name,password}=req.body;
    let existingUser;
    try {
        existingUser = await user.findOne({name});
    } catch (error) {
        return error;
    }
    if(existingUser){
        return res.send(400).json({message:"user already exist! Try Login in"})
    }
    const hashedPassword =bcrypt.hashSync(password);
    const newuser = new user({
        name,
        password:hashedPassword,
        tweets:[],
    });
    try {
        await newuser.save();
    } catch (error) {
        return error;
    }
    return res.status(201).json({newuser});
    next();
}

export const loginUser = async(req,res,next)=>{
    const {name,password}=req.body;
    let existingUser;
    try {
        existingUser = await user.findOne({name});
    } catch (error) {
        return error;
    }
    if(!existingUser){
        res.status(404).json({message:"user not registered. Register first."})
    }
    const checkPassword =bcrypt.compareSync(password,existingUser.password);
    if(!checkPassword){
        return res.status(400).json({message:"incorrect password"})
    }
    try{
    const secret_key="123"
    const token = jwt.sign({ userId: user._id }, secret_key);
    res.status(200).json({ message: "login successfull", token });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to login' });
    }  

    return res.status(200).json({message:"login successfull"})
}

export const authenticate = (req, res, next) => {

    if (!req.headers.authorization) {
        throw new Error('Authorization header is missing');
    }
    try {
       
        const secret_key = "123";
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secret_key);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

