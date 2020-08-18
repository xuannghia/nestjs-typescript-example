import { User } from '../../users/user.entity'

export type AuthenticatedResponseType = {
  user: Partial<User>
  accessToken: string
}
