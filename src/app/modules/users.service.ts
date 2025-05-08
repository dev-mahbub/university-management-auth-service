import { Error } from 'mongoose'
import { IUser } from './users.interface'
import { User } from './users.model'
import config from '../../config/index'
import { generatedUserId } from './user.utils'

const createUsers = async (user: IUser): Promise<IUser | null> => {
  //auto generated incereamental id
  const id = await generatedUserId()
  user.id = id
  //default password
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
