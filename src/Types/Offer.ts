export type OfferDataType = {
    status: "live" | "paused"
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