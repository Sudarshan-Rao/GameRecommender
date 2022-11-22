npm --init
npm i nodemon --save-dev  
npm i express
npm i typescript ts-node @types/node prisma --save-dev 
Add config to tsconfig.json
```
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```
npx prisma init   
npm i @prisma/client
This will migrate the DB over to use our schema and then generate the new client for us. This client will be used in our code and is now type-checked against our schema.
npx prisma migrate dev --name init

npm i jsonwebtoken bcrypt dotenv

npx prisma studio

npm i express-validator

npm i lodash.merge

npm i supertest @types/supertest jest @types/jest ts-jest

npx ts-jest config:init