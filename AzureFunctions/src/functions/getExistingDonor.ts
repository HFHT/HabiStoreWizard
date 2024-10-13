import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getDonor } from "../utils/getDonor";
var MongoClient = require('mongodb').MongoClient;

export async function getExistingDonor(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const client = new MongoClient(process.env.ATLAS_URI)
    await client.connect()
    const find = request.query.get('find')
    // const [kiosk, donor, err] = await getDonor(find, client)
    const [donor, err] = await getDonor(find, client)
    client.close
    return { body: JSON.stringify({ ...donor, err: err }) };
};

app.http('getExistingDonor', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getExistingDonor
});
