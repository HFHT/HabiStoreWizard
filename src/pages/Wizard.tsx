import { useState } from "react"
import { useShopify, useVision } from "../hooks"
import { ResponseEdit } from "../components"
import { convertImageToBase64 } from "../helpers"
import { ImageCarousel } from "../components/ImageCarousel"
import { Box, Button, Divider, Flex, LoadingOverlay, Text, useMantineTheme } from "@mantine/core"
import InputImages from "../components/InputImages"
import { useMediaQuery } from "@mantine/hooks"

export function Wizard({ collections }: any) {
    const theme = useMantineTheme()
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
    const [openForm, setOpenForm] = useState(false)
    const [addProduct, addTags, products, getProductList, isBusy] = useShopify(collections, false)
    const [_product, set_Product] = useState()
    const [analyze, result, tweakResult, isAnalyzing] = useVision()
    const [images, setImages] = useState<Iimgs>([])

    const action = (theAction: any) => {
        switch (theAction.cmd) {
            case 'AI':
                convertImageToBase64(theAction.img.url, (ee: any) => analyze(ee))
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
        tweakResult(null)
        setImages([])
        setOpenForm(false)
    }
    const doSave = () => {
        addProduct(result, images)
        doClear()
    }
    const saveProduct = (p: any) => {
        console.log(_product)
    }
    return (
        <>
            <Flex gap="xs" justify="center" direction="row" wrap="nowrap">
                <InputImages images={images} setImages={setImages} />
                <Button size={mobile ? "xs" : "sm"} onClick={doClear} disabled={images.length > 0 && result ? false : true}>Clear</Button>
                <Button size={mobile ? "xs" : "sm"} onClick={doSave} disabled={images.length > 0 && result ? false : true}>Save</Button>
            </Flex>
            <Divider my="xs" />
            <ImageCarousel images={images} open={images.length > 0} action={(e: any) => action(e)} />
            <Box pos='relative'>
                <LoadingOverlay visible={isAnalyzing || isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                < ResponseEdit open={openForm} response={result} tweak={(e: any) => tweakResult(e)} setProduct={(e: any) => set_Product(e)} saveProduct={(e: any) => saveProduct(e)} />
            </Box>
        </>
    )
}