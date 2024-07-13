import { fetchJson } from "..";
export const CONST_PRINT_MAC = '00:11:62:0e:2f:bc'
const CONST_LOGO_IMAGE = 'HabiStorelogo_stacked_black.png'
const CONST_STARLABEL = '[align: center][mag: w 2; h 2]{price}[mag] {description}\[barcode: type code128; data {barcode}; height 10mm; hri][feed: length 6mm]'

export async function printBarcode(product: IShopifyProd, increment: number) {
    const url = `${import.meta.env.VITE_MONGO_URL}`;
    const headers = new Headers();
    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            method: 'insertOne',
            db: 'Inventory',
            collection: 'PrintQueue',
            data: {
                mac: CONST_PRINT_MAC,
                printed: false,
                // job: userData.barcode,
                job: Date.now()+increment,
                date: Date.now(),
                bc: product.handle,
                desc: product.title.slice(0, 35),
                blob: CONST_STARLABEL.replace(/{price}/g, product.variants[0].price).replace(/{description}/g, product.title.slice(0, 26)).replace(/{barcode}/g, product.handle),
                fileX: ''
            }
        })
    }
    try {
        const response = await fetchJson(url, options)
        console.log('printBarcode-fetchJson', response)
        return response
    }
    catch (error) { console.log(error); alert('Print Barcode failed: ' + error); }
    return
}
