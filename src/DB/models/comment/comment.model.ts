import { model, Schema } from "mongoose";
import { required } from "zod/mini";
import { IComment } from "../../../common";

const schema = new Schema<IComment>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post", //model name
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref:"Comment"
    },
    mentions: [{
        type: Schema.Types.ObjectId,
        ref:"User"
    }], //array of user ids
    content: String,
    attachment: String,
    reactionCount:{
        type: Number,
        default: 0
    }
},{timestamps: true})

schema.pre('deleteOne',async function(){
    let filter = this.getFilter();
 //find all replies

const replies = await this.model.find({parentId: filter._id}) //array or []

 //if replies >> loop over them and deleteOne
 if(replies.length > 0){
     for (const reply of replies) {
        await this.model.deleteOne({_id: reply._id})
     }
 } 
//return
})

export const Comment = model("Comment", schema)