import { fetchJson } from "../helpers"

export async function getExistingDonor(find: string) {
    const header: any = { method: "GET", headers: new Headers() }
    return await fetchJson(`${import.meta.env.VITE_AZURE_API}/api/getExistingDonor?find=${find}`, header)

}
