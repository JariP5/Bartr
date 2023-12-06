export type InfluencerDataType = {
    firstName: string;
    lastName: string;
    birthday: string;
    instagram: string;
    followers: number;
    verified: boolean;
    email: string;
};

export type InfluencerType = {
    id: string
    data: InfluencerDataType
}