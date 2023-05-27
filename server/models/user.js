import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  pin: {
    type: String,
    require: true
  }
},
  {
    timestamp: true
  }
)

const user = mongoose.model('user', userSchema);
export default user; 
