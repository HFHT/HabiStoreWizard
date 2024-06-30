import { useState } from 'react';
import './App.css';
import { useVision } from './hooks';
import { ResponseEdit, SpinnerModal } from './components';

export function App() {
  const [imgUrl, setImgUrl] = useState('')
  const [analyze, result, isAnalyzing] = useVision()

  const doAnalyze = () => {
    analyze(imgUrl)
  }
  return (
    <>
      <SpinnerModal isLoading={isAnalyzing} text={isAnalyzing ? 'Analyzing...' : ''} />
      <input value={imgUrl} onChange={(e: any) => setImgUrl(e.target.value)} title='Image URL' />
      <button onClick={doAnalyze}>Analyze</button>
      <ResponseEdit response={result}/>
    </>
  )
}
