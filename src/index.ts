import { Elysia } from "elysia";
import { cron } from '@elysiajs/cron'
import { html } from '@elysiajs/html'
import { apollo, gql } from '@elysiajs/apollo'

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

app.use(
  apollo({
      typeDefs: gql`
          type Book {
              title: String
              author: String
          }

          type Query {
              books: [Book]
          }
      `,
      resolvers: {
          Query: {
              books: () => {
                  return [
                      {
                          title: 'Elysia',
                          author: 'saltyAom'
                      }
                  ]
              }
          }
      }
  })
)

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
