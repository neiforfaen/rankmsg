import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'

export const config = {
  runtime: 'edge',
}

type Bindings = {
  VAL_API_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api/rankmsg')

app.use(cors())
app.use(prettyJSON())

app.get('/health', (c) => c.json({ status: 'ok' }, 200))

export default handle(app)
