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
        const get_profs = await pool.query('SELECT * FROM prof');
        res.status(200).json(get_profs.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "all_profs"')
    }
  });

  usersRouter.get('/get_prof/:prof_email', async (req, res) => {
    try{
        const prof_email = req.params.prof_email
        const get_prof = await pool.query("SELECT * FROM prof WHERE prof_email = $1", [prof_email]);
        res.json(get_prof.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "get_prof"')
    }
    });

  usersRouter.get('/all_cs_as', async (req, res) => {
    try{
        const get_cs_assessments = await pool.query(`SELECT *
        FROM cs_assessment;`);
        res.json(get_cs_assessments.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "get_cs_assessments"')
    }
  });

  usersRouter.get('/all_projects', async (req, res) => {
    try{
        const get_proj = await pool.query(`SELECT *
        FROM project;`);
        res.json(get_proj.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "get_projects"')
    }
  });

  usersRouter.get('/all_cse_as', async (req, res) => {
    try{
        const get_cse_assessments = await pool.query(`SELECT *
        FROM cse_assessment;`);
        res.json(get_cse_assessments.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "get_cse_assessments"')
    }
  });

  usersRouter.get('/all_cs_students', async (req, res) => {
    try{
        const get_cs_students = await pool.query(`SELECT *
        FROM cs_student;`);
        res.json(get_cs_students.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "get_cs_students"')
    }
  });

  usersRouter.get('/all_cse_students', async (req, res) => {
    try{
        const get_cse_students = await pool.query(`SELECT *
        FROM cse_student;`);
        res.json(get_cse_students.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "get_cse_students"')
    }
  });




  export default usersRouter;