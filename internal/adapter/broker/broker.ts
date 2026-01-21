import amqp from 'amqplib'

export class BrokerConnection {
  private connection!: amqp.ChannelModel
  private channel!: amqp.Channel

  async connect(): Promise<amqp.Channel> {
    this.connection = await amqp.connect('amqp://localhost')
    this.channel = await this.connection.createConfirmChannel()
    return this.channel
  }

  async close(): Promise<void> {
    await this.channel.close()
    await this.connection.close()
  }
}
