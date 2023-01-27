# EverNo <!-- omit in toc -->

## Evernote Black <!-- omit in toc -->
A work in progress tasks management app built using Next.js, Material UI, TypeScript for the frontend & GraphQL, Apollo, URQL, Prisma, PostgreSQL, Prisma ORM for the backend. The goal is to make a similar app as [Evernote](https://evernote.com/) with some custom features whilst showcasing mastery of different technologies.

## Table of contents <!-- omit in toc -->
- [Technology Stack](#technology-stack)
- [Getting started](#getting-started)
  - [Installation, build and dev server](#installation-build-and-dev-server)
- [Monorepo Layout](#monorepo-layout)
  - [`/pages`](#pages)
  - [`/components`](#components)
  - [`/lib`](#lib)
  - [`/prisma`](prisma)
  - [`/pages/api`](#api)
- [Vendors](#vendors)
  - [Github](#github)
  - [Auth0](#auth0)

# Technology Stack

Evernote Black is built with the following stack.
|Role|Technology|
|-|-|
|Language|[Typescript]()|
|Frontend|[Next.js](https://nextjs.org)|
|Components|[Material-UI](https://material-ui.com/)|
|Authenticaton|[Auth0](https://auth0.com)| 
| Hosting | [VERCEL](https://vercel.com) |
|API/Data|[GraphQL](https://graphql.org/), [Apollo](https://www.apollographql.com/) (server & client), [URQL](https://formidable.com/open-source/urql/) (client), [Pothos GraphQL](https://pothos-graphql.dev/), [Prisma Pothos](https://pothos-graphql.dev/docs/plugins/prisma) |
|Database|[PostgreSQL](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/)|

# Getting started

## Installation, build and dev server

The app currently uses [Yarn 3](https://yarnpkg.com) with workspaces to manage it's monorepo dependencies. Get started by running the following from the root folder: 

```
yarn
```

After that, you will need to build various parts of the application:
```
yarn build
```

Finally, start the Next.js server with:

```
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)


# Monorepo Layout

The app's codebase is in the process of being laid out in a [monorepo](https://en.wikipedia.org/wiki/Monorepo).

## `/pages`

This is the main [Next.js](https://nextjs.org) application. It is the primary glue between our component library and Next.js. It is also the entrypoint for serving the application.

## `/components`

The React components used to build our application. Evernote Black uses [Component Driven Develompment](https://www.componentdriven.org/) to build the application from the "bottom up" using smaller components incorporated into larger components. While not complete, some effort has been made to migrate the application to use [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) principals. Smaller components use [Material-UI](https://material-ui.com/) to build larger functional pieces. 

## `/lib`

Pure Javascript/Typescript functions meant to encapsulate our business logic into small, testable functions.

## `/prisma`

Currently a combination of our [Prisma](https://www.prisma.io/) schema, the output from [TypeGraphQLPrisma](https://prisma.typegraphql.com), and our GraphQL queries, mutations, and fragments.

## `api`

The Apollo GraphQL server used to serve both generated and custom resolvers. The API layer starts with [GraphQL](https://graphql.org/) and the [Apollo GraphQL](https://www.apollographql.com/) client/server library. On the backend, the GraphQL resolvers use [Prisma](https://www.prisma.io/) as an ORM for interactions with the database as well as database migrations. We use the [Pothos](https://pothos-graphql.dev/) integration to autogenerate types, which can be import after running `yarn generate`.

## Github

We use [Github](https://github.com) for a code repository

## Auth0

We use [Auth0](https://auth0.com/) for managing our authentication layer. It provides "authentication as a service" and a library for integrating with Next.js. Note that we use two different "tenants": one for production and one for demo & local.

## Husky

We use [Husky](https://typicode.github.io/husky/#/) for running tests before pushing to GitHub.
