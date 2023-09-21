import { Elysia } from "elysia";
import { cron } from '@elysiajs/cron'
import { html } from '@elysiajs/html'

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

app.use(html())
.get(
    '/html',
    () => `
    <html lang="en">
        <head>
            <title>Hello World</title>
        </head>
        <body>
            <h1>Hello World</h1>
        </body>
    </html>  `
)

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
