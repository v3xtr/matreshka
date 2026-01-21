import amqp from 'amqplib'

export class RabbitConnection{
    private connection!: amqp.ChannelModel
    private channel!: amqp.Channel

    async connect(): Promise<amqp.Channel>{
        this.connection = await amqp.connect(process.env.RABBIT_URL as string)
        this.channel = await this.connection.createConfirmChannel()
        return this.channel
    }

    async close(): Promise<void>{
        await this.channel.close()
        await this.connection.close()
    }
}
