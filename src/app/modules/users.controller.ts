import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersService.createUsers(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (_error: unknown) {
    res.status(400).json({
      success: false,
      message: `Failed to create user: ${(_error as Error).message}`,
    })
  }
}

export default {
  createUser,
}
