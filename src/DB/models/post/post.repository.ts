import { IPost } from "../../../common";
import { AbstractRepository } from "../../abstract.repository";
import { Post } from "./post.model";

export class PostRepository extends AbstractRepository<IPost> {
    constructor(){
        super(Post)
    }
}


export default new PostRepository();