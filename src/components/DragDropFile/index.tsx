import { fileType, handleBrokenImage } from '../../helpers';
import { CloseIcon } from '../../icons';
import { Modal, useModal } from '../Modal';
import './dragdropfile.css';
import { useState, useRef } from 'react';

export const CONST_NOTSUPPORTED_IMAGES = ['HEIC', 'MPG', 'MPEG']
export const CONST_NOTSUPPORTED_IMG = 'https://hfhtdev.blob.core.windows.net/habistorepickup/invalidphoto.jpg'

export interface Iimg {
    name: string;
    url: string;
    blob: any;
}
export interface Iimgs extends Array<Iimg> { }

interface IDrag {
    images: Iimgs;
    setImages: Function;
    title: string;
    analyze: Function
}

export function DragDropFile({ images, setImages, title, analyze }: IDrag) {
    const [isDragging, setIsDragging] = useState(false)
    const fileInput = useRef(null)
    const [showImgPopup, setShowImgPopup] = useState('')
    const photoModal = useModal()

    function selectFiles() {
        //@ts-ignore
        fileInput.current.click()
    }
    function onFileSelect(event: any) {
        const files = event.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue
            if (!images.some((e: any) => e.name === files[i].name)) {
                setImages((prevImages: any) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        blob: files[i]
                    }
                ])
            }
        }
    }
    function deleteImage(idx: number) {
        // console.log(images.filter((_: any, i: number) => i !== idx), idx)
        const trimmedImages = images.filter((_: any, i: number) => i !== idx)
        setImages(trimmedImages)
    }
    function chooseImage(idx: number) {
        console.log(idx, images[idx])
        analyze(images[idx])
    }
    function onDragOver(event: any) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = 'copy'
    }
    function onDragLeave(event: any) {
        event.preventDefault();
        setIsDragging(false)
    }
    function onDrop(event: any) {
        event.preventDefault();
        setIsDragging(false)
        const files = event.dataTransfer.files
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue
            if (!images.some((e: any) => e.name === files[i].name)) {
                setImages((prevImages: any) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        blob: files[i]
                    }
                ])
            }
        }
    }
    function imgSrc(theImg: string) {
        if (theImg.includes('http')) return theImg
        return CONST_NOTSUPPORTED_IMAGES.includes(fileType(theImg)) ? CONST_NOTSUPPORTED_IMG : `${import.meta.env.VITE_STORAGEIMAGEURL}${theImg}`
    }
    function handleImgPop(theImg: string) {
        console.log('handleImgPop', theImg)
        if (CONST_NOTSUPPORTED_IMAGES.includes(fileType(theImg))) {
            window.open(`${import.meta.env.VITE_STORAGEIMAGEURL}${theImg}`, '_img', `popup,width=300,height=300,screenx=${(screen.width / 2) - 150},screeny=${(screen.height / 2) - 150}`)
            return
        }
        photoModal.toggle()
        setShowImgPopup(theImg)
    }
    return (
        <div className="card">
            <div className="top">
                <p>{title}</p>
            </div>
            <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ?
                    (
                        <span className="select">
                            Drop images here
                        </span>
                    ) : (
                        <>
                            {/* Drag & Drop image here or {" "} */}
                            <span className="select" role="button" onClick={selectFiles}>
                                Open Camera
                            </span>
                        </>

                    )}
                <input name='file' type='file' multiple ref={fileInput} onChange={onFileSelect} title='file'></input>
            </div>
            <div className="container">
                {
                    images.map((image: any, idx) => (
                        <div className="image" key={idx}>
                            {/* <span className="choose" onClick={() => chooseImage(idx)}>&radic;</span> */}
                            <span className="delete" onClick={() => deleteImage(idx)}>&times;</span>
                            <img src={image.url} alt={image.name} onError={(e) => handleBrokenImage(e)}
                                onClick={() => handleImgPop(image.url)} className='hover-zoom'
                            />
                            <div className='btns'>
                                <div className='btn' onClick={() => chooseImage(idx)}>Analyze</div>
                            </div>
                        </div>
                    )

                    )
                }
            </div>
            {photoModal.isOpen &&
                <Modal isOpen={photoModal.isOpen} toggle={photoModal.toggle} classes='img-modal'>
                    <div className="modal-close"><button onClick={(e) => photoModal.toggle()}>{CloseIcon()}</button></div>
                    <img src={imgSrc(showImgPopup)} alt='item image' className='' />
                </Modal>
            }
        </div>
    )
}