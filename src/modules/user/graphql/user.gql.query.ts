import {userGQLType} from "./user.gql.type";
import userService from "../user.service";
import {Types} from "mongoose";

export const userGQLQuery = {
    user: {
        type:userGQLType,
        resolve: async ()=>{
           return await userService.profile(new Types.ObjectId("69dfad1d0be24b44e159fa94"))
        }
    }
}