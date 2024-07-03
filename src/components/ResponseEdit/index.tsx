export function ResponseEdit(response: any) {
    console.log(response)
    return (
        <>
            {response && response.response &&
                <div>
                    <textarea title='title' value={response?.response.title} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    <textarea title='description' value={response?.response.description} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    <textarea title='category' value={response?.response.category} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    <textarea title='weight' value={`${response?.response.weight} lbs`} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    <textarea title='room' value={response?.response.room} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    <textarea title='size' value={`h:${response?.response.size.height} w:${response?.response.size.width} d:${response?.response.size.depth}`} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>

                    <textarea title='manufacturer' value={response?.response.manufacturer} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>
                    <textarea title='price' value={`$${response?.response.price}`} onChange={(e) => console.log(e.currentTarget.value)} placeholder='Title...' spellCheck autoCorrect='on'></textarea>

                </div>}
        </>
    )
}