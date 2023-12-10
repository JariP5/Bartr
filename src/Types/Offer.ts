export type OfferDataType = {
    status: OfferStatusType
    businessId: string
    taken: number
    title: string
    task: string
    reward: string
    modified: string
}

export type OfferType = {
    id: string
    data: OfferDataType
}

export type OfferStatusType = "live" | "paused";