## Drizzle ORM

lightweight and performant ts ORM.

## Database Connection

- `/src/db/index.ts` - db connection

- 1. Install package

```
npm i drizzle-orm
npm i pg
npm i --save-dev drizzle-kit @types/pg
```

- 2. Initialize the driver and make a query

```javascript
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const result = await db.execute("select 1");
```

We can use `pg` package to manage pool which allow the application to resue database connection which improve efficiency and performance when handling multiple request.

```javascript
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

const result = await db.execute("select 1");
```

## Create a table in schema.ts

create a `schema.ts` file in `src/db` folder and declare table

[Schema table](./src/db/schema.ts)

## Setup drizzle config file

a config file which contain all information about database connection, migration folder and schema file.

create `drizzle.config.ts` file in the root of project.

[Drizzle configuration](./src/drizzle.config.ts)

## Apply changes to the database

- Direct: push command
`npx drizzle-kit push`: no need to manage migration file

`npx drizzle-kit generate`: generate migration and then apply using `npx drizzle-kit migrate`.

## Seed and Query the database
update index.ts file with queries to create read and update users.

[seed and query database](./src/playground.ts)