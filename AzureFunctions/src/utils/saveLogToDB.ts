export async function saveLogToDB(req, client) {
    try {
        const dbResponse = await client.db('Habitat').collection('ShopifyWizard').insertOne(req.data)
        return [dbResponse, null]
    } catch (error) {
        return [[], error]
    }
}
