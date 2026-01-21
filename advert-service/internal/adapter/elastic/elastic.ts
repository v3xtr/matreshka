import { Client } from '@elastic/elasticsearch'

export const esClient = new Client({
    node: process.env.ELASTIC_URL || 'https://localhost:9200'
})
