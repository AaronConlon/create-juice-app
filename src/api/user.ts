import { BasePageModel, GlobalAPIConfig } from '@/constants'

import Request from './axios'

export interface User {
  id: number
  uuid: string
  username: string
  email: string | null
}

const USER_API_PREFIX = `${GlobalAPIConfig.API_PREFIX}/users`

export const UserApi = {
  getUsers: () => Request.get<User[]>(USER_API_PREFIX, new BasePageModel()),
  getUser: (id: number) => Request.get<User>(`${USER_API_PREFIX}/${id}`)
}
