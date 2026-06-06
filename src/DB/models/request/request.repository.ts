import {AbstractRepository} from "../../abstract.repository";
import { IRequestModel} from "../../../common";
import {RequestModel} from "./request.model";
import { injectable } from "tsyringe";
@injectable()
export class RequestRepository extends AbstractRepository<IRequestModel> {
    constructor() {
        super(RequestModel);
    }
}


