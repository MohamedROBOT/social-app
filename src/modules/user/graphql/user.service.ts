import {User} from "../../../DB/models/user/user.model";

export const getUser = async ()=>{
    return {
        id: "1",
        name: "User",
        email: "user.email",
        password: "user.password",
        phone: "user.phone"
    }
}

export const createUser = async (parent:any, args  :any) => {

    return await User.create(args)

}