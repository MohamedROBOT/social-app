import { Document, HydratedDocument } from "mongoose";
import { IUser } from "../interfaces";

// export type UserDocument = IUser & Document;
//or
export type UserDocument = HydratedDocument<IUser>;

