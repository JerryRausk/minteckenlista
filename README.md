# Get started

## Global Requirements
Vercel CLI
node


## Get up and running with front and backend
### Install dependencies
``` bash
npm install
```
### Create .env file
Create a .env file in the solution root, this will be used by prisma
``` env
DATABASE_URL='mysql://USERNAME:PASSWORD@aws.connect.psdb.cloud/minteckenlista?sslaccept=strict'
```

### Start frontend and backend
``` bash
vercel dev
```

### Start frontend only 
``` bash
npm run dev¨
```
