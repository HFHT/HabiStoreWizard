import { PlacesType, ScheduleApptsDonationType } from "."

export type DonorType = {
    _id: string
    appt_FK: string
    addr: PlacesType
    formatted_address: string
    dt: string
    email: string
    name: { first: string, last: string, company: string }
    type: 'pickup' | 'delivery'
    source: 'scheduler' | 'web' | 'online' | 'dropoff'
    donation: ScheduleApptsDonationType[]
}