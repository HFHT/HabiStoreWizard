import { useState } from "react"
import { getExistingDonor } from "../services"

export function useDonor() {
    const [donor, setDonor] = useState<any>(undefined)
    const [isDonorBusy, setIsBusy] = useState(false)
    const findDonor = async (find: string) => {
        try {
            setIsBusy(true)
            const retVal = await getExistingDonor(find)
            console.log(retVal)
            if ('name' in retVal) {
                setDonor({ ...retVal })
            } else {
                setDonor(null)
            }
            setIsBusy(false)
        } catch (error) {
            setIsBusy(false)
            // showBoundary(error)
        }
    }
    return { donor, findDonor, isDonorBusy } as const
}
