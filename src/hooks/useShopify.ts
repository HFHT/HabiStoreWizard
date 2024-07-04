import { useState } from "react"
import { fetchJson, uniqueBarCode } from "../helpers"
import { currentDiscount } from "../helpers/shopify/currentDiscount";

export function useShopify(collections: any) {

    const headers = new Headers();
    var url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;

    const [_handle, set_Handle] = useState<string | null>(null)
    
    const addProduct = async () => {
        let thisHandle = uniqueBarCode()
        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                method: "add",
                product: JSON.stringify({
                    "product": {
                        handle: thisHandle,
                        title: `${thisHandle.slice(-5)} Wizard Draft`,
                        vendor: currentDiscount(),
                        status: "draft"
                    }
                })
            })
        }
        try {
            const response = await fetchJson(url, options)
            console.log('addProduct-fetchJson', response)
        }
        catch (error) { console.log(error); alert('Shopif Add Product failed: ' + error); }
    }



    const updateProduct = () => {

    }

    return [addProduct] as const

}
