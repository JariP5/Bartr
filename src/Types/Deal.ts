export type DealDataType = {
    status: "accepted" | "requested" | "completed" | "declined"
    offerId: string
    businessId: string
    influencerId: string
}

export type DealType = {
    id: string
    data: DealDataType
}