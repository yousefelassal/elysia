import { Elysia } from "elysia";
import { cron } from '@elysiajs/cron'

const app = new Elysia();


app.get("/", () => "Hello Elysia")

app.use(
  cron({
      name: 'heartbeat',
      pattern: '*/10 * * * * *',
      run() {
          console.log('Heartbeat')
      }
  })
)

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
