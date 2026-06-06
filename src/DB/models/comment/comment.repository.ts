import { injectable } from "tsyringe";
import { IComment } from "../../../common";
import { AbstractRepository } from "../../abstract.repository";
import { Comment } from "./comment.model";
@injectable()
export class CommentRepository extends AbstractRepository<IComment> {
constructor(){
    super(Comment)
}
}



