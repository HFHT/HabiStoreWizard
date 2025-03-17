import { adjustCategory, currentDiscount, prepareCollections } from "."
import { fetchJson, numberOrValue } from "..";
const GUARANTEE = '- 30 Day Guarantee !'
export async function addProduct(responseFromAI: responseFromAIType, title: string, thisHandle: string, collections: any, noSave: boolean) {
    const url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;
    const urlWizard = `${import.meta.env.VITE_AZURE_API}/api/saveLog`;
    const headers = new Headers();

    const adjustedCategory: { product_type: string, tags: string[] } = adjustCategory(responseFromAI)
    console.log('addProduct-adjustedCategory', adjustedCategory)
    var options = {
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
                    body_html: `${responseFromAI.description} ${responseFromAI.dimensions ? `Approximate Size: ${responseFromAI.size.height} x ${responseFromAI.size.width} x ${responseFromAI.size.depth}` : ''}`,
                    vendor: responseFromAI.product ? 'Purchased' : currentDiscount().col,
                    product_type: adjustedCategory.product_type,
                    status: 'active',
                    tags: adjustedCategory.tags,
                    variants: [{
                        barcode: thisHandle,
                        compare_at_price: responseFromAI.price.toFixed(2),
                        price: responseFromAI.price.toFixed(2),
                        requires_shipping: responseFromAI.deliver,
                        taxable: false,
                        inventory_management: 'shopify',
                        inventory_policy: 'deny',
                        inventory_quantity: numberOrValue(responseFromAI.qty, 1),
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

        options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                method: 'insertOne',
                db: 'Habitat', collection: 'ShopifyWizard',
                data: {
                    handle: thisHandle,
                    title: responseFromAI.guarantee ? `${title} ${GUARANTEE}` : title,
                    vendor: currentDiscount().col,
                    created_at: new Date(),
                    sold_at: null,
                    product_type: adjustedCategory.product_type,
                    status: 'active',
                    tags: adjustedCategory.tags,
                    barcode: thisHandle,
                    price: responseFromAI.price.toFixed(2),
                    compare_at_price: responseFromAI.price.toFixed(2),
                    inventory_quantity: numberOrValue(responseFromAI.qty, 1),
                }
            })
        }

        const wizardItems = await (fetchJson(urlWizard, options))
        console.log('wizardItems', wizardItems)
        return response
    }
    catch (error) { console.log(error); alert('Shopif Add Product failed: ' + error); }

    return
}