import { convertImageToBase64, fetchJson, uniqueBarCode } from "..";

export async function addImages(images: Iimgs, title: string, thisHandle: string, noSave: boolean) {
    const url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopifyImage`;
    const headers = new Headers();
    var imageResponses: any[] = []
    try {
        images.map((thisImg: Iimg, idx: number) => {
            convertImageToBase64(thisImg.url, (img: any) => {
                let options = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        method: "image",
                        product: thisHandle,
                        body: JSON.stringify({
                            image: {
                                position: idx,
                                alt: title,
                                filename: `H${uniqueBarCode()}.png`,
                                metafields: [{ key: 'new', value: 'newvalue', type: 'single_line_text_field', namespace: 'global' }],
                                attachment: img.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
                            }
                        })
                    })
                }
                console.log(options)
                if (!noSave) {
                    imageResponses[idx] = fetchJson(url, options)
                }
            })
        })
        // const theData = await fetchAll(
        //     images.map((thisImg: Iimg, idx: number) => {
        //         return {
        //             url: url,
        //             init: {
        //                 method: "POST",
        //                 headers: headers,
        //                 body: JSON.stringify({
        //                     method: 'image',
        //                     product: thisHandle,
        //                     body: prepareImage(
        //                         idx + 1,
        //                         title,
        //                         thisImg.blob.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
        //                     )
        //                 })
        //             }
        //         }
        //     })
        // )
        // return theData
    }
    catch (error) { console.log(error); alert('Upload of Image failed: ' + error); }
    return imageResponses
}