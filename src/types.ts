export interface ReservationCreate {
    first_name: string,
    last_name: string,
    mobile_number: string,
    reservation_date: string,
    reservation_time: string,
    people: number
}

export interface ReservationUpdate {
    reservation_id: number,
    first_name: string,
    last_name: string,
    mobile_number: string,
    reservation_date: string,
    reservation_time: string,
    people: number,
    status: string
}


export interface TableCreate {
    table_name: string,
    capacity: number
}

export interface TableUpdate {
    table_name: string,
    capacity: number,
    table_id: number,
    reservation_id: string,
}

