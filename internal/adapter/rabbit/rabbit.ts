import amqplib, { Channel, ChannelModel } from 'amqplib';

const connection: ChannelModel = await amqplib.connect('amqp://chat:chat@localhost:5672');
export const channel: Channel = await connection.createConfirmChannel();
