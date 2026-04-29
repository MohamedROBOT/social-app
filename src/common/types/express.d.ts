
//re-open Request interface from express to add user property
//d for definitions

import { IUser } from "../interfaces";



//this is one solution to re-open
// declare module "express" {
//   export interface Request {
//     user?: IUser;
//   }
// }

//this is second solution for re-open
declare module "express-serve-static-core" {
  interface Request {
    user: IUser;
  }
}


