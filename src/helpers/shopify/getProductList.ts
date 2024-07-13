import { fetchJson } from ".."

export async function getProductList(theDate: string, noSave = false) {
    const url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;
    const headers = new Headers();
    console.log(theDate)
    if (theDate.length !== 10) return
    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            method: 'getProds',
            created: `${theDate}T00:00:00-00:00`
        })
    }
    try {
        console.log('getProductList-options', options)
        if (noSave) return
        const response = await fetchJson(url, options)
        console.log('getProductList-fetchJson', response)
        return response
    }
    catch (error) { console.log(error); alert('Shopify Get Products failed: ' + error); }

    return
}