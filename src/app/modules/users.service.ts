import { Error } from 'mongoose'
import { IUser } from './users.interface'
import { User } from './users.model'
import config from '../../config/index'

const createUsers = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUsers = await User.create(user)

  if (!createUsers) {
    throw new Error('Failed to create user')
  }
  return createdUsers
}

export default {
  createUsers,
}
