import { fetchJson } from ".."

export async function addProductTags(product: IShopifyProd, tags: string) {
    const url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;
    const headers = new Headers();
    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            method: 'updateProd',
            product: {
                handle: product.id,
                body: JSON.stringify({ product: { id: product.id, tags: `${product.tags}, ${tags}` } })
            }
        })
    }
    try {
        console.log('addProductTags-options', options)
        const response = await fetchJson(url, options)
        console.log('addProductTags-fetchJson', response)
        return response
    }
    catch (error) { console.log(error); alert('Shopify Add Product tags failed: ' + error); }

    return
}