// joinImages('a.jpg','b.jpg').then(result => {const img = document.createElement('img');img.src=result;document.body.appendChild(img)})
export function joinImages(image1: any, image2: any) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const img2 = new Image()
        img2.src = image2

        const img1 = new Image()
        img1.src = image1

        img1.onload = () => {
            canvas.width = img1.width + img2.width
            canvas.height = Math.max(img1.height, img2.height)
            ctx?.drawImage(img1, 0, 0)
            ctx?.drawImage(img2, img1.width, 0)
            resolve(canvas.toDataURL())
        }

    })
}
