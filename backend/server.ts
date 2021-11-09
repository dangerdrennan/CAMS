import express from 'express'
const app = express();
import routes from './routes';
import cors from 'cors';
// import * as http from 'http'
// import * as https from 'https'
// import * as fs from 'fs'
import path from 'path'

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}))
app.use('/', function(req, res, next) {
  console.log('inside function')
  res.header('Access-Control-Allow-Origin', '*'),
  res.header('Access-Control-Allow-Headers', 'X-Requested-With'),
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'),
  next()
});

// const forceSSL = function() {

//     return (req: any, res: any, next: any) => {
//       console.log("made it")
//         if(req.header['x-forwarded-proto'] !== 'https') {
//           console.log(req.get('Host'))
//             return res.redirect(['https://', req.get('Host'), req.url].join(''))
//         }
//         next()
//     }
// }




// const options = {
//   key: fs.readFileSync('./cert/key.pem', 'utf8'), 
//   cert: fs.readFileSync('./cert/cert.pem', 'utf8')
// }

// app.use((req,res) => {
//   res.send('HTTPS Works!')
// })

// let httpServer = http.createServer(app)
// let httpsServer = https.createServer(options, app)





app.use('/', routes);
// app.use(forceSSL())
app.listen(4201, "localhost", function(){
    console.log('Server now listening on 4201');
}) 

// httpServer.listen(4201, 'localhost', () => {
//     console.log("listening on port 4201")
// })
// httpsServer.listen(4201, () => {
//     console.log("listening on port 4201")
// })