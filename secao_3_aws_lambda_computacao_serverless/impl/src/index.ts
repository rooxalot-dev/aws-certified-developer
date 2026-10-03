import { Context } from 'aws-lambda';
import process from 'process';

export const handler = async (event: any, context: Context) => {
    const env = process.env.NODE_ENV || 'dev';

    const remainingTime = context.getRemainingTimeInMillis();
    const functionName = context.functionName;
    const requestId = context.awsRequestId;

    console.log(`[${env}] Invocando função: ${functionName}`);
    console.log(`Request ID: ${requestId}`);
    console.log(`Tempo restante: ${remainingTime}ms`);
    console.log(`Evento recebido: ${JSON.stringify(event)}`);

    const action = event.action || 'greet';
    const name = event.name || 'Mundo';
    let message: string;

    switch (action) {
        case 'greet':
            message = `Olá, ${name}! Ambiente: ${env}`;
            break;
        case 'echo':
            message = `Echo: ${JSON.stringify(event)}`;
            break;
        default:
            message = `Ação desconhecida: ${action}`;
            break;
    }

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify(
            {
                "message": message,
                "requestId": requestId,
                "remainingTime": remainingTime,
            }
        ),
    }
};
