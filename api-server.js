const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const app = express();
const axios = require('axios');
const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.get("/api/pokemon",checkJwt,async (req,res)=>{
  let pokemonName = req.query.pokemonName
  console.log(pokemonName)
  let data = null
  if(pokemonName!='null'){
    data = await axios.get('https://pokeapi.co/api/v2/pokemon/'+pokemonName)
  }else{
    data = await axios.get('https://pokeapi.co/api/v2/pokemon/'+Math.floor(Math.random() * 600))
  }
  let reduceInfo = {
    name : data.data.name,
    sprites : data.data.sprites,
    stats : data.data.stats
  }
  res.json(reduceInfo)
})
app.listen(port, () => console.log(`API Server listening on port ${port}`));
