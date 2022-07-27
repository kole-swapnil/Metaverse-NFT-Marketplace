


export type NftAttributes = {
    trait_type: "attack" | "health" | "speed";
    value: string;
} 


export type NftMetaData = {
    name: string;
    description: string;
    image: string;
    id: number;
    attributes: NftAttributes[];
}