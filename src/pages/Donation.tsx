import { useState } from "react"
import { useDonor, useShopify, useTemplate, useVision } from "../hooks"
import { DonationList, ResponseEdit, ShopifyCustomer, ShopifyPhone } from "../components"
import { convertImageToBase64, uniqueBarCode } from "../helpers"
import { ImageCarousel } from "../components/ImageCarousel"
import { Box, Button, Divider, Flex, Grid, LoadingOverlay, rem, ScrollArea, ScrollAreaAutosize, Table, Text, useMantineTheme } from "@mantine/core"
import InputImages from "../components/InputImages"
import { useMediaQuery, useViewportSize } from "@mantine/hooks"

export function Donation({ collections }: any) {
    const theme = useMantineTheme()
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
    const { height, width } = useViewportSize();

    const [customer, setCustomer] = useState()

    const [phone, setPhone] = useState<string>('')
    const [anonymous, setAnonymous] = useState<boolean>(false)
    const [openForm, setOpenForm] = useState(false)
    const [addProduct, addTags, products, getProductList, isBusy] = useShopify(collections, false)
    const { printTemplate, isTemplateBusy } = useTemplate()

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
    const reset = () => {
        doClear()
        console.log('reset')
        setPhone('+1')
        setCustomer(undefined)
        setAnonymous(false)
    }
    const saveProduct = (p: any) => {
        console.log(_product)
    }
    return (
        <>
            <ScrollArea h={height - 100} type='hover'>
                {(customer === undefined) && !AIresponseList &&
                    <>
                        <Flex gap="xs" justify="center" direction="row" wrap="nowrap">
                            <InputImages images={images} setImages={setImages} mode='donation' />
                            <Button size={mobile ? "xs" : "sm"} onClick={doClear} disabled={images.length > 0 && AIresponseList ? false : true}>Clear</Button>
                            <Button size={mobile ? "xs" : "sm"} onClick={doSave} disabled={true}>Save</Button>
                        </Flex>
                        <Divider my={7} />
                    </>
                }
                <LoadingOverlay visible={isBusy || isAnalyzing} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Box pos='relative'>
                    <ImageCarousel images={images} open={images.length > 0} action={(e: any) => action(e)} />
                </Box>
                {(customer === undefined) && AIresponseList &&
                    <>
                        <Divider my={5} />
                        <Grid grow justify="space-around" align="center">
                            <ShopifyPhone phone={phone} setPhone={(e: any) => setPhone(e)} anonymous={anonymous} setAnonymous={setAnonymous} onChange={(e: any) => setCustomer(e)} />
                        </Grid>
                    </>
                }
                {(customer !== undefined || anonymous) && AIresponseList && <>
                    <ShopifyCustomer donations={AIresponseList} phone={phone} customer={customer} anonymous={anonymous} reset={reset} template={printTemplate} />
                </>}
                {/* <Box pos='relative'>
                <LoadingOverlay visible={isAnalyzing || isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <ScrollArea h={height - 312} type='auto'>
                    {AIresponseList} */}
                {/* <Grid justify="center" gutter={5} align="center" style={{ maxWidth: rem(300) }}>
                        {openForm && AIresponseList &&
                            AIresponseList.map((item: any, idx: number) => <DonationList key={idx} item={item} itemIdx={idx} />)

                        }
                    </Grid> */}
                {/* </ScrollArea> */}
                {/* < ResponseEdit open={openForm} response={AIresponse} tweak={(e: any) => tweakResult(e)} setProduct={(e: any) => set_Product(e)} saveProduct={(e: any) => saveProduct(e)} /> */}
                {/* </Box> */}
            </ScrollArea >
        </>
    )
}
