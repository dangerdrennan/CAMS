import { Router } from "express";
import { Pool } from "pg";

const usersRouter = Router();

const pool = new Pool({
    user: "cams",
    password: "pswd",
    database: "cams",
    host: "localhost",
    port: 5432
});

usersRouter.get('/all_profs', async (req, res) => {
    try{
        const get_profs = await pool.query(`SELECT *
        FROM prof;`);
        res.json(get_profs.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "all_profs"')
    }
  });

  usersRouter.get('/get_prof', async (req, res) => {
    try{
        const {prof} = req.body;
        const get_prof = await pool.query(`SELECT *
        FROM prof WHERE prof_id = $1;`);
        res.json(get_prof.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "get_prof"')
    }
  });

  usersRouter.get('/all_profs', async (req, res) => {
    try{
        const get_profs = await pool.query(`SELECT *
        FROM prof;`);
        res.json(get_profs.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "all_profs"')
    }
  });

  export default usersRouter;