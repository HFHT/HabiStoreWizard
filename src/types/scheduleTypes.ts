export type ZipAvailability = {
    zip: string
    notes: string
    dates: ZipDates[]
}
export type ZipDates = {
    date: string
    dow: number
    totalPickups: number
    stops: number
    blocks: number
    remaining: number
    full: boolean
}

export type ScheduleDatesType = {
    _id: string
    archive: boolean
    block: string[]
    waitlist: string[]
    stops: ScheduleDatesStopsType
}

export type ScheduleDatesStopsType = {
    'Unassigned': ScheduleStopsType[]
    'Blue': ScheduleStopsType[]
    'Red': ScheduleStopsType[]
    '3rd': ScheduleStopsType[]
    'Corporate': ScheduleStopsType[]
    'Cancel': ScheduleStopsType[]
}
export type ScheduleStopsType = {
    a_id: number                                                    // Constituent ID
    d_id: number                                                    // ID of this donation
    size: number
    order: number
    type: 'pickup' | 'delivery'
    source:  'scheduler' | 'web' | 'online'
    status: ScheduleStopsStatusType
}
export type ScheduleStopsStatusType = {
    code: 'open' | 'completed' | 'cancelled' | 'resched' | 'moved'
    date: string
    by: string
}

export type ScheduleApptsType = {
    _id: number | undefined
    name: {
        first: string | null
        last: string | null
        company: string | null
    }
    // appt: {                                     //Remove this, handle number of slots differently
    //     slot: string
    // }
    phone: string | null
    email: string | null
    zip: string | null
    place: PlacesType
    // cust: {
    //     apt: string
    //     note: string
    // }
    // dt: string
    // src: 'w' | 's' | 'o' | 'd'
    // driverNote: string
    // note: string
    // waitlist: string
    // done: boolean
    // resched: boolean
    // remind: boolean
    // cancel: boolean
    // size: number
    shopify_id: number | null
    // items: ItemsType[]
    // imgs: string[]
    calls: CallsType[]
    // proof: string[]
    donations: ScheduleApptsDonationType[]
}
export type ScheduleApptsDonationType = {
    id: number | undefined,
    date: string,
    driverNote: string,
    note: string,
    items: ItemsType[],
    imgs: [],
    proof: [],
    cancelled: boolean
}
export type PlacesType = {
    addr: string | null
    address2: string | null
    lat: number | null
    lng: number | null
    num: string | null
    route: string | null
    city: string | null
    state: string | null
    c_cd: string | null
    c_nm: string | null
    zip: string | null
}

export type ItemsType = {
    prod: string
    qty: string
}

export type CallsType = {
    dt: string
    note: string
}