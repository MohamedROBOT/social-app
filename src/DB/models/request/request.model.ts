import {model, Schema} from "mongoose";
import {IRequestModel} from "../../../common";

const schema = new Schema<IRequestModel>({
    sender: {type: Schema.Types.ObjectId, ref: "User", required: true},
    receiver: {type: Schema.Types.ObjectId, ref: "User", required: true},
    
}, {
    timestamps: true
})
export const RequestModel = model("Request", schema)