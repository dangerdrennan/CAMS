const path = require('path');
const express = require('express')
const routes = require('./routes.ts')
const cors = require('cors')
const app = express();
const env2 = require("../frontend/cams/src/environments/environment").environment;

console.log('is this reading as production? ', process.env.PROD_BOOLEAN)
if (process.env.PROD_BOOLEAN){
  app.use(cors({origin: 'https://capstone-assessments.netlify.app'}))
  express()
  .use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use('/', routes);
app.listen(process.env.PORT, function(){
    console.log('Server now listening');
})
}
else
{
  app.use(cors({origin: 'http://localhost:4200'}))
  app.use(express.json());
app.use('/', routes);
app.listen(4201, "localhost", function(){
    console.log('Server now listening on 4201');
})



}