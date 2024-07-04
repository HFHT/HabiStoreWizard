// convertImageToBase64('https://example.com/image.jpg', function (base64Data) { })
export function convertImageToBase64(imgUrl:string, callback:Function) {
    const img = new Image();
    img.src = imgUrl;
    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0, img.width, img.height);
        const base64Data = canvas.toDataURL('image/jpeg'); // Change the format if needed
        callback(base64Data);
    };
}