import { S3 } from "aws-sdk";

export const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION as string,
    endpoint: process.env.AWS_BUCKET_URL as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
})
