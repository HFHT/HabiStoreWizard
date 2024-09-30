import { Flex, NativeSelect, NumberInput, Switch, Textarea, TextInput } from '@mantine/core';
import { CONST_CATS, CONST_ROOMS } from '../../CONSTANTS';
// import './responseedit.css';

interface ResponseEditI {
    response: responseFromAIType | null
    open: boolean
    setProduct: Function
    saveProduct: Function
    tweak: Function
}

export function ResponseEdit({ open, response, setProduct, saveProduct, tweak }: ResponseEditI) {
    console.log(response)
    if (!open) return
    return (
        <>
            <Flex gap="xs" justify="center" direction="row" wrap="nowrap" className='pad-below pad-above'>
                <Switch checked={response?.deliver} label="Deliver" size="md" onLabel="YES" offLabel="NO"
                    onChange={(e: any) => tweak({ ...response, deliver: !response?.deliver })}
                />
                <Switch checked={response?.feature} label="Feature" size="md" onLabel="YES" offLabel="NO"
                    onChange={(e: any) => tweak({ ...response, feature: !response?.feature })}
                />
                <Switch checked={response?.guarantee} label="Guarantee" size="md" onLabel="YES" offLabel="NO"
                    onChange={(e: any) => tweak({ ...response, guarantee: !response?.guarantee })}
                />
                <Switch checked={response?.dimensions} label="Size" size="md" onLabel="YES" offLabel="NO"
                    onChange={(e: any) => tweak({ ...response, dimensions: !response?.dimensions })}
                />
            </Flex>
            <NativeSelect value={response?.category} data={CONST_CATS.map((tc: string, idx: number) => tc)}
                onChange={(e: any) => tweak({ ...response, category: e.target.value })}
            />
            <NativeSelect value={response?.room} data={CONST_ROOMS.map((tc: string, idx: number) => tc)}
                onChange={(e: any) => tweak({ ...response, room: e.target.value })}
            />
            <TextInput value={response?.title} placeholder='...Title'
                onChange={(e: any) => tweak({ ...response, title: e.target.value })}
            />
            <Textarea value={response?.description} rows={6} placeholder="...Description"
                onChange={(e: any) => tweak({ ...response, description: e.target.value })}
            />
            <TextInput value={response?.manufacturer} placeholder='...Manufacturer'
                onChange={(e: any) => tweak({ ...response, manufacturer: e.target.value })}
            />
            <Flex >
                <NumberInput value={response?.price} leftSection='$'
                    onChange={(e: any) => tweak({ ...response, price: e })}
                />
                <NumberInput value={response?.qty} leftSection='#'
                    onChange={(e: any) => tweak({ ...response, qty: e })}
                />
                <NumberInput value={response?.weight} leftSection='lbs'
                    onChange={(e: any) => { console.log(e); tweak({ ...response, weight: e }) }}
                />
            </Flex>
            <Flex >
                <NumberInput value={response?.size.height} leftSection='H: '
                    onChange={(e: any) => tweak({ ...response, size: { ...response!.size, height: e } })}
                />
                <NumberInput value={response?.size.width} leftSection='W: '
                    onChange={(e: any) => tweak({ ...response, size: { ...response!.size, width: e } })}
                />
                <NumberInput value={response?.size.depth} leftSection='D: '
                    onChange={(e: any) => tweak({ ...response, size: { ...response!.size, depth: e } })}
                />
            </Flex>
        </>
    )
}