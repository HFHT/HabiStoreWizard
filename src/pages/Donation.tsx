import { useState } from "react"
import { useShopify, useVision } from "../hooks"
import { DonationList, ResponseEdit } from "../components"
import { convertImageToBase64, uniqueBarCode } from "../helpers"
import { ImageCarousel } from "../components/ImageCarousel"
import { Box, Button, Divider, Flex, Grid, LoadingOverlay, rem, ScrollArea, ScrollAreaAutosize, Table, Text, useMantineTheme } from "@mantine/core"
import InputImages from "../components/InputImages"
import { useMediaQuery, useViewportSize } from "@mantine/hooks"

export function Donation({ collections }: any) {
    const theme = useMantineTheme()
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
    const { height, width } = useViewportSize();

    const [openForm, setOpenForm] = useState(false)
    const [addProduct, addTags, products, getProductList, isBusy] = useShopify(collections, false)
    const [_product, set_Product] = useState()
    const { analyzeGroup, AIresponseList, setAIresponseList, isAnalyzing } = useVision()
    const [images, setImages] = useState<Iimgs>([])

    const action = (theAction: any) => {
        switch (theAction.cmd) {
            case 'AI':
                convertImageToBase64(theAction.img.url, (ee: any) => analyzeGroup(ee))
                setOpenForm(true)
                break
            case 'X':
                const trimmedImages = images.filter((_: any, i: number) => i !== theAction.idx)
                setImages(trimmedImages)
                break
            case 'C':
                doClear()
                break
        }
    }
    const doClear = () => {
        setAIresponseList(null)
        setImages([])
        setOpenForm(false)
    }
    const doSave = () => {
        // addProduct(AIresponseList, images)
        doClear()
    }
    const saveProduct = (p: any) => {
        console.log(_product)
    }
    return (
        <>
            <Flex gap="xs" justify="center" direction="row" wrap="nowrap">
                <InputImages images={images} setImages={setImages} mode='donation'/>
                <Button size={mobile ? "xs" : "sm"} onClick={doClear} disabled={images.length > 0 && AIresponseList ? false : true}>Clear</Button>
                <Button size={mobile ? "xs" : "sm"} onClick={doSave} disabled={true}>Save</Button>
                {/* <Button size={mobile ? "xs" : "sm"} onClick={doSave} disabled={images.length > 0 && AIresponseList ? false : true}>Save</Button> */}
            </Flex>
            <Divider my={7} />
            <ImageCarousel images={images} open={images.length > 0} action={(e: any) => action(e)} />
            <Divider my={5} />
            <Box pos='relative'>
                <LoadingOverlay visible={isAnalyzing || isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <ScrollArea h={height-312} type='auto'>
                    <Grid justify="center" align="center" style={{ maxWidth: rem(300) }}>
                        {openForm && AIresponseList &&
                            AIresponseList.map((item: any, idx: number) => <DonationList key={idx} item={item} itemIdx={idx} />)

                        }
                    </Grid>
                </ScrollArea>
                {/* < ResponseEdit open={openForm} response={AIresponse} tweak={(e: any) => tweakResult(e)} setProduct={(e: any) => set_Product(e)} saveProduct={(e: any) => saveProduct(e)} /> */}
            </Box>
        </>
    )
}
