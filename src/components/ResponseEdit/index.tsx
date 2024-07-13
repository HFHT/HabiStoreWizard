import { Flex, NativeSelect, NumberInput, Switch, Textarea, TextInput } from '@mantine/core';
import { CONST_CATS, CONST_ROOMS } from '../../CONSTANTS';
import './responseedit.css';

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
            <Flex gap="xs" justify="center" direction="row" wrap="nowrap">
                <Switch checked={response?.feature} label="Feature" size="md" onLabel="YES" offLabel="NO" 
                onChange={(e: any) => tweak({ ...response, feature: !response?.feature })}
                />
                <Switch checked={response?.guarantee} label="Guarantee" size="md" onLabel="YES" offLabel="NO" 
                onChange={(e: any) => tweak({ ...response, guarantee: !response?.guarantee })}
                />
            </Flex>
            <NativeSelect value={response?.category} data={CONST_CATS.map((tc: string, idx: number) => tc)}
                onChange={(e: any) => tweak({ ...response, category: e })}
            />
            <NativeSelect value={response?.room} data={CONST_ROOMS.map((tc: string, idx: number) => tc)} />

            <TextInput value={response?.title} placeholder='...Title' />
            <Textarea value={response?.description} rows={6} placeholder="...Description" />
            <TextInput value={response?.manufacturer} placeholder='...Manufacturer' />
            <Flex >
                <NumberInput value={response?.price} leftSection='$' />
                <NumberInput value={response?.qty} leftSection='#' />
                <NumberInput value={response?.weight} leftSection='lbs' />
            </Flex>
            <Flex >
                <NumberInput value={response?.size.height} leftSection='H: ' />
                <NumberInput value={response?.size.width} leftSection='W: ' />
                <NumberInput value={response?.size.depth} leftSection='D: ' />
            </Flex>
        </>
    )
}