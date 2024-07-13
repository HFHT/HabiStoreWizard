import { fetchJson } from "..";

export async function emptyQueue() {
    const url = `${import.meta.env.VITE_MONGO_URL}`;
    const headers = new Headers();
    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            method: 'deleteMany',
            db: 'Inventory',
            collection: 'PrintQueue',
            data: { keep: { $exists: false } }
        })
    }
    try {
        const response = await fetchJson(url, options)
        console.log('emptyQueue-fetchJson', response)
        return response
    }
    catch (error) { console.log(error); alert('Empty Barcode DB failed: ' + error); }
    return
}
