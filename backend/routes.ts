import { Router } from "express";
import { Pool } from "pg";
var cors = require('cors')

const usersRouter = Router();

const pool = new Pool({
    user: "cpstuser",
    password:"470capston3",
    database: "cams",
    host: "localhost",
    port: 5432
});


usersRouter.get('/all_profs', async (req, res, next) => {
    console.log(req.body)
 
    try{
        const get_profs = await pool.query(`SELECT * FROM prof`);
     
        res.status(200).json(get_profs.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "all_profs"')
    }
  });
  usersRouter.get('/all_graders', async (req, res) => {
    try{
        const get_profs = await pool.query(`SELECT * FROM prof WHERE is_grader = true`);
        res.status(200).json(get_profs.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "all_graders"')
    }
  });

  usersRouter.get('/get_prof/:prof_email', async (req, res) => {
    try{
        console.log(req.params)
        const prof_email = req.params.prof_email
        const get_prof = await pool.query("SELECT * FROM prof WHERE prof_email = $1", [prof_email]);
        res.json(get_prof.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_prof"')
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

  usersRouter.get('/current_term', async (req, res) => {
    try{
        const get_current_term = await pool.query(`
        SELECT semester, year from term where term_id = get_current_term()`);
        res.json(get_current_term.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_current_term"')
    }
  });
  
    usersRouter.post("/add_project/:project", async(req, res) => {
        try{
            const {project} = req.params;
            const new_project = await pool.query(`

            INSERT INTO project (title, term_id) VALUES ($1, get_current_term()) RETURNING *;`,[project]);
            
            res.json(new_project.rows);
        }
        catch(err ){
            console.error('error has occurred in backend function "new_project"');
        }
    });


    // INSERT INTO prof (prof_email, f_name, l_name, department, is_grader, is_admin) VALUES ('rowling@potter.co.uk', 'test', 'test', 'test', false, true) ON CONFLICT (prof_email) DO UPDATE SET f_name='test', l_name='test', department='test', is_grader= true, is_admin = false;

    usersRouter.post("/add_prof", async(req, res) => {
        try{
            console.log('hit backend')
            const {prof_email, f_name, l_name, department} = req.body;
            console.log(req.body)
            const add_prof = await pool.query(`
            INSERT INTO prof 
            (prof_email, f_name, l_name, department, is_grader, is_admin) 
            VALUES ($1, $2, $3, $4, true, false) 
            ON CONFLICT (prof_email) 
            DO UPDATE SET f_name=$2, l_name=$3, department=$4, is_grader= true, is_admin = false 
            RETURNING *`,
                [prof_email, f_name,l_name,department]);
            res.json(add_prof.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "add_prof"');
        }
    });

    usersRouter.post("/make_admin", async(req, res) => {
        try{
            const {prof_email} = req.body;
            console.log(req.body)
            const make_admin = await pool.query(`
            UPDATE prof SET is_admin = true WHERE prof_email = $1 RETURNING *`,
                [prof_email]);
            res.json(make_admin.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "make_admin"');
        }
    });

    usersRouter.post("/take_away_admin", async(req, res) => {
        try{
            const {prof_email} = req.body;
            console.log(req.body)
            const take_away_admin = await pool.query(`
            UPDATE prof SET is_admin = false WHERE prof_email = $1 RETURNING *`,
                [prof_email]);
            res.json(take_away_admin.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "make_admin"');
        }
    });

    usersRouter.post("/make_grader", async(req, res) => {
        try{
            const {prof_email} = req.body;
            console.log(req.body)
            const make_grader = await pool.query(`
            UPDATE prof SET is_grader = true WHERE prof_email = $1 RETURNING *;`,
                [prof_email]);
            res.json(make_grader.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "make_grader"');
        }
    });

    usersRouter.post("/make_nongrader", async(req, res) => {
        try{
            const {prof_email} = req.body;
            console.log(req.body)
            const make_nongrader = await pool.query(`
            UPDATE prof SET is_grader = false WHERE prof_email = $1 RETURNING *`,
                [prof_email]);
            res.json(make_nongrader.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "make_nongrader"');
        }
    });

    usersRouter.post("/set_capstone_prof", async(req, res) => {
        try{
            const {prof_email} = req.body;
            const set_capstone_prof = await pool.query(`
            SELECT set_cap_prof($1)
            `, [prof_email]);
            res.json(set_capstone_prof.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "set_capstone_prof"');
        }
    });

    usersRouter.post("/update_term", async(req, res) => {
        try{
            const {semester, year} = req.body;
            const update_term = await pool.query(`
            SELECT set_term($1,$2)`,
                [semester, year]);
            res.json(update_term.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "update_term"');
        }
    });

    usersRouter.post("/populate_semester", async(req, res) => {
        try{
            const populate_semester = await pool.query(`
            SELECT populate_semester()`
            )
            res.json(populate_semester.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "populate_semester"');
        }
    });



    usersRouter.post("/add_student", async(req, res) => {
        try{
            const {degree, f_name, l_name, proj_id} = req.body;
            const new_project = await pool.query(`
            INSERT INTO student (degree,
                f_name,
                l_name,
                proj_id)
                VALUES ($1, $2, $3, $4) RETURNING *;`,
                [degree, f_name, l_name, proj_id]);
            res.json(new_project.rows);
        }
        catch(err ){
            console.error('error has occurred in backend function "add_student"');
        }
    });

    usersRouter.post("/add_assessments/:id", async(req, res) => {
        try{
            const {student_id, degree, f_name, l_name, proj_id} = req.body;
            const new_project = await pool.query(`
            SELECT add_assessments_by_student($1)`, [student_id]);
            res.json(new_project.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "new_project"');
        }
    });

    usersRouter.post("/add_assessments_by_prof", async(req, res) => {
        try{
            const {prof_email} = req.body;
            const new_assessments = await pool.query(`
            SELECT add_assessments_by_prof($1)`, [prof_email]);
            res.json(new_assessments.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "new_assessments"');
        }
    });

    usersRouter.delete("/delete_assessments_by_prof/:prof_email", async(req, res) => {
        try{
            const {prof_email} = req.params;
            const deleted_assessments = await pool.query(`
            DELETE FROM assessment WHERE prof_email = $1 AND term_id = get_current_term();`, [prof_email]);
            res.json(deleted_assessments.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "deleted"');
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