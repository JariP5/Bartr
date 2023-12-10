export type DealDataType = {
    status: DealStatusType
    offerId: string
    businessId: string
    influencerId: string
    title: string
}

export type DealType = {
    id: string
    data: DealDataType
}

export type DealStatusType = "live" | "requested" | "completed" | "declined";