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
    product: boolean
    deliver: boolean
    dimensions: boolean
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

interface Iimg {
    name: string;
    url: string;
    blob: any;
}
interface Iimgs extends Array<Iimg> { }

interface IShopifyReturn {
    theList: {
        data: IShopifyProd[]
    }
    theProduct: {
        data: any
    }
    theCollections: {
        data: IShopifyCollect[]
    }
}
interface IShopifyProd {
    id: string                              // Common properties of products and collections
    title: string
    created_at: string
    updated_at: string
    image: {
        src: string
    }
    handle: string                          // Unique to products
    product_type: string
    status: 'active' | 'archived' | 'draft'
    vendor: string
    variants: IShopifyVariant[]
    tags: string[]
    product_id: string                      // Unique to list of products in a collection
    colleciton_id: string
}

interface IShopifyVariant {
    id: string
    barcode: string
    created_at: string
    updated_at: string
    compare_at_price: string
    inventory_item_id: string
    inventory_quantity: number
    old_inventory_quantity: number
    price: string
}
interface IShopifyCollect {
    id: string
    product_id: string
    created_at: string
    updated_at: string
}