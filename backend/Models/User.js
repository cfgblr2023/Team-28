const mongoose=require('mongoose');
//we need to make a schema
const Schema=mongoose.Schema;
const UserSchema =new Schema({
   name:{
     type: String,
     required:true
   },
   email:{
     type:String,
     required:true,
     unique:true
   },
   password:{
     type:String,
     required:true
   },
   date :{
     type:Date,
     default:Date.now
   }
});
const User=mongoose.model('user',UserSchema);
// User.createIndexes();
module.exports =User;