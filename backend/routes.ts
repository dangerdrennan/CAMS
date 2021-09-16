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

usersRouter.get('/login', async (req, res) => {
    try{
        //const {email, password} = req.body
        const confirm_user = await pool.query(
            `SELECT * FROM prof WHERE email = 'rowling@potter.co.uk'`);
        res.json(confirm_user.rows)




        //* Not sure if I've give up on this code or not *//


        // const prof_id = search_for_user.rows[0].prof_id
        // const email = search_for_user.rows[0].email
        // const f_name = search_for_user.rows[0].f_name
        // const l_name = search_for_user.rows[0].l_name
        // const department = search_for_user.rows[0].department
        // const is_admin = search_for_user.rows[0].is_admin
        // res.json({prof_id, email, f_name, l_name, department, is_admin})
        // prof_id: number,
        // email: string,
        // f_name: string,
        // l_name: string,
        // department: string,
        // is_admin: boolean
        // if (search_for_user.rows.length === 0){
        //     res.send(false)
        // }
        // else{
        //     res.send(true);
        // }
        
    }
    catch(err ){
        console.log('error has occurred in backend function "login"')
    }
  });

  usersRouter.get('/get_prof', async (req, res) => {
    try{
        const {email} = req.body
        console.log(req.body.email)
        const a = await pool.query(`SELECT *
        FROM prof WHERE email = $1;`,[ email]);
        console.log(a.rows)
        res.json(a.rows);
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

//   usersRouter.get('/get_prof', async (req, res) => {
//     try{
//         const {prof} = req.body;
//         const get_prof = await pool.query(`SELECT *
//         FROM prof WHERE prof_id = $1;`);
//         res.json(get_prof.rows);
//     }
//     catch(err ){
//         console.log('error has occurred in backend function "get_prof"')
//     }
//   });

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

  usersRouter.get('/all_proj', async (req, res) => {
    try{
        const get_proj = await pool.query(`SELECT *
        FROM project;`);
        res.json(get_proj.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "get_proj"')
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