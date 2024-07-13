import { adjustCategory, currentDiscount, prepareCollections } from "."
import { fetchJson } from ".."
const GUARANTEE = '- 30 Day Guarantee !'
export async function addProduct(responseFromAI: responseFromAIType, title: string, thisHandle: string, collections: any, noSave: boolean) {
    const url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;
    const headers = new Headers();

    const adjustedCategory: { product_type: string, tags: string[] } = adjustCategory(responseFromAI)
    console.log('addProduct-adjustedCategory', adjustCategory)
    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            method: 'add',
            collections: prepareCollections(collections, responseFromAI),
            product: JSON.stringify({
                product: {
                    handle: thisHandle,
                    title: responseFromAI.guarantee ? `${title} ${GUARANTEE}` : title,
                    published_scope: 'global',
                    body_html: responseFromAI.description,
                    vendor: currentDiscount().col,
                    product_type: adjustedCategory.product_type,
                    status: 'active',
                    tags: adjustedCategory.tags,
                    variants: [{
                        barcode: thisHandle,
                        compare_at_price: responseFromAI.price.toFixed(2),
                        price: responseFromAI.price.toFixed(2),
                        requires_shipping: true,
                        taxable: false,
                        inventory_management: 'shopify',
                        inventory_policy: 'deny',
                        inventory_quantity: responseFromAI.qty,
                        weight_unit: 'lb',
                        weight: responseFromAI.weight
                    }]
                }
            })
        })
    }
    try {
        console.log('addProduct-options', options)
        if (noSave) return
        const response = await fetchJson(url, options)
        console.log('addProduct-fetchJson', response)
        return response
    }
    catch (error) { console.log(error); alert('Shopif Add Product failed: ' + error); }

    return
}