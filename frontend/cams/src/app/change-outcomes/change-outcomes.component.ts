import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { filter, last, take } from 'rxjs/operators';
import { AssessmentDisplay } from '../AssessmentDisplay';
import { NewRequirement } from '../NewRequirement';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutDesc } from '../outDesc';
import { ScoreComment } from '../ScoreComment';
import { AssessmentService } from '../services/assessment.service';
import { UpdateOutcomesService } from '../services/update-outcomes.service';
import { Suboutcome } from '../Suboutcome';

@Component({
  selector: 'app-change-outcomes',
  templateUrl: './change-outcomes.component.html',
  styleUrls: ['./change-outcomes.component.css']
})
export class ChangeOutcomesComponent implements OnInit {
  @Input() outcome_cat!: number
  grades: { score_id: string, grade: number}[] = []
  outcome_des: OutcomeDescriptions[] = []
  outcome_names: number[] = []
  outcome_cats: number[]
  assessmentInfo: AssessmentDisplay
  submissionStatus: boolean
  comments:ScoreComment[] = []
  suboutcomeDetails!: Suboutcome[]

  degreeChangeForm!: FormGroup

  outcomeCSForm!: FormGroup
  outcomeCSEForm!: FormGroup
  outform!: FormGroup
  displayTable: boolean = false
  outcomes = []
  suboutcomes = []
  csNums = []
  cseNums = []
  csOut: Observable<OutDesc[]>
  cseOut = []
  currentOutcomeIDs: number[]
  

  possibleOutcomes = [1,2,3,4,5,6,7,8,9]
  possibleSuboutcomes = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
                         2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
                         3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
                         4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
                         5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9,
                         6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9,
                         7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9,
                         8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9,
                         9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9]

  constructor(private router: Router, public auth:AuthService, public assessmentService: AssessmentService, public builder: FormBuilder, public updateOutService: UpdateOutcomesService) {
    // this.submissionStatus= this.assessmentService.submissionStatus
    this.updateOutService.getOutcomesOnly('CS').subscribe( res =>{
      console.log('res is at, ', res)
    })
    
    this.degreeChangeForm = this.builder.group({
      degree: ['', Validators.required]
    })

    this.outform = this.builder.group({
      outcome: ['', Validators.required],
      outcome_description:['', Validators.required],
      suboutcome: this.builder.group({
        suboutcome_description: [''],
        poor_description: [''],
        developing_description: [''],
        satisfactory_description: [''],
        excellent_description: ['']
      }),
      aliases: this.builder.array([
        this.builder.control('')
      ])
    });

    this.outcomeCSForm = this.builder.group({
      outcome_1: ['Outcome 1: Analyze a complex computing problem and to apply principles of computing and other relevant disciplines to identify solutions.', Validators.required],
      outcome_2: ['Outcome 2: Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program\'s discipline. ', Validators.required],
      outcome_3: ['Outcome 3: Communicate effectively in a variety of professional contexts, including technical and non-technical audiences for business, end-user, client, and computing contexts. ', Validators.required],
      outcome_5: ['Outcome 5: Function effectively as a member or leader of a team engaged in activities appropriate to the program\'s discipline. ', Validators.required],

      newOutcome: this.builder.array([]),

      subout_1_1: ['1.\tAnalyzes problem and formulates requirements for the problem', Validators.required],
      subout_1_2: ['2.\tIdentifies solution by applying principles of computing', Validators.required],
      subout_2_1: ['1.\tProduces a design strategy, including tasks and subtasks, timelines, and evaluation of progress', Validators.required],
      subout_2_2: ['2.\tCreates a final product for evaluation', Validators.required],
      subout_2_3: ['3.\tEvaluates computing-based solution', Validators.required],
      subout_3_1: ['1.\tEffectively organizes and structures a presentation or document', Validators.required],
      subout_3_2: ['2.\tProvides appropriate content to demonstrate  detailed knowledge of subject area', Validators.required],
      subout_3_3: ['3.\tEffectively communicates details appropriate to the audience, including questions', Validators.required],
      subout_3_4: ['None', Validators.required],
      subout_3_5: ['5.\tWrites using proper spelling and grammar', Validators.required],
      subout_3_6: ['6.\tDelivers oral presentation effectively', Validators.required],
      subout_5_1: ['1.\tUnderstands and fulfills roles and responsibilities', Validators.required],
      subout_5_2: ['2.\tListens and works with others', Validators.required],
      subout_5_3: ['3.\tCommunicates effectively with the group ', Validators.required],

      newSuboutcome: this.builder.array([]),

      sub_1_1_poor: ['No attempt or fails to analyze accurately', Validators.required],
      sub_1_1_dev: ['Analyzes but key details are missing or confused', Validators.required],
      sub_1_1_sat: ['Most details analyzed and key relationships identified', Validators.required],
      sub_1_1_ex: ['Clearly analyzes the challenge and embedded issues', Validators.required],

      sub_1_2_poor: ['Incorrect application of computing principles or fails to identify solutions', Validators.required],
      sub_1_2_dev: ['Limited identification of solutions using computing principles', Validators.required],
      sub_1_2_sat: ['Reasonable identification of solutions using computing principles', Validators.required],
      sub_1_2_ex: ['In-depth and comprehensive utilization of computing principles, identification of solution well beyond expectations', Validators.required],

      sub_2_1_poor: ['Does not produce a design strategy, or the design strategy is especially poor', Validators.required],
      sub_2_1_dev: ['Limited attempts to form a design strategy', Validators.required],
      sub_2_1_sat: ['Produces a reasonable design strategy appropriate to the project', Validators.required],
      sub_2_1_ex: ['Produces an exceptional design strategy which exceeds expectations', Validators.required],

      sub_2_2_poor: ['Does not create a final product, or the final product is especially poor', Validators.required],
      sub_2_2_dev: ['Makes a start on a final product but is unable to meet final specifications', Validators.required],
      sub_2_2_sat: ['Creates a satisfactory final product which meets defined specifications', Validators.required],
      sub_2_2_ex: ['Creates an exceptional final product which exceeds expectations', Validators.required],

      sub_2_3_poor: ['Limited or no evaluation', Validators.required],
      sub_2_3_dev: ['Basic evaluation but has gaps', Validators.required],
      sub_2_3_sat: ['Satisfactory evaluation of solution, some utilization of computing principles (e.g. Big-O analysis, testing methodologies)', Validators.required],
      sub_2_3_ex: ['Exceptional and comprehensive evaluation of solution with strong tie to computing principles', Validators.required],

      sub_3_1_poor: ['No logical structure', Validators.required],
      sub_3_1_dev: ['Some structure but erratic jumps in topic', Validators.required],
      sub_3_1_sat: ['Most information presented logically', Validators.required],
      sub_3_1_ex: ['All information presented logically', Validators.required],

      sub_3_2_poor: ['No grasp of topic, cannot answer questions or extremely limited content', Validators.required],
      sub_3_2_dev: ['Only rudimentary knowledge demonstrated', Validators.required],
      sub_3_2_sat: ['At ease with content and provides some detail', Validators.required],
      sub_3_2_ex: ['Full command of subject matter', Validators.required],

      sub_3_3_poor: ['Is unable to effectively communicate', Validators.required],
      sub_3_3_dev: ['Only able to answer/explain in a limited manner; limited detail', Validators.required],
      sub_3_3_sat: ['Provides sufficient detail to describe/answer questions', Validators.required],
      sub_3_3_ex: ['Communicates  details exceptionally well', Validators.required],

      sub_3_4_poor: ['Provides effective and appropriate visual aids and graphics', Validators.required],
      sub_3_4_dev: ['Weak support of the material, text or diagrams hard to see or understand', Validators.required],
      sub_3_4_sat: ['Mostly supports the material, most text and diagrams understandable', Validators.required],
      sub_3_4_ex: ['Text and diagrams strongly reinforce the presentation', Validators.required],

      sub_3_5_poor: ['Significant errors', Validators.required],
      sub_3_5_dev: ['Several errors', Validators.required],
      sub_3_5_sat: ['Minor errors', Validators.required],
      sub_3_5_ex: ['Negligible errors', Validators.required],

      sub_3_6_poor: ['Significant delivery problems, little to no audience contact; much too long or much too short', Validators.required],
      sub_3_6_dev: ['Several mispronunciation, occasional audience contact; too long or too short', Validators.required],
      sub_3_6_sat: ['Clear voice, steady rate, some audience contact; slightly too long or too short', Validators.required],
      sub_3_6_ex: ['Clear voice, steady rate, strong audience contact, enthusiastic, confident; on time', Validators.required],

      sub_5_1_poor: ['Does not fulfill team role duties', Validators.required],
      sub_5_1_dev: ['Fulfills some, but not all, team role duties', Validators.required],
      sub_5_1_sat: ['Fulfills team role duties', Validators.required],
      sub_5_1_ex: ['Exceeds expectations with respect to team role duties', Validators.required],

      sub_5_2_poor: ['Does not consider other team members\' ideas or concerns', Validators.required],
      sub_5_2_dev: ['Sometimes considers other team members\' ideas or concerns', Validators.required],
      sub_5_2_sat: ['Often addresses other team members\' ideas or concerns', Validators.required],
      sub_5_2_ex: ['Is exceptionally adept at addressing other team members\' ideas or concerns', Validators.required],

      sub_5_3_poor: ['Does not communicate to other members regarding the project progress', Validators.required],
      sub_5_3_dev: ['Provides terse outline of status of the project and relevant updates', Validators.required],
      sub_5_3_sat: ['Provides updates on a regular basis', Validators.required],
      sub_5_3_ex: ['Works exceptionally well to provide documentation of progress', Validators.required],

    })

    this.outcomeCSEForm = this.builder.group({
      outcome_1: ['Outcome 1: An ability to identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics.', Validators.required],
      outcome_2: ['Outcome 2: An ability to apply engineering design to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors. ', Validators.required],
      outcome_3: ['Outcome 3: An ability to communicate effectively with a range of audiences, including technical and non-technical audiences for business, end-user, client, and computing contexts. ', Validators.required],
      outcome_5: ['Outcome 5: An ability to function effectively on a team whose members together provide leadership, create a collaborative and inclusive environment, establish goals, plan tasks, and meet objectives. ', Validators.required],
      outcome_6: ['Outcome 6: An ability to develop and conduct appropriate experimentation, analyze and interpret data, and use engineering judgment to draw conclusions. ', Validators.required],
      outcome_7: ['Outcome 7: An ability to acquire and apply new knowledge as needed, using appropriate learning strategies. ', Validators.required],

      newOutcome: this.builder.array([]),

      subout_1_1: ['1.\tIdentifies requirements and formulates solution by applying principles of engineering, science, and mathematics', Validators.required],
      subout_1_2: ['2.\tSolves complex engineering problem by applying principles of engineering, science, and mathematics', Validators.required],

      subout_2_1: ['1.\tCreates a final product for evaluation that meets specified needs', Validators.required],
      subout_2_2: ['2.\tSolution considers public health, safety, welfare, human, environmental, and economic factors', Validators.required],

      subout_3_1: ['1.\tEffectively organizes and structures a presentation or document', Validators.required],
      subout_3_2: ['2.\tProvides appropriate content to demonstrate  detailed knowledge of subject area', Validators.required],
      subout_3_3: ['3.\tEffectively communicates details appropriate to the audience, including questions', Validators.required],
      subout_3_4: ['None', Validators.required],
      subout_3_5: ['5.\tWrites using proper spelling and grammar', Validators.required],
      subout_3_6: ['6.\tDelivers oral presentation effectively', Validators.required],

      subout_5_1: ['1.\tUnderstands and fulfills roles and responsibilities', Validators.required],
      subout_5_2: ['2.\tListens and works with others', Validators.required],
      subout_5_3: ['3.\tCommunicates effectively with the group', Validators.required],

      subout_6_1: ['1.\tDevelops and conducts an appropriate engineering experiment to test a hypothesis ', Validators.required],
      subout_6_2: ['2.\tAnalyzes and interprets experimental data using engineering judgment', Validators.required],

      subout_7_1: ['1.\tDemonstrates ability to independently learn the latest developments and technical issues surrounding a new topic', Validators.required],
      subout_7_2: ['2.\tUtilizes appropriate learning strategies', Validators.required],

      newSuboutcome: this.builder.array([]),

      subout_1_1_poor: ['No attempt or fails to formulate accurately', Validators.required],
      subout_1_1_dev: ['Formulates but key details are missing or confused', Validators.required],
      subout_1_1_sat: ['Most details identified and key relationships identified, appropriate solution formulated', Validators.required],
      subout_1_1_ex: ['Clearly identifies the challenge and  embedded issues and formulates an appropriate solution', Validators.required],

      subout_1_2_poor: ['Incorrect application of engineering principles or fails to implement solutions', Validators.required],
      subout_1_2_dev: ['Limited solution or only partly applies science, math, and engineering principles', Validators.required],
      subout_1_2_sat: ['Reasonable solution using science, math, and engineering principles', Validators.required],
      subout_1_2_ex: ['In-depth and comprehensive utilization of science, math, and engineering principles in solution', Validators.required],

      subout_2_1_poor: ['Does not create a final product, or the final product is especially poor', Validators.required],
      subout_2_1_dev: ['Makes a start on a final product but is unable to meet final specifications', Validators.required],
      subout_2_1_sat: ['Creates a satisfactory final product which meets defined specifications', Validators.required],
      subout_2_1_ex: ['Creates an exceptional final product which exceeds expectations', Validators.required],

      subout_2_2_poor: ['Limited or no  consideration of specified factors', Validators.required],
      subout_2_2_dev: ['Basic evaluation and consideration but has gaps', Validators.required],
      subout_2_2_sat: ['Satisfactory consideration of specified factors ', Validators.required],
      subout_2_2_ex: ['Exceptional and comprehensive consideration of specified factors with strong tie to engineering design', Validators.required],

      subout_3_1_poor: ['No logical structure', Validators.required],
      subout_3_1_dev: ['Some structure but erratic jumps in topic', Validators.required],
      subout_3_1_sat: ['Most information presented logically', Validators.required],
      subout_3_1_ex: ['All information presented logically', Validators.required],

      subout_3_2_poor: ['No grasp of topic, cannot answer questions or extremely limited content', Validators.required],
      subout_3_2_dev: ['Only rudimentary knowledge demonstrated', Validators.required],
      subout_3_2_sat: ['At ease with content and provides some detail', Validators.required],
      subout_3_2_ex: ['Full command of subject matter', Validators.required],

      subout_3_3_poor: ['Is unable to effectively communicate', Validators.required],
      subout_3_3_dev: ['Only able to answer/explain in a limited manner; limited detail', Validators.required],
      subout_3_3_sat: ['Provides sufficient detail to describe/answer questions', Validators.required],
      subout_3_3_ex: ['Communicates  details exceptionally well', Validators.required],

      subout_3_4_poor: ['Provides effective and appropriate visual aids and graphics', Validators.required],
      subout_3_4_dev: ['Weak support of the material, text or diagrams hard to see or understand', Validators.required],
      subout_3_4_sat: ['Mostly supports the material, most text and diagrams understandable', Validators.required],
      subout_3_4_ex: ['Text and diagrams strongly reinforce the presentation', Validators.required],

      subout_3_5_poor: ['Significant errors', Validators.required],
      subout_3_5_dev: ['Several errors', Validators.required],
      subout_3_5_sat: ['Minor errors', Validators.required],
      subout_3_5_ex: ['Negligible errors', Validators.required],

      subout_3_6_poor: ['Significant delivery problems, little to no audience contact; much too long or much too short', Validators.required],
      subout_3_6_dev: ['Several mispronunciation, occasional audience contact; too long or too short', Validators.required],
      subout_3_6_sat: ['Clear voice, steady rate, some audience contact; slightly too long or too short', Validators.required],
      subout_3_6_ex: ['Clear voice, steady rate, strong audience contact, enthusiastic, confident; on time', Validators.required],

      subout_5_1_poor: ['Does not fulfill team role duties', Validators.required],
      subout_5_1_dev: ['Fulfills some, but not all, team role duties', Validators.required],
      subout_5_1_sat: ['Fulfills team role duties', Validators.required],
      subout_5_1_ex: ['Exceeds expectations with respect to team role duties', Validators.required],

      subout_5_2_poor: ['Does not consider other team members\' ideas or concerns', Validators.required],
      subout_5_2_dev: ['Sometimes considers other team members\' ideas or concerns', Validators.required],
      subout_5_2_sat: ['Often addresses other team members\' ideas or concerns', Validators.required],
      subout_5_2_ex: ['Is exceptionally adept at addressing other team members\' ideas or concerns', Validators.required],

      subout_5_3_poor: ['Does not communicate to other members regarding the project progress', Validators.required],
      subout_5_3_dev: ['Provides terse outline of status of the project and relevant updates', Validators.required],
      subout_5_3_sat: ['Provides updates on a regular basis', Validators.required],
      subout_5_3_ex: ['Works exceptionally well to provide documentation of progress', Validators.required],

      subout_6_1_poor: ['Unable to develop and conduct experiment', Validators.required],
      subout_6_1_dev: ['Partially develops and conducts experiment or flaws in experimental design', Validators.required],
      subout_6_1_sat: ['Satisfactorily develops and conducts experiment', Validators.required],
      subout_6_1_ex: ['Exceeds expectations in developing and conducting experiment', Validators.required],

      subout_6_2_poor: ['Unable to analyze and interpret data', Validators.required],
      subout_6_2_dev: ['Partially analyzes and interprets data, but gaps in analysis', Validators.required],
      subout_6_2_sat: ['Satisfactorily analyzes and interprets data; uses engineering judgment', Validators.required],
      subout_6_2_ex: ['Exceeds expectations in analysis and interpretation with engineering judgment', Validators.required],

      subout_7_1_poor: ['Does not demonstrate an understanding of the technical challenges / issues surrounding the topic', Validators.required],
      subout_7_1_dev: ['Demonstrates a vague understanding of the technical issues and the latest developments', Validators.required],
      subout_7_1_sat: ['Demonstrates satisfactory knowledge of the technical issues and the latest developments', Validators.required],
      subout_7_1_ex: ['Demonstrates exceptional knowledge of the technical issues and the latest developments', Validators.required],

      subout_7_2_poor: ['No or inappropriate learning strategy', Validators.required],
      subout_7_2_dev: ['Some appropriate learning strategy', Validators.required],
      subout_7_2_sat: ['Appropriate learning strategy', Validators.required],
      subout_7_2_ex: ['Exceptional learning strategy', Validators.required],
    })

   }

  ngOnInit(): void {
    this.updateOutService.getOutcomesOnly('CS').subscribe(res=> {
      console.log('res it at ', res)
    })
  }

  get csOutcomes() {
    return this.outcomeCSForm.get('newOutcome') as FormArray
  }

  get cseOutcomes() {
    return this.outcomeCSEForm.get('newOutcome') as FormArray
  }

  get csSuboutcomes() {
    return this.outcomeCSForm.get('newSuboutcome') as FormArray
  }

  get cseSuboutcomes() {
    return this.outcomeCSEForm.get('newSuboutcome') as FormArray
  }

  get csOutControls() {
    return this.outcomeCSForm.get('newOutcome')['controls']
  }

  get cseOutControls() {
    return this.outcomeCSEForm.get('newOutcome')['controls']
  }

  get csSubControls() {
    return this.outcomeCSForm.get('newSuboutcome')['controls']
  }

  get cseSubControls() {
    return this.outcomeCSEForm.get('newSuboutcome')['controls']
  }

  // get the outcome nums that are used already
  extractOutcomeNum() {
    let newPoss = []
    let degree = this.degreeChangeForm.get('degree').value
    console.log('possible ', this.possibleOutcomes)
    if(degree == 'CS') {
      this.outcomes.filter((data) => {
        console.log('outcome Nums: ', data.cat_id)
        // this.csNums.push(data.cat_id)
        for(let i = 1; i < this.possibleOutcomes.length; i +=1) {
          if(data.cat_id == this.possibleOutcomes[i]) {
            console.log("excluded ", this.possibleOutcomes[i])
            newPoss.push(this.possibleOutcomes[i])
          }
        }

        console.log('possible out ', this.possibleOutcomes)
        console.log('new poss ', newPoss)
      })

    }
    else if(degree == 'CSE') {
      this.outcomes.filter(data => {
        this.cseNums.push(data.cat_id)
      })
    }
  }

  addOutcome() {
    console.log("OUTTT")
    let degree = this.degreeChangeForm.get('degree').value
    if(degree == 'CS') {
      console.log("in cs add outcome")
      this.csOutcomes.push(this.createOutcome())
      // this.createInputBox()
    }
    else if(degree == 'CSE') {
      console.log("in cse add outcome")
      this.cseOutcomes.push(this.createOutcome())
      // this.createInputBox()
    }
  }

  addSuboutcome() {
    console.log("SUBB")
    let degree = this.degreeChangeForm.get('degree').value
    if(degree == 'CS') {
      console.log("in cs add sub")
      this.csSuboutcomes.push(this.createSuboutcome())
      // this.createInputBox()
    }
    else if(degree == 'CSE') {
      console.log("in cse add sub")
      this.cseSuboutcomes.push(this.createSuboutcome())
      // this.createInputBox()
    }
  }

  //
  deleteOutcome(i: number) {
    let degree = this.degreeChangeForm.get('degree').value
    if(degree == 'CS') {

      this.csOutcomes.removeAt(i)

    }
    else if(degree == 'CSE'){
      this.cseOutcomes.removeAt(i)
    }
  }

  deleteSubcome(i: number) {
    let degree = this.degreeChangeForm.get('degree').value
    if(degree == 'CS') {
      console.log("in cs remove sub")
      this.csSuboutcomes.removeAt(i)

    }
    else if(degree == 'CSE'){
      console.log("in cse remove sub")
      this.cseSuboutcomes.removeAt(i)
    }
  }

  createOutcome(): FormGroup {
    return this.builder.group({
      outcome_num: [''],
      outcome_desc: ['']
    })
  }


  createSuboutcome(): FormGroup {
    return this.builder.group({
      suboutcome_num: ['', Validators.required],
      suboutcome_desc: ['', Validators.required],
      suboutcome_poor: [''],
      suboutcome_dev: [''],
      suboutcome_sat: [''],
      suboutcome_ex: ['']
    })
  }

  submitNewOutcome() {

    let degree = this.degreeChangeForm.get('degree').value
    if(degree == 'CS') {
      console.log("submitted this form", this.outcomeCSForm.value)
    }
    else if(degree == 'CSE') {
      console.log("submitted this form", this.outcomeCSEForm.value)
    }
    console.log('is this keeping track of old outcomes?: ',this.currentOutcomeIDs)
    const reqs = this.cleanUpEntry(degree)
    console.log('right after clean up, reqs is at ', reqs)
    this.updateOutService.update(this.currentOutcomeIDs, degree, reqs)

  }

  cleanUpEntry(degree:string){
    
    let form = (degree == 'CS') ? this.outcomeCSForm : this.outcomeCSEForm

    const newOuts: OutcomeDescriptions[] = []
    const newSubs: Suboutcome[] = []
    console.log(typeof(form.get('newOutcome').value[0].outcome_num))
    
    for (let i = 0; i < form.get('newOutcome').value.length; i++){
      let cat_id = form.get('newOutcome').value[i].outcome_num.value
      let cat_num = form.get('newOutcome').value[i].outcome_num.value
      newOuts.push(
        {
          cat_id:  (form.get('newOutcome').value[i].outcome_num as number),
          outcome_description: form.get('newOutcome').value[i].outcome_des,
          out_id: this.possibleOutcomes[-1] + i
        }
      )
      for (let j = 0; j < form.get('newSuboutcome').value.length; j++){
        
      
        console.log('type is at ', typeof(form.get('newSuboutcome').value[j].suboutcome_desc))
        console.log('type is at ', typeof(form.get('newSuboutcome').value[j].suboutcome_poor))
        console.log('type is at ', typeof(form.get('newSuboutcome').value[j].suboutcome_dev ))
        console.log('type is at ', typeof(form.get('newSuboutcome').value[j].suboutcome_sat ))
        console.log('type is at ', typeof(form.get('newSuboutcome').value[j].suboutcome_ex  ))
       newSubs.push(
          {
            score_id: `score_${form.get('newOutcome').value[i].outcome_num as number}_${j+1}`,
            suboutcome_name: `${form.get('newOutcome').value[i].outcome_num as number}.${j+1}`,
            outcome_cat_id: (form.get('newOutcome').value[i].outcome_num as number),
            suboutcome_description: (form.get('newSuboutcome').value[j].suboutcome_desc as string),
            poor_description: (form.get('newSuboutcome').value[j].suboutcome_poor as string),
            developing_description: (form.get('newSuboutcome').value[j].suboutcome_dev as string),
            satisfactory_description: (form.get('newSuboutcome').value[j].suboutcome_sat as string),
            excellent_description: (form.get('newSuboutcome').value[j].suboutcome_ex as string)
          }
        )
      }
    }
    
    const reqs: NewRequirement = {new_outcome: newOuts, new_subs: newSubs}
    form.reset
    return reqs;
  }

  // trigger to display outcomes and suboutcomes for specified degree
  getDegreeOutcomes() {
    this.csOutcomes.reset()
    this.cseOutcomes.reset()
    this.csSuboutcomes.reset()
    this.cseSuboutcomes.reset()
    this.outcomes = []
    this.suboutcomes = []
    let degree = this.degreeChangeForm.get('degree').value
    if (degree =='CS'){

      this.updateOutService.getOutcomesOnly(degree).subscribe((res: any) => {

        this.outcomes = res
        const cat_ids = res.map(x=> {return x.cat_id})
        const out_ids = res.map(x=> {return x.out_id})
        this.currentOutcomeIDs = out_ids
        this.possibleOutcomes = this.possibleOutcomes.filter(x=> !cat_ids.includes(x))
        res.filter((item: OutDesc) => {
          
          this.updateOutService.getsuboutcomesOnly(item.out_id, degree).subscribe((res: any) => {
            console.log("in get_degree_outcomes-- res=", res)
            this.suboutcomes.push(res)
          })

        })
        console.log("outcomes", this.outcomes)
        console.log("sub", this.suboutcomes)
        this.extractOutcomeNum()
      })

      this.displayTable = true
    }
    else if(degree == 'CSE') {
      
      this.updateOutService.getOutcomesOnly(degree).subscribe((res: any) => {
      const cat_ids = res.map(x=> {return x.cat_id})
      const out_ids = res.map(x=> {return x.out_id})
      this.currentOutcomeIDs = out_ids
      this.possibleOutcomes = this.possibleOutcomes.filter(x=> !cat_ids.includes(x))
        console.log("ress", res)
        this.outcomes = res
        res.filter((item: OutDesc) => {
          this.updateOutService.getsuboutcomesOnly(item.out_id, degree).subscribe((res) => {
            console.log("sub ", res)
            this.suboutcomes.push(res)
          })
        })
      })
      this.displayTable = true
    }


  }


  goBack() {
    this.router.navigateByUrl('/update-outcomes');
  }


}
