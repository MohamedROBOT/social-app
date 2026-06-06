import { userGQLType } from "./user.gql.type";
import { Types } from "mongoose";
import { userService } from "../../../common/DI/services";

export const userGQLQuery = {
  getUser: {
    type: userGQLType,
    resolve: async () => {
      return await userService.profile(
        new Types.ObjectId("6a1c7b9ad357f3b024064473"),
      );
    },
  },
};
