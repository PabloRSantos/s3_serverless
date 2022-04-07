import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const s3 = new S3();

    try {
        const fileKey = event.pathParameters?.fileKey;

        if (!fileKey) {
            throw new Error();
        }

        const url = s3.getSignedUrl('getObject', {
            Bucket: process.env.S3_BUCKET,
            Key: fileKey,
            Expires: 60,
        });

        return {
            body: JSON.stringify({ url }),
            statusCode: 201,
        };
    } catch (error) {
        console.log(error);
        return {
            body: JSON.stringify({ message: 'Erro ao gerar url' }),
            statusCode: 500,
        };
    }
};
