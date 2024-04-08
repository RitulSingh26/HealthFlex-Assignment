import Tweet from "../model/tweet.js";
import mongoose from "mongoose";
import users from "../model/user.js";


export const addTweet = async(req,res,next)=>{
        const{userId,text,createdAt}=req.body;
        let existingUser;
        try{
          existingUser = await users.findById(userId);
        }catch(err){
            return console.log(err);
        }
        if(!existingUser){
            return res.status(400).json({message:"unable to find user by this id"});
        }
        const tweet = new Tweet({
            text,
            userId,
            createdAt
        });
        try{
           await tweet.save();
           existingUser.tweets.push(tweet);
           await existingUser.save()
        }catch(err){
             console.log(err);
            return res.status(500).json({message:err})
        }
        return res.status(200).json({tweet});
      
    }; 
 
    export const getByUserId = async(req,res,next)=>{
        const userId= req.params.userId;
        let userTweets;
        try{
            userTweets= await users.findById(userId).populate("tweets");
        }
        catch(err){
            return console.log(err);
        }
        if(!userTweets){
           return res.status(404).json({message:"no tweet found"})
        }
        return res.status(200).json({tweets:userTweets})
    };



