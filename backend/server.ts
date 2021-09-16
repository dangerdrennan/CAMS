import express from 'express';
import bodyParser from 'express';
const app = express();
import routes from './routes';
import cors from 'cors';



app.use(cors({origin: 'http://localhost:4200'}))



app.listen(4201, "localhost", function(){
    console.log('Server now listening on 4201');
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes);
