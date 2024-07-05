import { addImages, addProduct, uniqueBarCode } from "../helpers"
import { Iimgs } from "../components";
export function useShopify(collections: any, noSave = false) {

    const addThisProduct = async (responseFromAI: responseFromAIType | null, images: Iimgs) => {
        if (responseFromAI === null) return
        const thisHandle = uniqueBarCode()
        const title = `${thisHandle.slice(-5)} ${responseFromAI.title}`

        const addResponse = await addProduct(responseFromAI, title, thisHandle, collections, noSave)
        if (addResponse && addResponse.hasOwnProperty('prodId') || noSave) {
            const imageResponse = await addImages(images, title, addResponse ? addResponse.prodId : '', noSave)
            console.log(imageResponse)
        }
    }

    return [addThisProduct] as const
}
