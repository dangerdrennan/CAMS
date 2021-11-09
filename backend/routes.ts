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
  usersRouter.get('/all_graders', async (req, res) => {
    try{
        const get_profs = await pool.query('SELECT * FROM prof WHERE is_grader = true');
        res.status(200).json(get_profs.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "all_graders"')
    }
  });

  usersRouter.get('/get_prof/:prof_email', async (req, res) => {
    try{
        const {prof_email} = req.params
        // console.log("email ", prof_email)
        const get_prof = await pool.query(`SELECT * FROM prof WHERE prof_email = $1;`, [prof_email]);
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

  usersRouter.get('/current_proj', async (req, res) => {
    try{
        const get_proj = await pool.query(`select * from project INNER JOIN get_current_term() ON project.term_id = get_current_term`);
        res.json(get_proj.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "current_proj"')
    }
  });

  //test to pass array in req body
  usersRouter.post('/pass_array_test', async (req, res) => {
    try{
        const {cats} = req.body
        const pass_array_test = await pool.query(`select my_method()`);
        res.json(pass_array_test.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "current_proj"')
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
        SELECT semester, year from term where term_id = get_current_term() LIMIT 1`);
        res.json(get_current_term.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_current_term"')
    }
  });

  usersRouter.get('/get_suboutcome_grade/:ass_id/:score_id', async (req, res) => {
    try{
        const {ass_id, score_id} = req.params
        const get_current_term = await pool.query(`
        SELECT get_grade($1,$2)`, [ass_id,score_id]);
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
            // console.log('hit backend')
            const {prof_email, f_name, l_name, department} = req.body;
            // console.log(req.body)
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
            console.log(make_grader.rows)
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
                proj_id,
                term_id)
                VALUES ($1, $2, $3, $4, get_current_term()) RETURNING *;`,
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
            console.log(new_assessments.rows)
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "new_assessments"');
        }
    });


    usersRouter.post("/record_scores/:id", async(req, res) => {
        try{
            const {id} = req.params
            const {score_id, grade} = req.body;
            console.log('what are the variables at? ', score_id, grade, id)
            const new_assessments = await pool.query(`
            select set_grade($1, $2, $3)`, [score_id, grade, id]);
            res.json(new_assessments.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "record_scores"');
        }
    });

    usersRouter.post("/mark_as_graded/:id", async(req, res) => {
        try{
            
            const {id} = req.params;
            console.log('what are the variables at? ', id)
            const mark_as_graded = await pool.query(`
            update assessment set graded = true where assessment_id = $1`, [id]);
            res.json(mark_as_graded.rows);
            console.log(mark_as_graded.rows)
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "mark_as_graded"');
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

  usersRouter.get('/current_assessments_by_prof/:email', async (req, res) => {
    try{
        const {email} = req.params
        const current_assessments_by_prof = await pool.query(`
        SELECT
        p.title,
        s.f_name,
        s.l_name,
        t.semester,
        t.year,
        a.graded,
        a.assessment_id,
        a.degree
        FROM
            prof pr
        INNER JOIN assessment a 
            ON pr.prof_email = a.prof_email
        INNER JOIN student s 
            ON s.student_id = a.student_id
        INNER JOIN project p
            ON s.proj_id = p.proj_id
        INNER JOIN term t
            ON t.term_id = a.term_id
        WHERE
            pr.prof_email = $1 and p.term_id = get_current_term()`,
        [email]);
        res.json(current_assessments_by_prof.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "current_assessments_by_prof"')
    }
  });

  usersRouter.get('/current_outcome_reqs', async (req, res) => {
    try{
        const current_outcome_reqs = await pool.query(`
        SELECT outcome_cats_cs, outcome_cats_cse, suboutcomes_cs, suboutcomes_cse FROM sem_req WHERE term_id = get_current_term();`);
        res.json(current_outcome_reqs.rows[0]);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "current_outcome_reqs"')
    }
  });

  usersRouter.get('/past_outcome_reqs/:sem/:year', async (req, res) => {
    try{
        const {sem, year} = req.params
        console.log('/past_outcome_reqs/:sem/:year ', sem, year)
        const past_outcome_reqs = await pool.query(`
        SELECT outcome_cats_cs, outcome_cats_cse, suboutcomes_cs, suboutcomes_cse FROM sem_req INNER JOIN get_term_id($1,$2) ON sem_req.term_id = get_term_id`,
        [sem,year]);
        //SELECT * from sem_req INNER JOIN get_term_id('Fall', 2021) ON sem_req.term_id = get_term_id;
        res.json(past_outcome_reqs.rows[0]);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "past_outcome_reqs"')
    }
  });

  usersRouter.get('/get_cs_outcome_desc/:degree/:ids', async (req, res) => {
    try{
        const {degree, ids} = req.params
        console.log(ids)
        if (degree == 'CS'){
            let query = `
            SELECT cs_cat_id AS cat_id, outcome_description FROM outcome_details_cs WHERE cs_cat_id in (${ids})`
            console.log('this query is at ', query)

            const get_cs_outcome_desc = await pool.query(`${query};`);
            res.json(get_cs_outcome_desc.rows);
        }
        else {
            let query = `
            SELECT cse_cat_id AS cat_id, outcome_description FROM outcome_details_cse WHERE cse_cat_id in (${ids})`
            console.log('this query is at ', query)

            const get_cs_outcome_desc = await pool.query(`${query};`);
            res.json(get_cs_outcome_desc.rows);
        }
        }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_cs_outcome_desc"')
    }
  });

  usersRouter.get('/get_cse_outcome_desc/:ids', async (req, res) => {
    try{
        const {ids} = req.params
        console.log(ids)
        // const num_array = ids.array.forEach(element => {
            
        // });
        let query = `
        SELECT * FROM outcome_details_cse WHERE cse_cat_id in (${ids})`
        console.log('this query is at ', query)

        const get_cse_outcome_desc = await pool.query(`${query};`);
        res.json(get_cse_outcome_desc.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_cse_outcome_desc"')
    }
  });

  //get_cs_suboutcomes

  usersRouter.get('/get_suboutcomes/:degree/:outcome_name', async (req, res) => {
    try{
        const {degree, outcome_name} = req.params
        if (degree == 'CS'){
            console.log('outcome name is ', outcome_name)
            const get_suboutcomes = await pool.query(`
            SELECT 
            score_id,
            outcome_cat_id,
            suboutcome_description,
            poor_description,
            developing_description,
            satisfactory_description,
            excellent_description
            FROM suboutcome_details_cs WHERE outcome_cat_id = $1;`, [outcome_name]);
            res.json(get_suboutcomes.rows);}
        else {
            console.log('outcome name is ', outcome_name)
            const get_suboutcomes = await pool.query(`
            SELECT 
            score_id,
            outcome_cat_id,
            suboutcome_description,
            poor_description,
            developing_description,
            satisfactory_description,
            excellent_description
            FROM suboutcome_details_cse WHERE outcome_cat_id = $1;`, [outcome_name]);
            res.json(get_suboutcomes.rows);
        }
        //console.log(get_cs_suboutcomes.rows)
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_suboutcomes"')
    }
  });



  export default usersRouter;