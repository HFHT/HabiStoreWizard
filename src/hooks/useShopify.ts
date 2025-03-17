import { addImages, addProduct, addProductTags, getProductList, uniqueBarCode } from "../helpers"
import { useState } from "react";
export function useShopify(collections: any, noSave = false) {
    const [products, setProducts] = useState<IShopifyProd[]>()
    const [isBusy, setIsBusy] = useState(false)

    const addThisProduct = async (responseFromAI: responseFromAIType | null, images: Iimgs) => {
        if (responseFromAI === null) return
        console.log('addThisProduct', responseFromAI)
        const thisHandle = uniqueBarCode()
        const title = `${thisHandle.slice(-5)}${responseFromAI.deliver ? '' : '-ND'} ${responseFromAI.title}`
        setIsBusy(true)
        const addResponse = await addProduct(responseFromAI, title, thisHandle, collections, noSave)
        if (addResponse && addResponse.hasOwnProperty('prodId') || noSave) {
            const imageResponse = await addImages(images, title, addResponse ? addResponse.prodId : '', noSave)
            console.log(imageResponse)
        }
        setIsBusy(false)
    }

    const addTags = async (product: IShopifyProd, tags: string) => {
        setIsBusy(true)
        const response = await addProductTags(product, tags)
        console.log(response)
        setIsBusy(false)
    }

    const getTheProductList = async (theDate: string) => {
        setIsBusy(true)
        const theProductList = await getProductList(theDate)
        setProducts(theProductList.theList.data.sort((a: IShopifyProd, b: IShopifyProd) => (a.created_at > b.created_at ? -1 : 1)))
        setIsBusy(false)
    }

    const sortTheProductList = (orderBy: 'title' | 'created') => {
        if (!products) return
        products.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    }

    return [addThisProduct, addTags, products, getTheProductList, isBusy] as const
}
