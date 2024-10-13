import { fetchJson } from "../helpers"

export async function saveDonation(find: string | number, data: any) {
    const header: any = { method: "POST", headers: new Headers() }
    header.body = JSON.stringify({ find: find, data: { ...data } })
    return await fetchJson(`${import.meta.env.VITE_AZURE_API}/api/saveDonation`, header)

}