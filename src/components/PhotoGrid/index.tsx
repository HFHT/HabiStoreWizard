import './photogrid.css';

import { CONST_NOTSUPPORTED_IMAGES, CONST_NOTSUPPORTED_IMG, Iimg, Iimgs } from "..";
import { fileType, handleBrokenImage } from "../../helpers";
interface PhotoGridI {
    images: Iimgs
    onClick: Function
}
export function PhotoGrid({ images, onClick }: PhotoGridI) {
    return (
        <div className='photogrid'>
            <div className="container">
                {
                    images.map((image: Iimg, idx: number) => (
                        <div className="image" key={idx}>
                            <img src={imgSrc(image.url)} alt='item image' onError={(e) => handleBrokenImage(e)}
                                onClick={() => onClick(image)} className='hover-zoom'
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

function imgSrc(theImg: string) {
    if (theImg.includes('http')) return theImg
    return CONST_NOTSUPPORTED_IMAGES.includes(fileType(theImg)) ? CONST_NOTSUPPORTED_IMG : `${import.meta.env.VITE_STORAGEIMAGEURL}${theImg}`
}