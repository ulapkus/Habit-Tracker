import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      // unique: true,
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
    },
    days: {
      type: Object,
      required: false,
      default: {},
    },
    colors: {
      type: Object,
      required: false,
      default: {},
    },
    displayModal: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, minimize: false }
);

const Users = mongoose.models.User || mongoose.model("User", userSchema);

export default Users;
