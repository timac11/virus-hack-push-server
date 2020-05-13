import * as Router from 'koa-router'
import NodeDatabase from '../../database/NodeDatabase'
import { User } from '../../database/entities/user.entity'
import koaBody = require('koa-body')
import { Subscription } from '../../database/entities/subscription.entity'

export class BaseController {
  public readonly db: NodeDatabase

  constructor (db: NodeDatabase) {
    this.db = db
  }

  public router (): Router {
    const router = new Router()
    const namespace = `/api`

    router.post('postUser',`${namespace}/user`, koaBody(), this.postUser.bind(this))
    router.post('postSubscription',`${namespace}/subscription`, koaBody(), this.postSubscription.bind(this))
    router.delete('deleteSubscription', `${namespace}/delete-subscription/:id`, this.deleteSubscription.bind(this))
    router.delete('deleteAllSubscriptions', `${namespace}/delete-subscriptions`, this.deleteAllSubscriptions.bind(this))

    return router
  }

  setCorsHeaders (ctx: Router.IRouterContext) {
    ctx.response.set('Access-Control-Allow-Origin', '*')
    ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS')
    ctx.response.status = 200
  }

  async deleteSubscription (ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx)
    const id: string = ctx.params.id
    await this.db.service.subscriptionRepository.delete({ id })
    ctx.status = 200
  }

  async postSubscription (ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx)
    const subscription: Subscription = ctx.request.body.subscription
    const tokenId: string = ctx.request.body.tokenId
    const foundSubscription: Subscription | undefined = await this
      .db
      .service
      .subscriptionRepository
      .findOne({
        where: {
          title: subscription.title,
          description: subscription.description,
          period: subscription.period
        }})
    if (foundSubscription) {
      ctx.response.body = {
        subscription: foundSubscription
      }
    } else {
      let user: User | undefined = await this.db.service.userRepository.findOne({ where: { tokenId } })
      if (!user) {
        user = await this.db.service.userRepository.save({ tokenId })
      }
      subscription.user = user
      const savedSubscription = await this.db.service.subscriptionRepository.save(subscription)
      ctx.response.body = {
        subscription: savedSubscription
      }
    }
  }

  async deleteAllSubscriptions (ctx: Router.IRouterContext) {
    await this.db.service.subscriptionRepository.clear();
    ctx.response.status = 200;
  }

  async postUser (ctx: Router.IRouterContext) {
    this.setCorsHeaders(ctx)
    const user: User = ctx.request.body
    const foundUser: User | undefined = await this.db.service.userRepository.findOne({ tokenId: user.tokenId })
    if (foundUser) {
      ctx.response.body = {
        user: foundUser
      }
    } else {
      const savedUser = await this.db.service.userRepository.save(user)
      ctx.response.body = {
        user: savedUser
      }
    }
  }
}
