import {AbstractRepository} from "../../abstract.repository";
import { IRequestModel} from "../../../common";
import {RequestModel} from "./request.model";

export class RequestRepository extends AbstractRepository<IRequestModel> {
    constructor() {
        super(RequestModel);
    }
}


export const requestRepository = new RequestRepository();