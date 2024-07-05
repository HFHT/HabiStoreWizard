/// <reference types="vite/client" />
type responseFromAIType = {
    title: string
    category: string
    description: string
    category: string
    room: string
    weight: number
    size: {
        depth: number
        height: number
        width: number
    }
    manufacturer: string
    price: number
    qty: number
    feature: boolean
    guarantee: boolean
}

type Itype = {
    type: string
    idx: number
    imgs: string[]
    col: {c:string, i:number}
    barcode: string
    sku?: string
    vendor?: string
    invQty?: number
    desc?: string
    imgUrl?: string
    result: Iresult
}