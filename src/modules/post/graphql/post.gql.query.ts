import {postGQLType} from "./post.gql.type";
import postService from "../post.service";
import {Types} from "mongoose";

export const postGQLQuery = {
    post: {
        type:postGQLType,
        resolve:async ()=>{
         return  await postService.getPost(new Types.ObjectId("69e4abe10f47a1294fb86758"))
        }
    }
}