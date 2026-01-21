import { S3 } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";

export const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION as string,
    endpoint: process.env.AWS_BUCKET_URL as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    requestHandler: new NodeHttpHandler({
        connectionTimeout: 10000,
        requestTimeout: 30000
    })
})
