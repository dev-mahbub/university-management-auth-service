import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedUserId } from './user.utils';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

const createUsers = async (user: IUser): Promise<IUser | null> => {
  //auto generated incereamental id
  const id = await generatedUserId();
  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUsers = await User.create(user);

  if (!createUsers) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUsers;
};

export const UserService = {
  createUsers,
};
