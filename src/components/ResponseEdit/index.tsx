import { CONST_CATS, CONST_ROOMS } from '../../CONSTANTS';
import { Slider } from '../Slider';
import './responseedit.css';

interface ResponseEditI {
    response: responseFromAIType | null
    setProduct: Function
    saveProduct: Function
    tweak: Function
}


export function ResponseEdit({ response, setProduct, saveProduct, tweak }: ResponseEditI) {
    console.log(response)
    return (
        <>
            {response &&
                <div className="visionresponse">
                    <div className='flex justify-content'>
                        <div>
                            <select name='category' value={response?.category} onChange={(e: any) => tweak({ ...response, category: e.currentTarget.value })} title='category'>
                                <option value=''>...category</option>
                                {CONST_CATS.map((tc: string, idx: number) => <option value={tc} key={idx}>{tc}</option>)}
                            </select>
                        </div>
                        <div>
                            <select name='room' value={response?.room} onChange={(e: any) => tweak({ ...response, room: e.currentTarget.value })} title='room'>
                                <option value=''>...room</option>
                                {CONST_ROOMS.map((tc: string, idx: number) => <option value={tc} key={idx}>{tc}</option>)}
                            </select>
                        </div>
                    </div>
                    <div><input type='text' value={response?.title} onChange={(e: any) => tweak({ ...response, title: e.currentTarget.value })} title="title" /></div>
                    <div><textarea rows={6} title='description' value={response?.description} onChange={(e: any) => tweak({ ...response, description: e.currentTarget.value })} placeholder='Title...' spellCheck autoCorrect='on'></textarea></div>
                    <div>{response?.manufacturer !== 'Unknown' && <div>Mfg: <input type='text' value={response?.manufacturer} onChange={(e: any) => console.log(e.currentTarget.value)} title="manufacturer" className='mfg' /></div>}</div>
                    <div className='flex justify-content'>
                        <div>$<input type='number' value={response?.price} onChange={(e: any) => tweak({ ...response, price: e.currentTarget.value })} title="price" className='price' /></div>
                        <div>Qty:<input type='number' value={response?.qty} onChange={(e: any) => tweak({ ...response, qty: e.currentTarget.value })} title="quantity" className='weight' /></div>
                        <div><input type='number' value={response?.weight} onChange={(e: any) => tweak({ ...response, weight: e.currentTarget.value })} title="weight" className='weight' />lbs</div>

                    </div>
                    <div className='flex justify-content'>
                        <div>Height:<input type='number' value={response?.size.height} onChange={(e: any) => tweak({ ...response, size: { ...response.size, height: e.currentTarget.value } })} title="height" className='size' /></div>
                        <div>Width:<input type='number' value={response?.size.width} onChange={(e: any) => tweak({ ...response, size: { ...response.size, width: e.currentTarget.value } })} title="width" className='size' /></div>
                        <div>Depth:<input type='number' value={response?.size.depth} onChange={(e: any) => tweak({ ...response, size: { ...response.size, depth: e.currentTarget.value } })} title="depth" className='size' /></div>
                    </div>
                    <hr />
                    <div className='flex justify-content'>
                        <Slider label='Feature' value={response?.feature} setValue={(e: any) => tweak({ ...response, feature: e })} />
                        <Slider label='Guarantee' value={response?.guarantee} setValue={(e: any) => tweak({ ...response, guarantee: e })} />
                    </div>
                    <hr />
                </div>}
        </>
    )
}