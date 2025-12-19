import amqplib, { Channel, ChannelModel } from 'amqplib';

const connection: ChannelModel = await amqplib.connect('amqp://localhost');
export const channel: Channel = await connection.createChannel();
