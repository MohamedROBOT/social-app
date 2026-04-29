import { Types } from "mongoose";


//request collection not express request!!#!@#!@#!@
export interface IRequestModel {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  
}
