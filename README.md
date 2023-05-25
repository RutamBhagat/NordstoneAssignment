This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

clone the repository locally

cd into the repository

```bash
pnpm i
```

create a .env file in the root of the project

paste your database url in the .env file for Ex.

DATABASE_URL="postgres://postgres:[password].[dbstring]:[port]/postgres"

paste your JWT secret in the .env file, this can be any random string you want for Ex.

JWT_SECRET="WyvV7oKWPLkfPWWj0qk9vnlu7"

```bash
pnpx prisma generate && pnpx prisma migrate dev
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# NordstoneAssignment
