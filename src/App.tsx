import './App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { useShopify, useVision } from './hooks';
import { DragDropFile, Iimgs, ResponseEdit, SpinnerModal } from './components';
import { useOnline } from './hooks/useOnline';
import { PhotoGrid } from './components/PhotoGrid';
import { convertImageToBase64 } from './helpers';

export function App({ collections }: any) {
  const isOnline = useOnline({ online: [handleOnline], offline: [handleOffline] });

  const [imgUrl, setImgUrl] = useState('')
  const [_product, set_Product] = useState()
  const [analyze, result, tweakResult, isAnalyzing] = useVision()
  const [addProduct] = useShopify(collections)
  const [images, setImages] = useState<Iimgs>([])

  const doAnalyze = () => {
    analyze(imgUrl)
    // addProduct()
  }
  const doClear = () => {
    tweakResult(null)
    setImages([])
  }
  const saveProduct = (p: any) => {
    console.log(_product)
  }
  return (
    <>
      <ToastContainer position="top-left" className='mytoast' autoClose={2100} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <SpinnerModal isLoading={isAnalyzing} text={isAnalyzing ? 'Analyzing...' : ''} />
      {/* <p>Best image will "feature" the product, clearly show manufacturer and taken to hilight height, width, and depth.</p> */}
      {/* <input value={imgUrl} onChange={(e: any) => setImgUrl(e.target.value)} title='Image URL' />
      <button onClick={doAnalyze}>Analyze</button> */}

      <DragDropFile images={images} title='Product Photos' setImages={setImages} analyze={(e: any) => convertImageToBase64(e.url, (ee: any) => analyze(ee))} />
      {/* <PhotoGrid images={images} onClick={(e: any) => console.log(e)} /> */}
      <ResponseEdit response={result} tweak={(e: any) => tweakResult(e)} setProduct={(e: any) => set_Product(e)} saveProduct={(e: any) => saveProduct(e)} />
      {images.length > 0 && <button onClick={doClear}>Clear</button>}
    </>
  )
}
function handleOnline() {
  toast.info('You are back online.', { autoClose: 6000, position: 'top-center' })
};

function handleOffline() {
  toast.error('Connection to the network has been lost. Application is now in READ ONLY mode!', { autoClose: 10000, position: 'top-center' })
};
