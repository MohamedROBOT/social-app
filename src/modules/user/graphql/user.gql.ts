import {IUser, UserType} from "./user.type";
import {createUser, getUser} from "./user.service";
import {User} from "../../../DB/models/user/user.model";

export const userQuery = {
    user: {
        type: UserType, resolve: getUser
    }
}

export const userMutation = {
    createUser: {
        type: UserType,
        args: IUser,
        resolve: createUser
    }
}
// export const userSubscription = {}