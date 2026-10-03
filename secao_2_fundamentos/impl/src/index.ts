import { config } from 'dotenv';
import { S3 } from 'aws-sdk';

config();

var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
var AWS_ACCESS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
var AWS_REGION = process.env.AWS_REGION;

const s3: S3 = new S3({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID || '',
        secretAccessKey: AWS_ACCESS_SECRET_KEY || '',
    },
    region: AWS_REGION,
});

const getBuckets = async () => {
    
    try {
        const { Buckets } = await s3.listBuckets().promise();
        console.log('Buckets - Alto Nivel:', {Buckets});
    } catch (error) {
        console.error('Buckets - Alto Nivel - Erro ao obter buckets:', error);
    }
};

getBuckets();
