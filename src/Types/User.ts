import { BusinessType } from "./Business"
import { InfluencerType } from "./Influencer"

export type UserDataType = {
    status: UserStatusType
    role: UserRoleType
    email: string
    displayName: string
    instagram: string
    influencer?: InfluencerType
    business?: BusinessType
}

export type UserType = {
    id: string
    data: UserDataType
}

export type UserStatusType = "accepted" | "waiting" | "declined";
export type UserRoleType = "Admin" | "Influencer" | "Business";