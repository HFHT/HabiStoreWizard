
export async function getDonor(find, client) {
    let dbResponse = undefined

    try {
        dbResponse = await Promise.all([
            // client
            //     .db('Kiosk')
            //     .collection('Donations')
            //     .find({ phone: find }).toArray(),
            client
                .db('Truck')
                .collection('Donors')
                .find({
                    _id: find
                }).toArray()
        ])
        // return [dbResponse[0], dbResponse[1], null]
        return [dbResponse[0][0], null]

    } catch (error) {
        return [[], [], error]
    }
}
