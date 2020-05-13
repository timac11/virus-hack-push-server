import NodeDatabase from './NodeDatabase'
import { SubscriptionRepository } from './repositories/subscription.repository'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from './repositories/user.repository'

export class NodeDatabaseService {
  private readonly db: NodeDatabase
  public readonly userRepository: UserRepository = getCustomRepository(UserRepository)
  public readonly subscriptionRepository: SubscriptionRepository = getCustomRepository(SubscriptionRepository)

  constructor (db: NodeDatabase) {
    this.db = db
  }
}
