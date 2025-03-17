import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { saveDonor } from "../utils/saveDonor";
var MongoClient = require('mongodb').MongoClient;

export async function saveDonation(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const client = new MongoClient(process.env.ATLAS_URI)
    await client.connect()
    const req: any = await request.json()
    context.log('req', req)
    const [donor, err] = await saveDonor(req, client)
    context.log('donor', donor)
    await client.close()
    return { body: JSON.stringify({ donor: { ...donor }, err: err }) };
};

app.http('saveDonation', {
    methods: ['POST', 'PUT'],
    authLevel: 'anonymous',
    handler: saveDonation
});
