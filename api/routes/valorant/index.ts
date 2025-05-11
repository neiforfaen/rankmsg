import { Hono } from 'hono'
import rankRouter from './rank'
import recordRouter from './record'

const valorantRouter = new Hono()

valorantRouter.route('/rank', rankRouter)
valorantRouter.route('/record', recordRouter)

export default valorantRouter
