import mongoose from 'mongoose';

const Schema =mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tweets:[{type:mongoose.Types.ObjectId,ref:"Tweet",required:true}],
});
export default mongoose.model("User",userSchema);
