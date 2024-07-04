interface ResponseEditI {
    response: any
    setProduct: Function
    saveProduct: Function
}
const CONST_ROOMS = ['Bathroom', 'Bedroom', 'Dining Room', 'Household', 'Living Room', 'Kitchen', 'Office', 'Patio & Outdoor Living']
export function ResponseEdit({ response, setProduct, saveProduct }: ResponseEditI) {
    console.log(response)
    return (
        <>
            {response && 
                <div>
                    <textarea title='title' value={response?.title} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    <textarea title='description' value={response?.description} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    <textarea title='category' value={response?.category} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    <textarea title='room' value={response?.room} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>

                    <div><input type='number' value={response?.weight} onChange={(e: any) => console.log(e.currentTarget.value)} title="weight" />lbs</div>
                    {/* <textarea title='weight' value={`${response?.weight} lbs`} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea> */}
                    {/* <textarea title='size' value={`h:${response?.size.height} w:${response?.size.width} d:${response?.size.depth}`} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea> */}
                    <div>h:<input type='number' value={response?.size.height} onChange={(e: any) => console.log(e.currentTarget.value)} title="height" /></div>
                    <div>w:<input type='number' value={response?.size.width} onChange={(e: any) => console.log(e.currentTarget.value)} title="width" /></div>
                    <div>d:<input type='number' value={response?.size.depth} onChange={(e: any) => console.log(e.currentTarget.value)} title="depth" /></div>

                    <textarea title='manufacturer' value={response?.manufacturer} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    {/* <textarea title='price' value={`$${response?.price}`} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea> */}
                    <div>$<input type='number' value={response?.price} onChange={(e: any) => console.log(e.currentTarget.value)} title="price" /></div>

                </div>}
        </>
    )
}