import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
); 

const Users =
  mongoose.models.User || mongoose.model("User", userSchema);

export default Users;