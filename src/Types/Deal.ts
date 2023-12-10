export type DealDataType = {
    status: DealStatusType
    offerId: string
    businessId: string
    influencerId: string
}

export type DealType = {
    id: string
    data: DealDataType
}

export type DealStatusType = "accepted" | "requested" | "completed" | "declined";