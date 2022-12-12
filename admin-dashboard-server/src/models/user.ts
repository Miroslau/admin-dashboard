import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  city?: string;
  state?: string;
  country?: string;
  occupation?: string;
  phoneNumber?: string;
  transactions?: [];
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", UserSchema);
export default User;
