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

  usersRouter.get('/students_by_project/:id', async (req, res) => {
    try{
        const {id} = req.params

        const get_project_students = await pool.query(`SELECT *
        FROM student WHERE proj_id = $1;`, [id]);
        res.json(get_project_students.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_project_students"')
    }
  });
    //INSERT INTO project (title) VALUES ('a') RETURNING *;
    usersRouter.post("/add_project/:project", async(req, res) => {
        try{
            // console.log('hit in add_project')
            // console.log(req.params)
            const {project} = req.params;
            const new_project = await pool.query(`

            INSERT INTO project (title, term_id) VALUES ($1, get_current_term()) RETURNING *;`,[project]);
            console.log(new_project.rows)
            res.json(new_project.rows);
        }
        catch(err ){
            console.error('error has occurred in backend function "new_project"');
        }
    });

    usersRouter.post("/add_student", async(req, res) => {
        try{
            // console.log('hit in add_student')
            // console.log(req.body)
            const {degree, f_name, l_name, proj_id} = req.body;
            const new_project = await pool.query(`
            INSERT INTO student (degree,
                f_name,
                l_name,
                proj_id)
                VALUES ($1, $2, $3, $4) RETURNING *;`,
                [degree, f_name, l_name, proj_id]);
            console.log(new_project.rows)
            res.json(new_project.rows);
        }
        catch(err ){
            console.error('error has occurred in backend function "add_student"');
        }
    });

    usersRouter.post("/add_assessments/:id", async(req, res) => {
        try{
            console.log('hit in add_assessments')
            console.log(req.body)
            const {student_id, degree, f_name, l_name, proj_id} = req.body;
            console.log(student_id)
            const new_project = await pool.query(`
            SELECT addAssessments($1)`, [student_id]);
            console.log('got this far')
            console.log(new_project.rows)
            res.json(new_project.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "add_assessments"');
        }
    });

    usersRouter.delete("/delete_project/:project", async(req, res) => {
        try{
            const {project} = req.params;
            const delete_project= await pool.query(`DELETE FROM project WHERE title = $1`,
            [project]);
            res.json(delete_project);
        }
        catch(err ){
            console.error("error has occured in backend function 'delete_project'");
        }
    });

    usersRouter.delete("/delete_student/:student", async(req, res) => {
        try{
            const {student} = req.params;
            const delete_student= await pool.query(`DELETE FROM student WHERE student_id = $1`,
            [student]);
            res.json(delete_student);
        }
        catch(err ){
            console.error("error has occured in backend function 'delete_student'");
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