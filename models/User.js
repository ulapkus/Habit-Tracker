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
    }, 
    habits: {
      type: Array,
      required: false,
      // sparse:true,
    },
    days: {
      type: Object,
      // unique: false,
      required: false,
    },
    // days: {
    //   type: Array,
    //   unique: true,
    //   required: false,
    // },
    colors: {
      type: Object,
      // unique: false,
      required: false,
    },
    displayModal: {
      type: Boolean,
      default: true,
    },
    // colors: {
    //   type: Array,
    //   // unique: false,
    //   required: false,
    // }
  },
  { timestamps: true }
); 

const Users =
  mongoose.models.User || mongoose.model("User", userSchema);

export default Users;