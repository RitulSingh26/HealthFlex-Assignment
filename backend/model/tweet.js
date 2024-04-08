import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
       default: Date.now
    },
});

export default mongoose.model('Tweet',tweetSchema);

