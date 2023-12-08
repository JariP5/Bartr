import { BusinessType } from "./Business"
import { InfluencerType } from "./Influencer"

export type UserDataType = {
    status: "accepted" | "waiting" | "declined"
    role: "Admin" | "Influencer" | "Business"
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