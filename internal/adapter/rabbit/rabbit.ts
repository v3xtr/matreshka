import amqplib, { Channel, ChannelModel } from 'amqplib';

const connection: ChannelModel = await amqplib.connect(process.env.RABBIT_URL as string);
export const channel: Channel = await connection.createConfirmChannel();
