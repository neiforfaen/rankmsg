import { Hono } from 'hono'
import rankRouter from './rank'

const valorantRouter = new Hono()

valorantRouter.route('/rank', rankRouter)

export default valorantRouter
