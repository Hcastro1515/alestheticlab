import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  hashedPin: {
    type: String,
    require: true
  }
},
  {
    timestamp: true
  }
)

const users = mongoose.model('user', userSchema);
export default users; 
