import { useEffect, useMemo, useState } from 'react';
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    keys,
    Avatar,
    Checkbox,
    Flex,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconBarcode, IconTagFilled, IconChecklist, IconFileCheck } from '@tabler/icons-react';
import classes from './TableSort.module.css';

interface RowData {
    id: string;
    title: string;
    created_at: string;
    tags: string;
}


interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}
interface TableSortInterface {
    data: any
    selections: string[]
    setSelections: Function
}
function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

function filterData(data: RowData[], search: string) {
    console.log('filterData', data, search, keys(data[0]))
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => searchableField(item[key]).includes(query))
    );
}
function searchableField(field: any) {
    if (['number', 'string'].includes(typeof (field))) {
        return field.toString().toLowerCase()
    }
    return ''
}
function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload;
    console.log('sortData', data, payload)
    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

export function TableSort({ data, selections, setSelections }: TableSortInterface) {
    console.log('TableSort', data)
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState<RowData[]>();
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const toggleRow = (id: string) =>
        setSelections((current: any) =>
            current.includes(id) ? current.filter((item: any) => item !== id) : [...current, id]
        );
    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };
    const rows = useMemo(() => sortedData && sortedData.map((row: any, idx: number) => (
        <Table.Tr key={row.id}>
            <Table.Td>
                <Checkbox checked={selections.includes(row.id)} onChange={() => toggleRow(row.id)} />
            </Table.Td>
            <Table.Td><Flex wrap='nowrap' >{(row.tags.search(/bc!/) > -1) && <IconBarcode />}{(row.tags.search(/ht!/) > -1) && <IconTagFilled />}</Flex></Table.Td>
            <Table.Td><Avatar variant="default" radius="sm" size="lg" src={row.image.src} /></Table.Td>
            <Table.Td>{row.title}</Table.Td>
            <Table.Td>{row.created_at}</Table.Td>
            <Table.Td>{row.tags}</Table.Td>
        </Table.Tr>
    )), [sortedData, selections]);
    useEffect(() => {
        setSortedData(data)
    }, [data])
    return (
        <ScrollArea h={550} >
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="xs" verticalSpacing="xs" miw={700} layout="auto">
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th />
                        <Table.Th>Status</Table.Th>
                        <Table.Th />
                        <Th
                            sorted={sortBy === 'title'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('title')}
                        >
                            Product
                        </Th>
                        <Th
                            sorted={sortBy === 'created_at'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('created_at')}
                        >
                            Date
                        </Th>
                        <Th
                            sorted={sortBy === 'tags'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('tags')}
                        >
                            Tags
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {sortedData && rows!.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={2}>

                                <Text fw={500} ta="center">
                                    Nothing found
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
}