import { useState } from "react";
import { dateAdjust, dateFormat, hangtagDocument } from "../helpers";
import { useCloudPRNT, usePrinter, useShopify } from "../hooks";
import { TableSort } from "../components";
import { Box, Button, Flex, LoadingOverlay, Text, useMantineTheme } from "@mantine/core";
import { IconSquareRoundedMinusFilled, IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

interface PrintMenuInterface {
    collections: any
    doPrint: boolean
}

export function PrintMenu({ collections, doPrint = true }: PrintMenuInterface) {
    const theme = useMantineTheme()
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
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
                                item: shopifyProduct.handle.slice(-5),
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
            <Flex gap="xs" justify="center" align="center">
                <IconSquareRoundedMinusFilled size={38} onClick={() => setShowDate(dateAdjust({ date: showDate, adjust: -1, max: dateFormat(null) }))} />
                <Text size={'xl'}>{showDate}</Text>
                <IconSquareRoundedPlusFilled size={38} onClick={() => setShowDate(dateAdjust({ date: showDate, adjust: 1, max: dateFormat(null) }))} />
            </Flex>
            <Flex gap="xs" justify="center" direction="row" wrap="nowrap">
                <Button size={mobile ? "xs" : "sm"} onClick={() => printSelections('bc!')} disabled={false}>Barcode</Button>
                <Button size={mobile ? "xs" : "sm"} onClick={() => printSelections('ht!')} disabled={false}>Hangtag</Button>
                <Button size={mobile ? "xs" : "sm"} onClick={() => printSelections('bc! ht!')} disabled={false}>&nbsp;Both&nbsp;</Button>
                <Button size={mobile ? "xs" : "sm"} onClick={() => getProductList(showDate)} disabled={false}>Refresh</Button>
            </Flex>
            <Box pos='relative'>
                <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <TableSort data={products ? products : []} selections={selections} setSelections={(e: any) => setSelections(e)} />
            </Box>
        </>
    )
}
