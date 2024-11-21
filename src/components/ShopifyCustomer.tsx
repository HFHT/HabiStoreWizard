import { useForm } from '@mantine/form';
import { TextInput, Button, Checkbox, Grid, Divider, Textarea, Group, LoadingOverlay, Box, Autocomplete, ComboboxItem, ScrollArea } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { dateFormat, isEmail, numberOrNull, uniqueKey, isZip, stringOrBlank } from '../helpers';
import { useParams, usePlacesAutocomplete, useSaveForm } from '../hooks'
import { DonorType, predictionType, ShopifyCustomerT } from '../types'
import { useViewportSize } from '@mantine/hooks';

interface ShopifyCustomerInterface {
    donations: string
    phone: string
    template: string | undefined
    customer: DonorType | undefined
    anonymous: boolean
    reset: Function
}
export type KioskFormType = {
    _id: number | string
    appt_FK: number | string | null
    date: string
    phone?: string
    firstName?: string
    lastName?: string
    company?: string
    donations: string
    email: string
    zip: string
    address?: string
    address2?: string
    newsletter: boolean
    emailReceipt: boolean
    place: predictionType
    newPlace: predictionType | undefined
    anonymous: boolean
}
export function ShopifyCustomer({ donations, phone, template, customer, anonymous, reset }: ShopifyCustomerInterface) {
    const [place, setPlace] = useState<predictionType | undefined>(customer && customer.formatted_address ? { description: customer.formatted_address } : undefined) //set either from Shopify customer or from the form's autocomplete
    const [searchValue, setSearchValue] = useState<string>(stringOrBlank(customer?.formatted_address))
    const [addrError, setAddrError] = useState<string>('')
    const [predictions] = usePlacesAutocomplete(searchValue)
    const [autocompleteData, setAutocompleteData] = useState<string[]>([])
    const params = useParams(['nosave', 'noprint'])

    useEffect(() => {
        console.log('useEffect', predictions)
        if (predictions && predictions.length > 0) {
            let theData = predictions.map((p: predictionType) => p!.description)
            setAutocompleteData(theData)
        }
    }, [predictions])

    const [saveForm, isBusy] = useSaveForm(params.noSave, template,
        () => {
            console.log('saveForm-callback')
            reset()
            form.clearErrors();
            form.reset();
            form.initialize(initialValues);
        }
    )
    const initialValues = useMemo(() => ((!anonymous && customer !== null) ? {
        _id: uniqueKey(),
        appt_FK: customer?._id,
        date: dateFormat(null),
        firstName: stringOrBlank(customer?.name.first),
        lastName: stringOrBlank(customer?.name.last),
        company: stringOrBlank(customer?.name.company),
        donations: stringOrBlank(donations),
        email: stringOrBlank(customer?.email),
        zip: stringOrBlank(customer?.addr?.zip),
        address: stringOrBlank(customer?.addr.addr),
        address2: stringOrBlank(customer?.addr.address2),
        newsletter: false,
        emailReceipt: true,
        phone: phone,
        place: customer?.addr ? customer.addr : {},
        anonymous: anonymous
    } : {
        _id: uniqueKey(),
        date: dateFormat(null),
        appt_FK: null,
        donations: stringOrBlank(donations),
        email: '',
        newsletter: false,
        emailReceipt: false,
        phone: phone,
        zip: '',
        place: {},
        anonymous: anonymous

    }), [customer])

    useEffect(() => {
        console.log('customer-useEffect', customer)
    }, [customer])

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: initialValues,
        validate: {
            // firstName: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
            // lastName: (value) => (value.length < 2 ? 'Last name must have at least 2 letters' : null),
            donations: (value) => (value.length < 5 ? 'Donation must have at least 5 characters' : null),
            email: (value) => ((value === '' || isEmail(value)) ? null : 'Invalid email'),
            newsletter: (value, values) => ((value && !isEmail(values.email)) ? 'Email required' : null),
            emailReceipt: (value, values) => ((value && !isEmail(values.email)) ? 'Email required' : null),
            zip: (value) => (isZip(value) ? 'Zip must have 5 characters' : null),
        },
    })

    const handleSave = () => {
        console.log('handleSave', form.getValues(), form.values, form.values.address, form.values.place)
        if (searchValue !== '' && place === undefined) {
            setAddrError('Invalid address, please select one.')
            return
        }
        form.validate()
        if (!form.isValid()) { console.log('invalid', form.validate()); return }
        // saveForm({ ...form.getValues(), place: place! },)
        //@ts-ignore
        saveForm({ ...form.getValues(), newPlace: place })
    }

    return (
        <div >
            <Divider />
            <Box pos='relative'>
                <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <form className=''>
                    <Group grow justify="flex-end" >
                        <Button onClick={() => handleSave()} mt="lg" size='sm'>&nbsp;&nbsp;Done&nbsp;&nbsp;</Button>
                        <Button onClick={() => { form.clearErrors(); form.initialize(initialValues); reset() }} mt="lg" size='sm'>Start Over</Button>
                    </Group>
                    <Grid grow justify="space-between" align="center" className='pad-above-md'>
                        <Grid.Col span={2}>
                            <TextInput label="Zipcode" size='md' placeholder="#####" withAsterisk
                                key={form.key('zip')}
                                {...form.getInputProps('zip')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            {!anonymous && <TextInput label="First Name" placeholder="First Name..." size='md'
                                key={form.key('firstName')}
                                {...form.getInputProps('firstName')}
                            />}
                        </Grid.Col>
                        <Grid.Col span={4}>
                            {!anonymous && <TextInput label="Last Name" placeholder="Last Name..." size='md'
                                key={form.key('lastName')}
                                {...form.getInputProps('lastName')}
                            />
                            }
                        </Grid.Col>

                    </Grid>
                    {!anonymous && <TextInput label="Company Name" size='md' placeholder="Company name..."
                        key={form.key('company')}
                        {...form.getInputProps('company')}
                    />
                    }
                    <Textarea className='pad-above' size="md" label="Donation" withAsterisk autosize minRows={5}
                        description="Enter a list of items and quantities that you are donating."
                        placeholder="1 table, 4 chairs..."
                        key={form.key('donations')}
                        {...form.getInputProps('donations')}
                    />
                    <Grid grow justify="space-between" align="center">
                        <Grid.Col span={6}>
                            <TextInput mt="sm" label="Email" size='md' placeholder="Email"
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            {!anonymous && <Checkbox label="Sign up for our newsletter?" size="sm"
                                key={form.key('newsletter')}
                                {...form.getInputProps('newsletter', { type: 'checkbox' })}
                            />
                            }
                            <Checkbox label="Email receipt?" size="sm"
                                key={form.key('emailReceipt')}
                                {...form.getInputProps('emailReceipt', { type: 'checkbox' })}
                            />
                        </Grid.Col>
                    </Grid>
                    {!anonymous &&
                        <Autocomplete
                            className='pad-above' label="Address" placeholder="Address..." size="md"
                            key={form.key('address')}
                            error={addrError}
                            value={searchValue}
                            onChange={setSearchValue}
                            onOptionSubmit={(v) => {
                                setAddrError('');
                                setPlace(predictions.find((p: predictionType) => p?.description === v))
                            }}
                            data={autocompleteData}
                            filter={
                                ({ options, search }) => {
                                    const splittedSearch = search.toLowerCase().trim().split(' ');
                                    return (options as ComboboxItem[]).filter((option) => {
                                        const words = option.label.toLowerCase().trim().split(' ');
                                        return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
                                    });
                                }
                            }
                        />
                    }
                    {!anonymous &&
                        <TextInput className='pad-above' label="Apartment, suite, etc" size='lg' placeholder="Address2..."
                            key={form.key('address2')}
                            {...form.getInputProps('address2')}
                        />
                    }
                </form>
            </Box>
        </div >
    )
}