import { Schema, model } from "mongoose";
import { IAddress, IUser } from "./user.interface";

const addressSchema = new Schema<IAddress>({
  street: String,
  city: String,
});

const schema = new Schema<IUser>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  address: addressSchema,
});

export default model("users", schema);
