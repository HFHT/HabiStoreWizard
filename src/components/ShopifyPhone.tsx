import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { Box, Flex, LoadingOverlay, Switch, Text, Title } from "@mantine/core";
import { useDonor } from "../hooks";
interface ShopifyPhoneInterface {
    onChange: Function
    phone: string | null
    setPhone: Function
    anonymous: boolean
    setAnonymous: Function
}
export function ShopifyPhone({ phone, setPhone, anonymous, setAnonymous, onChange }: ShopifyPhoneInterface) {
    const {donor, findDonor, isDonorBusy} = useDonor()
    function handlePhone(p: string) {
        if (p.length === 11) { findDonor(p) }
        setPhone(p)
    }
    useEffect(() => {
        console.log('customer-useEffect', donor)
        if (donor !== undefined) { onChange(donor) }
    }, [donor])
    return (
        <>
            <LoadingOverlay visible={isDonorBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Box pos='relative' mb='md'>
                <Flex gap='xs' justify={'center'} align={'flex-end'}>
                    <Flex gap='xs' justify={'center'} align={'flex-end'}>
                        <Text size={'sm'}>Phone</Text>
                        <div className='pickphone'>
                            <PhoneInput disabled={anonymous} country={'us'} value={phone} inputClass='pickphoneinput'
                                onChange={(p: any) => handlePhone(p)} inputProps={{size:'13'}}
                            />
                        </div>
                    </Flex>
                    <Switch
                        size='lg' label="Anonymous" labelPosition="left" onLabel="Yes" offLabel="No"
                        checked={anonymous}
                        onChange={(e) => {
                            onChange(!anonymous ? { phone: '', formatted_address: '' } : undefined)
                            setAnonymous(!anonymous)
                        }}
                    />
                </Flex>
            </Box>
        </>
    )
}
