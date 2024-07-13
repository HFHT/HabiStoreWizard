import { useState } from "react";
import { dateAdjust, dateFormat, hangtagDocument } from "../helpers";
import { useCloudPRNT, usePrinter, useShopify } from "../hooks";
import { TableSort } from "../components";
import { Box, Button, Flex, LoadingOverlay } from "@mantine/core";
import { IconSquareRoundedMinusFilled, IconSquareRoundedPlusFilled } from "@tabler/icons-react";

interface PrintMenuInterface {
    collections: any
    doPrint: boolean
}

export function PrintMenu({ collections, doPrint = true }: PrintMenuInterface) {
    const [showDate, setShowDate] = useState(dateFormat(null))
    const [selections, setSelections] = useState(['1'])
    const print = usePrinter({ pause: doPrint })
    const [addProduct, addTags, products, getProductList, isBusy] = useShopify(collections, doPrint)
    const [queueSize, doBarcodePrint, doEmpty, calibrate, alignment] = useCloudPRNT()
    const printSelections = (type: 'bc!' | 'ht!' | 'bc! ht!') => {
        selections.forEach((shopifyId: string, idx: number) => {
            if (shopifyId !== '1') {
                let shopifyProduct = products?.find((p: any) => p.id === shopifyId)
                if (shopifyProduct) {
                    if (type === 'ht!' || type === 'bc! ht!') {
                        print(hangtagDocument(
                            {
                                was: shopifyProduct.variants[0].compare_at_price,
                                now: shopifyProduct.variants[0].price,
                                item: shopifyProduct.title,
                                url: import.meta.env.VITE_STORAGEIMAGEURL,
                                img: shopifyProduct.image.src
                            })
                        )
                    }
                    if (type === 'bc!' || type === 'bc! ht!') {
                        doBarcodePrint(shopifyProduct, idx)
                    }
                    addTags(shopifyProduct, type)
                } else { alert('printmenu error') }
            }
        })
    }
    return (
        <>
            <Flex gap="xs" justify="center" >
                <IconSquareRoundedMinusFilled onClick={() => setShowDate(dateAdjust({ date: showDate, adjust: -1, max: dateFormat(null) }))} />
                <div>{showDate}</div>
                <IconSquareRoundedPlusFilled onClick={() => setShowDate(dateAdjust({ date: showDate, adjust: 1, max: dateFormat(null) }))} />
            </Flex>
            <Flex gap="xs" justify="center" direction="row" wrap="nowrap">
                <Button onClick={() => printSelections('bc!')} disabled={false}>Barcode</Button>
                <Button onClick={() => printSelections('ht!')} disabled={false}>Hangtag</Button>
                <Button onClick={() => printSelections('bc! ht!')} disabled={false}>&nbsp;Both&nbsp;</Button>
                <Button onClick={() => getProductList(showDate)} disabled={false}>Refresh</Button>
            </Flex>
            <Box pos='relative'>
                <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <TableSort data={products ? products : []} selections={selections} setSelections={(e: any) => setSelections(e)} />
            </Box>
        </>
    )
}
