import { CONST_PRINT_MAC } from ".";
import { fetchJson } from "..";

export async function headAlignment(blob:string, job:string) {

    const url = `${import.meta.env.VITE_MONGO_URL}`;
    const headers = new Headers();
    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            method: 'updateOne',
            db: 'Inventory',
            collection: 'PrintQueue',
            data: {
                mac: CONST_PRINT_MAC,
                printed: false,
                job: job,
                blob: blob,
                code: '',
                fileX: ''
            },
            find: { job: job }
        })
    }
    try {
        const response = await fetchJson(url, options)
        console.log('headAlignment-fetchJson', response)
        return response
    }
    catch (error) { console.log(error); alert('Barcode head alignment failed: ' + error); }
    return
}