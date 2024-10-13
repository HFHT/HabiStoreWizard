
export async function saveDonor(req, client) {
    let dbResponse = undefined

    try {
        dbResponse = await client.db('Truck').collection('DonorsNew').updateOne({ _id: req.find }, { $set: req.data }, { upsert: true })
        // dbResponse = await Promise.all([
        //     // client
        //     //     .db('Kiosk')
        //     //     .collection('Donations')
        //     //     .find({ phone: find }).toArray(),
        //     client
        //         .db('Truck')
        //         .collection('DonorsNew')
        //         .updateOne(req.find, req.data, { upsert: true })

        //     // .updateOne(req.find, { $set: req.data }, { upsert: true })
        // ])
        // return [dbResponse[0], dbResponse[1], null]
        return [dbResponse, null]

    } catch (error) {
        return [[], [], error]
    }
}
