# React and NestJS E-commerce Starter

A full stack web application for a typical e-commerce use case scenario built with React, NestJS and TypeScript.

Although built as a demonstrantion project, it is hoped that it can be of use to anybody seeking to quickly prototype a custom e-commerce solution.

React TypeScript best practices are applied as recommended by [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react).

🚧 Work In Progress: See Projects for details. 🚧

## Before Starting

Either configure environment variables with Docker or add an `.env` file to the `server` directory.

Then specify the following:

- `DEV_DB`: a MongoDB local connection string. If using Docker make sure it has this local pattern, where `mongo` refers to the name used by the compose file:

  ```
  mongodb://mongo:27017/collection-name
  ```

  _Using MongoDB Atlas is possible, but is beyond the scope of this Readme. However, please note that if Atlas is used, the Docker compose file will need to be modified to remove the `mongo` image._

- `JWT_SECRET`: any random string for development (for production see the [NestJS docs](https://docs.nestjs.com/security/authentication))

## Getting Started with Development using Docker

For the first time run with the `--build` flag:

```
docker-compose up --build
```

Then subsequent starts should be run with:

```
docker-compose up
```

To end the development session run:

```
docker-compose down
```

To clear out any volumes add the `-v` or `--volumes` flag:

_Note that this will clear any data stored in the containers or images._

```
docker-compose down --volumes
```

## Getting Started without Docker

If a local MongoDB instance is used, please ensure it running first.

In the directory `server`, start in watch mode by running:

```
npm run start:dev
```

In the directory `client`, start React in development mode by running:

```
npm start
```

# Key Features:

## Custom Contexts

`src/contexts`

### AuthContext

Provides a top level context to handle authenticaion via a back end API and exposes values that can be consumed by child components.

- Register a new user and login
- Login an authenticated user
- Logout
- Modify user data (CRUD operations via back end API)

### CartContext

Provides a top level context to handle shopping cart functionality that exposes values that can be consumed by child components.

- Add an item
- Remove an item
- Checkout all items in cart

## Custom Hooks

`src/hooks`

### useLocalStorage

A hook to set and retrieve local storage items.

## Styles

Uses React-Bootstrap `npm` distribution.
Any additional styling can be found in a component's associated css module file.

Helpful links:

- [CSS Modules with create-react-app](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/).
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://getbootstrap.com/)

## Data Handling

Uses the [Axios](https://github.com/axios/axios) library `npm` distribution to perfrom API requests in the front end.

## Authentication

Implements a local strategy using JSON Web Tokens (JWT) with the Passport library and NestJS integrations.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Built With

- React
- React Router DOM
- React Bootstrap
- Bootstrap npm distribution
- Axios

---

# Getting Started with NestJS

The server was bootstrapped using [NestJS](https://nestjs.com/) CLI:

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

See the [NestJS Starter](https://github.com/nestjs/nest) for additional details.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Built With

- NestJS
- Mongoose
- Passport
- Bcrypt
