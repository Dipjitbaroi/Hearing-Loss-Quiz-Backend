# Nestpress boilerplate with Authentication module

## How to use this template using [nestpress cli](https://www.npmjs.com/package/nestpress).

```bash
# create project
npx nestpress@latest init

# create author, blog, category module (by default it will create single module)

# create a author module on src/feature/ directory
npx nestpress@latest module author
# create a blog multi module on src/feature/ directory [-m for multi module]
npx nestpress@latest module blog -m
# create a category module as blog sub module on src/feature/blog directory
npx nestpress@latest module category blog

# for more use of nestpress cli checkout this: https://www.npmjs.com/package/nestpress
```

## How to run

-   make sure you have [docker](https://www.docker.com/products/docker-desktop/) and [pnpm](https://pnpm.io/) install on your system as node package manager
-   run mysql database and redis on docker(you should have docker install on your machine)

    -   run `docker compose up` this will run the database and redis on docker[use git-bash terminal in windows or for mac/linux default terminal is fine]

-   install all dependencies and run the app

    ```bash

    pnpm i
    # rename .env.dev (if available) to .env then update db connection string (DATABASE_URL) and other env variable if needed
    pnpm: db:migrate

    # reload / reopen vscode to restart TS server
    # run the test
    pnpm test
    # run the app
    pnpm dev # Api will run on port 4000
    ```

## Update npm dependencies

```bash
# Updates all dependencies in package.json
pnpm all:update

# run test to check the app is working fine or not
pnpm test
```

## Run/Write test

-   create .env.test file from .env.dev and update values
-   all test file will be in `src/__test__` directory
    -   on each test file we will have `beforeAll()` and `afterAll()` it will clear `db+redis`.
-   run `npm run test` for integration test
-   for testing we are using `vitest, supertest`

## API endpoints and doc

-   BASE url: http://localhost:4000/v1
-   Swagger Doc url: [Not Implemented]
-   in `.doc` folder a postman json file `postman-collection.json` is available import it on your postman
    -   you need add an environment in postman with variable `url=http://localhost:4000`

## Code Snippet on vscode

-   generate a router boilerplate
    -   create a file on a module called user.router.ts
    -   `npr`+`User(this is the module name in PascalCase)`+`tab`
-   generate a controller boilerplate
    -   create a file on a module called user.controller.ts
    -   `npc`+`User(this is the module name in PascalCase)`+`tab`

## How to push code

-   setup husky Git hooks `npx husky install` it will generate a husky.sh file in `.husky/_` folder
-   create new branch `git checkout -b feature-branch`
-   add files `git add .`
-   commit files `git commit -m 'message'` [here husky wil check the linting, it will throw error and stop commit if there is any linting error, it will ignore warning]
-   push code `git push origin feature-branch`
-   always create Pull Request on `dev` branch

## Developer guide (code style)

-   **Set up vscode**
    -   Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension on vscode, then select default formatter to prettier instead of none
    -   Install [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension
    -   Install [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) extension
-   **Folder Structure**

    -   All folder name must be singular, e.g. `/login` not `/logins`
    -   Each feature will have a module folder inside `feature` folder

        -   we might have 2 types of module - 1. singular 2. multi-module
        -   e.g. singular (**user module** check `src/feature/user`)
            -   `user module` folder structure
            -   `src/feature/user`
                -   `-> dto/create-user.dto.ts`
                -   `-> interface/user.interface.ts`
                -   `-> user.controller.ts`
                -   `-> user.router.ts`
                -   `-> user.service.ts`
        -   e.g. multi-module (**auth module** check `src/feature/auth`)
            -   `auth module` folder structure
            -   `src/feature/auth`
                -   `-> auth.router.ts(this is the main router where all the sub singular module will connect)`
                -   `-> login-register[act as single module]`
                -   `-> logout[act as single module]`
                -   `-> verify-email[act as single module]`

-   **File Name Convention (all lower case,separated by -)**
    -   All file name must be singular, e.g. `user.router.ts` not `users.router.ts`
    -   Some other file names
        -   app.router.ts | my-app.router.ts
        -   app.controller.ts | my-app.controller.ts
        -   app.service.ts | my-app.service.ts
        -   create-user.dto.ts
        -   logged-in-user.interface.ts
        -   anything.something.ts
-   **Class, interface and Function name convention**
    -   Class: `class MyClass{}` (mostly we will use functional programming, so try to ignore class)
    -   Interface: `interface IMyInterface{}` should start with capital `I`
    -   Function: `function myFunction(){}` should be in camelCase
    -   Variable name: `const aName=""` should be in camelCase
    -   Object name: `const UserService={}` should be in PascalCase
    -   Router Name: `const UserRouter = Router()`
    -   Controller Name: `const UserController = {}`
    -   DTO Name: `const CreateUserDto = z.object({})`
-   **Import/Export Module**

    -   on app.ts and for all \*.router.ts file use default export
    -   for all other case always use named export avoid using default export
        -   e.g. for controller, service, dto, interface always go with named export

