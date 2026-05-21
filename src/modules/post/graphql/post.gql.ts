import {PostType} from "./post.type";
import {getPost} from "./post.service";

export const postQuery = {
    post: {
        type: PostType,resolve: getPost
    }
}
export const postMutation = {
}
// export const postSubscription = {}

