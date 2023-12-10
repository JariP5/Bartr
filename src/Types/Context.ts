import { UserStatusType, UserType } from "./User"

export type AdminContextType = {
    users: UserType[]
    fetchUsers: () => void
    updateUserStatus: (userId: string, status: UserStatusType) => void
  }