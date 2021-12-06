const path = require('path');
const express = require('express')
const routes = require('./routes.ts')
const cors = require('cors')
const app = express();

app.use(cors({origin: 'https://hungry-mestorf-524598.netlify.app'}))



express()
  .use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use('/', routes);
app.listen(process.env.PORT, function(){
    console.log('Server now listening');
})