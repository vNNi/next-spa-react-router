# Next as SPA with React Router

Thanks to: https://github.com/colinhacks/nextjs-react-router

## Context

Sometimes building NextJS applications we'll need to use the `next export`, which turn your JSX pages into pure HTML.
But, in most apps, we need dynamic paths, like handled in SSR applications or SPA apps with React Router, for example:

`GET /product/:id`

## Problem

or the above scenario, for NextJS pages route pattern, we need to create the files:

```
|--pages
  |--product
    |--[id].tsx
```

And when run `next build` with `next.config.js` using:

```json
    output: "export",
```

We get:

```
|--out
  |--pages
    |--product
        |--[id].html
```

And cannot access directly from url the product with id `1`:

`http://localhost:3000/product/1`

We receive 404, because the only available (obviously) route is `/product/[id].html`.

And we need some `url rewrite` to get this done, to see more for these solution, read:

> https://colinhacks.com/essays/building-a-spa-with-nextjs


## Solution

To be able to handle request like a pure SPA in Next.JS and handle the `dynamic path` (/product/11234/), this project create a unique page Next.JS project and build them to pure `html`:

```
|--out
  |--pages
    |--index.html
```

And let the React Router do all the job for client side route handle.

All we need is to handle the directly access for these urls, in the CDN (or a web server like Nginx), rewriting the request for custom paths (`/product/1234123`) to the `index.html` to the React Router do the rest, example:

```
    location / {
        try_files /index.html /index.html;
    }
```

## Running the example (With Nginx)

Build Next app:

```bash
pnpm i && pnpm build
```

Build Docker image with nginx:

```bash
docker build --no-cache -t next-react-router .
```

Run the app:

```bash
docker run -p 7070:80 next-react-router
```

## Testing

Now, running the project local, make the first test using the browser router:

1. Access `http://localhost:7070/product/1` and verify if the id of the product from url is in the screen.

Now a test a navigation from SPA:

1. Access `http://localhost:7070/` and click in the `about link`, this should render the `About` title based on React Router.
