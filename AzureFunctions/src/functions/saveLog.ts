import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { saveLogToDB } from "../utils/saveLogToDB";
var MongoClient = require('mongodb').MongoClient;

export async function saveLog(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const req: any = await request.json()
    context.log('req', req)
    const client = new MongoClient(process.env.ATLAS_URI)
    await client.connect()
    const [retLog, err]: any = await saveLogToDB(req, client)
    context.log('retLog', retLog)
    await client.close()
    return { body: JSON.stringify({ retLog: { ...retLog }, err: err }) };
};

app.http('saveLog', {
    methods: ['PUT', 'POST'],
    authLevel: 'anonymous',
    handler: saveLog
});
