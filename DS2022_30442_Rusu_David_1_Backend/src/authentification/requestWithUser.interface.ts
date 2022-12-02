import { Request } from 'express';
import User from "../db/entities/user.entity";
 
interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;