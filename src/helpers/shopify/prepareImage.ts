import { uniqueBarCode } from ".."

export function prepareImage(imageNo: number, alt: string, img: string) {
    let theImg = {}
    console.log(img.slice(0, 8))
    if (img.slice(0, 8) === 'https://') {
        theImg = {
            image: {
                position: imageNo,
                metafields: [
                    { key: 'new', value: 'newvalue', type: 'single_line_text_field', namespace: 'global' }
                ],
                src: img,
                alt: alt,
                filename: `H${uniqueBarCode()}.png`
            }
        }
    } else {
        theImg = {
            image: {
                position: imageNo,
                metafields: [
                    { key: 'new', value: 'newvalue', type: 'single_line_text_field', namespace: 'global' }
                ],
                attachment: img,
                alt: alt,
                filename: `H${uniqueBarCode()}.png`
            }
        }
    }
    return (
        JSON.stringify(theImg)
    )
}