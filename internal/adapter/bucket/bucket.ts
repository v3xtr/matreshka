import { S3 } from '@aws-sdk/client-s3'

export const s3 = new S3({
    region: "ru-central-1",
    endpoint: process.env.AWS_BUCKET_URL as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    }
})
