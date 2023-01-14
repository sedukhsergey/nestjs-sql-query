import { Request } from 'express';
import UserModel from '../users/users.model';

interface RequestWithUser extends Request {
  user: UserModel;
}

export default RequestWithUser;
