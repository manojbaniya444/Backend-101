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
