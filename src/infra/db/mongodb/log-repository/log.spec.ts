import { Collection } from 'mongodb'

import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('Log Mongo Repository', () => {
  let errorsCollection: Collection

  beforeEach(async () => {
    errorsCollection = await MongoHelper.getCollection('errors')
    await errorsCollection.deleteMany({})
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should create an error log on success', async () => {
    const sut = new LogMongoRepository()

    await sut.logError('any_error')

    const count = await errorsCollection.countDocuments()

    expect(count).toBe(1)
  })
})
