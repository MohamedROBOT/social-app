import 'jsonwebtoken'
import { SYS_ROLE } from '../enums';
declare module "jsonwebtoken" {
    interface JwtPayload {
        email: string,
        role: SYS_ROLE,
        
    }
}