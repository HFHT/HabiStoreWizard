export async function saveDonor(req, client) {
    try {
        const dbResponse = await client.db('Truck').collection('DonorsNew').updateOne({ _id: req.find }, { $set: req.data }, { upsert: true })
        return [dbResponse, null]
    } catch (error) {
        return [[], error]
    }
}
