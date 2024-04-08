import express from 'express';
import { addTweet, getByUserId } from '../controller/tweetController.js';
import { authenticate } from '../controller/userController.js';

const tweetRouter = express.Router();

tweetRouter.post("/tweet/addTweet",authenticate,addTweet);
tweetRouter.get("/users/:userId/timeline",authenticate,getByUserId);

export default tweetRouter;