import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { handle } from 'hono/vercel'
import resolveEndpoints from '../utils/endpoints'
import valorantRouter from './routes/valorant'

export const config = {
  runtime: 'edge',
}

const app = new Hono().basePath('/rankmsg')

app.use(prettyJSON())

app.get('/', (c) => c.json(resolveEndpoints(), 200))
app.get('/health', (c) => c.json({ status: 'ok' }, 200))

app.route('/valorant', valorantRouter)

export default handle(app)
