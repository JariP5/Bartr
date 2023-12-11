export type OfferDataType = {
    status: OfferStatusType
    businessId: string
    title: string
    task: string
    reward: string
}

export type OfferType = {
    id: string
    data: OfferDataType
}

export type OfferStatusType = "live" | "paused";