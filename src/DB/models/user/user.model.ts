import { model, Schema } from "mongoose";
import { IUser, SYS_PROVIDER, SYS_ROLE, SYS_GENDER } from "../../../common";
//using generics to make sure that the schema is of type IUser

const schema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: function () {
        if (this.provider !== SYS_PROVIDER.system) return false;
        return true;
      },
    },
    role: {
      type: Number,
      enum: SYS_ROLE,
      default: SYS_ROLE.user,
    },
    provider: {
      type: Number,
      enum: SYS_PROVIDER,
      default: SYS_PROVIDER.system,
    },
    gender: {
      type: Number,
      enum: SYS_GENDER,
      default: SYS_GENDER.male
    },
  },
  { timestamps: true },

);


// schema.pre("save", function(){
//   //logic before hashing the password
//   //this refers to document
  
// })

// //target document methods
// schema.pre("updateOne", {document:true, query:false},function(){

// })

export const User = model("User", schema);

