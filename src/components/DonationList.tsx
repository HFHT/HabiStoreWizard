//Deprecated, this was for the old method of an array of returned items.

import { Box, Button, Checkbox, Divider, Flex, Grid, Input, LoadingOverlay, NumberInput, Table, Text, TextInput, useMantineTheme } from "@mantine/core"
import { useState } from "react"

interface DonationListI {
    item: any
    itemIdx: number
}
export function DonationList({ item, itemIdx }: DonationListI) {
    const [quantity, setQuantity] = useState<number>(item.quantity)
    const [name, setName] = useState<string>(item.item)
    const [checked, setChecked] = useState(true)
    console.log(item)
    if (!open) return
    return (
        <>
            <Grid.Col span={1}>
                <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
            </Grid.Col>
            <Grid.Col span={3}>
                <NumberInput value={quantity} min={0} onChange={(e) => setQuantity(Number(e))} />
            </Grid.Col>
            <Grid.Col span={7} ml={5}>
                <TextInput value={name} onChange={(e) => setName(e.target.value)} />
            </Grid.Col>
        </>
    )
}
