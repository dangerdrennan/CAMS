const Router = require("express");
const {Pool} = require("pg");
const env = require("../frontend/cams/src/environments/environment").environment;

// collects all our routes and delivers them to our server
const usersRouter = Router();

// populates pool based on whether or not we're in development mode
const pool = determineDev()

// returns a Pool object determined by if are in development or
// production mode
function determineDev(){
    if (!process.env.PROD_BOOLEAN){
        return new Pool({
            user: "cams",
            password: "pswd",
            database: "cams",
            host: "localhost",
            port: 5432
        });
    }
    return new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false
            }
          });
}

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
        const get_prof = await pool.query(`SELECT * FROM prof WHERE prof_email = $1;`, [prof_email]);
        res.json(get_prof.rows);
    }
    catch(err ){
        console.log('error has occurred in backend function "get_prof"')
    }
    });

  usersRouter.get('/all_proj', async (req, res) => {
    try{
        const get_proj = await pool.query(`SELECT * FROM project;`);
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

  usersRouter.get('/students_by_project/:id', async (req, res) => {
    try{
        const {id} = req.params

        const get_project_students = await pool.query(`SELECT * FROM student WHERE proj_id = $1;`, [id]);
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
        const get_suboutcome_grade = await pool.query(`SELECT get_grade($1,$2)`, [ass_id,score_id]);
        res.json(get_suboutcome_grade.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_suboutcome_grade"')
    }
  });

  usersRouter.get('/outcome_trends/:sem/:year/:degree', async (req, res) => {
    try{
        const {sem, year, degree} = req.params
        const outcome_trends = await pool.query(`
        SELECT * from get_outcome_percents($1,$2,$3)`, [sem,year,degree]);
        console.log(outcome_trends.rows);
        res.json(outcome_trends.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "outcome_trends"')
    }
  });

  usersRouter.get('/show_comments/:sem/:year/:degree', async (req, res) => {
    try{
        const {sem, year, degree} = req.params
        const show_comments = await pool.query(`
        SELECT * from get_comments($1,$2,$3)`, [sem,year,degree]);
        console.log(show_comments.rows);
        res.json(show_comments.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "show_comments"')
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

    usersRouter.post("/add_prof", async(req, res) => {
        try{
            const {prof_email, f_name, l_name, department} = req.body;
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

    usersRouter.post("/record_comment", async(req, res) => {
        try{
            const {cat_id, assessment_id, score_id, comment} = req.body;
            console.log('what are the variables at? ', assessment_id, score_id, comment)
            const record_comment = await pool.query(`
            INSERT INTO comment (cat_id, assessment_id, score_id, comment)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (assessment_id, score_id) DO UPDATE
            SET comment = $3`,
            [cat_id, assessment_id, score_id, comment]);
            res.json(record_comment.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "record_comment"');
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
            console.error(err, 'error has occurred in backend function "take_away_admin"');
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

    usersRouter.post("/start_new/:degree", async(req, res) => {
        try{
            const {degree} = req.params
            const {toKeep} = req.body
            console.log('in start_new degree and toKeep are at ', degree, ' ', toKeep)
            console.log('to keep is at ', JSON.stringify(req.body))
            const start_new = await pool.query(`
                select post_reqs($1::INT[], $2::TEXT);`,
                [
                    toKeep,
                    degree
                ])
                    console.log(start_new.rows[0])
                    res.json(start_new.rows[0].post_reqs)
            }
        catch(err ){
            console.error(err, 'error has occurred in backend function "start_new"');
        }
    });

    usersRouter.post("/add_outs/:degree/:term_id", async(req, res) => {
        try{
            const {degree, term_id} = req.params
            let cat_ids = []
            let outcome_descriptions = []
            for(let i = 0; i < req.body.length; i++){
                cat_ids.push(req.body[i].cat_id)
                
                outcome_descriptions.push(req.body[i].outcome_description)
            }  
            console.log(`Description in service is at ${outcome_descriptions}`)
            
            const add_outs = await pool.query(`
                select post_outcomes($1::TEXT, $2::INT[], $3::TEXT[], $4::INT);`,
                [
                    degree,
                    cat_ids,
                    outcome_descriptions,
                    term_id
                    
                ])
                    console.log(add_outs.rows[0])
                    res.json(add_outs.rows[0].rows)
            }
        catch(err ){
            console.error(err, 'error has occurred in backend function "add_outs"');
        }
    });

    usersRouter.post("/add_subs/:degree/:term_id", async(req, res) => {
        try{
            const {degree,term_id} = req.params
            console.log(req.params)
            let score_ids = []
            let outcome_cat_ids = []
            let suboutcome_names = []
            let suboutcome_descriptions = []
            let poor_descriptions = []
            let developing_descriptions = []
            let satisfactory_descriptions = []
            let excellent_descriptions = []
            for(let i = 0; i < req.body.length; i++){
                score_ids.push(req.body[i].score_id)
                outcome_cat_ids.push(req.body[i].outcome_cat_id)
                suboutcome_names.push(req.body[i].suboutcome_name)
                suboutcome_descriptions.push(req.body[i].suboutcome_description)
                poor_descriptions.push(req.body[i].poor_description)
                developing_descriptions.push(req.body[i].developing_description)
                satisfactory_descriptions.push(req.body[i].satisfactory_description)
                excellent_descriptions.push(req.body[i].excellent_description)
            }
        const add_subs = await pool.query(`select add_subs($9::TEXT, $1::INT[], $2::TEXT[], $3::TEXT[], $4::TEXT[], $5::TEXT[], $6::TEXT[],$7::TEXT[],$8::TEXT[], $10::INT)`,
        [
        outcome_cat_ids,
        score_ids,
        suboutcome_names,
        suboutcome_descriptions,
        poor_descriptions,
        developing_descriptions,
        satisfactory_descriptions,
        excellent_descriptions,
        degree,
        term_id
    ])
        
        console.log(add_subs.rows)
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "add subs (new)"');
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

    usersRouter.get("/term_check", async(req, res) => {
        try{
            const term_check = await pool.query(`
            SELECT set_current_term()`);
            res.json(term_check.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "term_check"');
        }
    });

    usersRouter.post("/set_capstone_prof", async(req, res) => {
        try{
            const {prof_email} = req.body;
            const set_capstone_prof = await pool.query(`
            SELECT set_cap_prof($1)`, [prof_email]);
            res.json(set_capstone_prof.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "set_capstone_prof"');
        }
    });

    usersRouter.post("/populate_semester", async(req, res) => {
        try{
            const populate_semester = await pool.query(`SELECT populate_semester()`
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
            const new_project = await pool.query(`SELECT add_assessments_by_student($1)`, [student_id]);
            res.json(new_project.rows);
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "new_project"');
        }
    });

    usersRouter.post("/add_assessments_by_prof", async(req, res) => {
        try{
            const {prof_email} = req.body;

            const add_assessments_by_prof = await pool.query(`SELECT add_assessments_by_prof($1)`, [prof_email]);
            res.json(add_assessments_by_prof.rows);
            console.log(add_assessments_by_prof.rows)
        }
        catch(err ){
            console.error(err, 'error has occurred in backend function "add_assessments_by_prof"');
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

    usersRouter.delete("/delete_project/:project", async(req, res) => {
        try{
            const {project} = req.params;
            const delete_project= await pool.query(`DELETE FROM project WHERE title = $1`, [project]);
            res.json(delete_project);
        }
        catch(err ){
            console.error("error has occured in backend function 'delete_project'");
        }
    });

    usersRouter.delete("/delete_student/:student", async(req, res) => {
        try{
            const {student} = req.params;

            const delete_student= await pool.query(`DELETE FROM student WHERE student_id = $1`, [student]);
            res.json(delete_student);
        }
        catch(err ){
            console.error(err, "error has occured in backend function 'delete_student'");
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
        INNER JOIN get_current_term()
            ON t.term_id = (select * from get_current_term())
        WHERE
            pr.prof_email = ($1);`,
        [email]);
        res.json(current_assessments_by_prof.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "current_assessments_by_prof"')
    }
  });


  // Here's the old SQL call for getting the current outcome reqs I'm keeping until the database refactor is 100% implemented -- Phillip
  // SELECT outcome_cats_cs, outcome_cats_cse, suboutcomes_cs, suboutcomes_cse FROM sem_req WHERE term_id = get_current_term();

  usersRouter.get('/past_assessments_by_prof/:email', async (req, res) => {
    try{
        const {email} = req.params
        const past_assessments_by_prof = await pool.query(`
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
            pr.prof_email = $1 and p.term_id <> get_current_term()`,
        [email]);
        res.json(past_assessments_by_prof.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "past_assessments_by_prof"')
    }
  });


  usersRouter.get('/current_outcome_reqs', async (req, res) => {
    try{
        const current_outcome_reqs = await pool.query(`
        SELECT * FROM get_reqs();`);
        res.json(current_outcome_reqs.rows[0]);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "current_outcome_reqs"')
    }
  });

    // Here's the old SQL call for getting the current outcome reqs I'm keeping until the database refactor is 100% implemented -- Phillip
    // SELECT outcome_cats_cs, outcome_cats_cse, suboutcomes_cs, suboutcomes_cse FROM sem_req INNER JOIN get_term_id($1,$2) ON sem_req.term_id = get_term_id
  usersRouter.get('/past_outcome_reqs/:sem/:year', async (req, res) => {
    try{
        const {sem, year} = req.params
        console.log('/past_outcome_reqs/:sem/:year ', sem, year)
        const past_outcome_reqs = await pool.query(`SELECT * FROM get_reqs($1, $2)`,
        [sem,year]);
        //res.json(past_outcome_reqs.rows[0]);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "past_outcome_reqs"')
    }
  });

  usersRouter.get('/all_past_info/:sem/:year/:degree', async (req, res) => {
    try{
        const {sem, year,degree} = req.params
        console.log('sem at ', sem, ' year at ', year, ' degree at ', degree)
        const all_past_info = await pool.query(`
        SELECT * from super_cs_grader($1::TEXT, $2::INT, $3::TEXT)`, [sem, year, degree]);
        res.json(all_past_info.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "all_past_info"')
    }
  });

  usersRouter.get('/totals_and_percents/:sem/:year/:degree', async (req, res) => {
    try{
        const {sem, year,degree} = req.params
        const totals_and_percents = await pool.query(`
        SELECT * from get_totes_pers($1, $2, $3)`, [sem, year, degree]);
        res.json(totals_and_percents.rows);
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "totals_and_percents"')
    }
  });


  // We have to watch this one, since we're grabbing by id and not "cat_id"s anymore.
  usersRouter.get('/get_outcome_desc/:degree/:sem/:year', async (req, res) => {
    try{
        const {degree, sem, year} = req.params
        console.log(`hitting in get_outcome_desc with degree at ${degree}, sem at ${sem}, and year at ${year}`)
        if (degree == 'CS'){
            let query = `
            select cs_cat_id as cat_id, id out_id, outcome_description from outcome_details_cs where 
                reqs_id = (select reqs_id from term where semester='${sem}' and year=${year}) order by order_float`
            console.log('this query is at ', query)

            const get_outcome_desc = await pool.query(`${query};`);
            console.log(get_outcome_desc.rows)
            res.json(get_outcome_desc.rows);
        }
        else {
            let query = `
            select cse_cat_id as cat_id, id out_id, outcome_description from outcome_details_cse where 
                reqs_id = (select reqs_id from term where semester='${sem}' and year=${year})  order by order_float`
            console.log('this query is at ', query)

            const get_outcome_desc = await pool.query(`${query};`);
            console.log(get_outcome_desc.rows)
            res.json(get_outcome_desc.rows);
        }
        }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_outcome_desc"')
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


  usersRouter.get('/get_suboutcomes/:degree/:outcome_name/:id', async (req, res) => {
    try{
        const {degree, outcome_name,id} = req.params
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
            FROM suboutcome_details_cs join term on term.reqs_id = suboutcome_details_cs.reqs_id
            join assessment on assessment.term_id = term.term_id where suboutcome_details_cs.outcome_cat_id
            = $1 and assessment.assessment_id = $2 order by order_float;`, [outcome_name,id]);
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
            FROM suboutcome_details_cse join term on term.reqs_id = suboutcome_details_cse.reqs_id
            join assessment on assessment.term_id = term.term_id where suboutcome_details_cse.outcome_cat_id
            = $1 and assessment.assessment_id = $2 order by order_float`, [outcome_name, id]);
            res.json(get_suboutcomes.rows);
        }
        //console.log(get_cs_suboutcomes.rows)
    }
    catch(err ){
        console.log(err, 'error has occurred in backend function "get_suboutcomes"')
    }
  });

  usersRouter.get('/get_outs_only/:degree', async (req, res) => {
    try {
        const {degree} = req.params
        const get_outs_only = await pool.query(
            `SELECT * FROM get_outs_only($1)`,
            [degree]);
            res.json(get_outs_only.rows)
        
    } catch (error) {
        console.log(error, 'error has occured in backend function "get_outs_only"')
    }
    })

    usersRouter.get('/get_sub_by_outcome/:out_id/:degree', async (req, res) => {
        try {
            const {degree, out_id} = req.params
            const get_outs_only = await pool.query(
                `SELECT * FROM get_sub_by_outcome($1, $2)`,
                [out_id, degree]);
                res.json(get_outs_only.rows)
            
        } catch (error) {
            console.log(error, 'error has occured in backend function "get_sub_by_outcome"')
        }
        })

        //get_sub_by_cat_id

        usersRouter.get('/get_sub_by_cat_id/:cat_id/:degree', async (req, res) => {
            try {
                const {degree, cat_id} = req.params
                const get_outs_only = await pool.query(
                    `SELECT * FROM get_sub_by_cat_id($1::INT, $2::TEXT)`,
                    [cat_id, degree]);
                    res.json(get_outs_only.rows)
                
            } catch (error) {
                console.log(error, 'error has occured in backend function "get_sub_by_cat_id"')
            }
            })

        usersRouter.get('/get_current_subs/:degree', async (req, res) => {
            try {
                const {degree} = req.params
                const get_current_subs = await pool.query(
                    `SELECT * FROM get_current_subs($1::TEXT)`,
                    [degree]);
                    res.json(get_current_subs.rows)
                
            } catch (error) {
                console.log(error, 'error has occured in backend function "get_current_subs"')
            }
            })



            module.exports= usersRouter