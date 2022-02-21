# Auth0 React - Pokemon 

The purpose of this challenge is to evaluate your knowledge and skills in fullstack web development role at Now Circular.

Goal
Create a new repo in any public Git you like (Github/Gitlab/Bitbucket), as long as you can share it with us.
Create SPA with (React.js / Vue.js) for a simple listing page
Utilize flexbox as much as possible
Create an API endpoint in Node.js
Criteria
Create SPA Progressive Web Application:

Simple login screen via freeTier of Auth0/Okta/Firebase
Authenticated page with:
Button to go and fetch a random Pokemon from your API (next step)
Display the name, image, and key stats of the Pokemon
Create a simple API call based on role of the user

Create user in the chosen auth package
Create a logged-in only API that will fetch from https://pokeapi.co/ :
A specified Pokemon
A random Pokemon
Note: The front-end app should call your API, not the pokeapi directly.

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

## Configuration

### Create an API

For the ["call an API"](https://auth0.com/docs/quickstart/spa/react/02-calling-an-api) page to work, you will need to [create an API](https://auth0.com/docs/apis) using the [management dashboard](https://manage.auth0.com/#/apis). This will give you an API identifier that you can use in the `audience` configuration field below.

If you do not wish to use an API or observe the API call working, you should not specify the `audience` value in the next step. Otherwise, you will receive a "Service not found" error when trying to authenticate.

### Configure credentials

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this, first copy `src/auth_config.json.example` into a new file in the same folder called `src/auth_config.json`, and replace the values with your own Auth0 application credentials, and optionally the base URLs of your application and API:

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}",
  "audience": "{YOUR AUTH0 API_IDENTIFIER}",
  "appOrigin": "{OPTIONAL: THE BASE URL OF YOUR APPLICATION (default: http://localhost:3000)}",
  "apiOrigin": "{OPTIONAL: THE BASE URL OF YOUR API (default: http://localhost:3001)}"
}
```

**Note**: Do not specify a value for `audience` here if you do not wish to use the API part of the sample.

## Run the sample

### Compile and hot-reload for development

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run dev
```

## Deployment

### Compiles and minifies for production

```bash
npm run build
```

### Docker build

To build and run the Docker image, run `exec.sh`, or `exec.ps1` on Windows.

### Run your tests

```bash
npm run test
```


