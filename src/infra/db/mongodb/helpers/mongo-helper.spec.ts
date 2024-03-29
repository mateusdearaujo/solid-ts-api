import { MongoHelper as sut } from './mongo-helper'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should reconnect if mongodb is down', async () => {
    let accountsCollection = await sut.getCollection('accounts')
    expect(accountsCollection).toBeTruthy()

    await sut.disconnect()

    accountsCollection = await sut.getCollection('accounts')
    expect(accountsCollection).toBeTruthy()
  })
})
