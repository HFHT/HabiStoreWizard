import { useEffect, useState } from "react";
import { emptyQueue, headAlignment, printBarcode } from "../helpers/cloudPRNT";
const CONST_STARLABEL_ADJ = '[feed: length 1mm]'
const CONST_STAR_ALIGN = '[feed: length 24mm]'

export function useCloudPRNT(): any {
    const [queueSize, setQueueSize] = useState(0)
    const doEmpty = async () => {
        const response = await emptyQueue()
    }

    const alignment = async () => {
        // update webapi to return the count of total number of barcodes.
        const response = await headAlignment(CONST_STARLABEL_ADJ, 'feed1mm')

    }
    const calibrate = async () => {
        const response = await headAlignment(CONST_STAR_ALIGN, 'calibrate')

    }
    const doBarcodePrint = async (product: IShopifyProd, increment: number) => {
        // update webapi to return the count of total number of barcodes.
        const response = await printBarcode(product, increment)
    }
    useEffect(() => {
    }, [])

    return { queueSize, doBarcodePrint, doEmpty, calibrate, alignment } as const
}