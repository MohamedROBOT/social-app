import {commentGQLType} from "./comment.type.gql";
import commentService from "../comment.service";
import {Types} from "mongoose";

export const commentGQLQuery = {
    comment: {
        type: commentGQLType,
        resolve:async ()=>{
          return  await commentService.getOne(new Types.ObjectId("6a120223446fca182b49ab0b"))
        }
    }
}