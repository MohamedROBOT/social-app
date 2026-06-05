
//re-open Request interface from express to add user property
//d for definitions

import { JwtPayload } from "jsonwebtoken";
import { SYS_ROLE } from "../enums";
import { IUser } from "../interfaces";
import "express-serve-static-core"


//this is one solution to re-open
// declare module "express" {
//   export interface Request {
//     user?: IUser;
//   }
// }

//this is second solution for re-open
declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload
  }
}


