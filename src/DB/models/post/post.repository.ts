import { injectable } from "tsyringe";
import { IPost } from "../../../common";
import { AbstractRepository } from "../../abstract.repository";
import { Post } from "./post.model";
@injectable()
export class PostRepository extends AbstractRepository<IPost> {
    constructor(){
        super(Post)
    }
}


