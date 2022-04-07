import { S3Event } from 'aws-lambda';
import { S3 } from 'aws-sdk';

export const lambdaHandler = async (event: S3Event): Promise<void> => {
    const { object, bucket } = event.Records[0].s3;
    const srcKey = object.key;
    const srcBucket = bucket.name;

    const s3 = new S3();

    try {
        const file = await s3
            .getObject({
                Bucket: srcBucket,
                Key: srcKey,
            })
            .promise();
        console.log(file);
    } catch (error) {
        console.log(error);
    }
};
