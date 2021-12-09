const path = require('path');
const express = require('express')
const routes = require('./routes.ts')
const cors = require('cors')
const app = express();

if (dev.isDevMode()){
  app.use(cors({origin: 'https://capstone-assessments.netlify.app'}))
}

else{
  app.use(cors({origin: 'http://localhost:4200'}))
}


express()
  .use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use('/', routes);
app.listen(process.env.PORT, function(){
    console.log('Server now listening');
})