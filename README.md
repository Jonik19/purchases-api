# Purchases API

## Running the project

1. `npm install`. It installs all project's dependencies
2. Set up MySQL database and type correct database connection settings in `config/env/development.js`
3. `npm start`. It runs the project using local nodemon.
4. Go to http://localhost:8080 and see result.

## Authentication

### Sign Up
To sign up make http post request to '/sign-up' passing such parameters at body
```
{
  "username": "YourUsername",
  "name": "YourName",
  "password": "YourPassword123"
}
```

If you pass correct data you will get response of user and token
otherwise you will get ValidationError or any other error.

### Sign In
To sign in make http post request to '/sign-in' passing such parameters at body
```
{
  "username": "YourUsername",
  "password": "YourPassword123"
}
```

If you pass correct data you will get response of user and token
otherwise you will get IncorrectData error or any other error.

### Check
To check user authentication by token you need send request to '/check' with token in `Authorization` header
```
{
  "Authorization": "Bearer {your token}"
}
```

If user is authenticated and token is not expired you will get response consisted of user and token.
Now you are able to update your local token and user. Otherwise you will get UnAuthorizedError with 401 status.

#### Sign Out
To sign out you need to destroy token on your client side.

## Environment

### Change environment

To change environment change NODE_ENV variable in `package.json start script`.

### Add environment

To add new environment add new file to `./config/env/{env}.js` and add exporting newly created
environment to `./config/index.js` - it's same to another already existed environments.


## Tests

### Controllers tests

Before running tests change settings for your database in `./config/env/test`.
All controllers tests are located in ./app/tests/controllers.

#### Adding new test

To add new test create file {name}_spec.js in './app/tests/controllers' folder
and `require` it in './app/tests/controllers/index.js' file in `tests` array.

#### Run

`npm run test-controller`

### Unit tests

#### Adding new test

To add new test create file {name}_spec.js and place it anywhere except './app/tests/controller' folder.

#### Run

`npm run test-unit`


