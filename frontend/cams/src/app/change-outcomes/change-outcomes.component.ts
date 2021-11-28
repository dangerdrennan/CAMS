import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';
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
  // @Input() outcome_cat!: number
  // grades: { score_id: string, grade: number}[] = []
  // outcome_des: OutcomeDescriptions[] = []
  // outcome_names: number[] = []
  // outcome_cats: number[]
  // assessmentInfo: AssessmentDisplay
  // submissionStatus: boolean
  // comments:ScoreComment[] = []
  // suboutcomeDetails!: Suboutcome[]

  degreeChangeForm!: FormGroup

  outcomeCSForm!: FormGroup
  outcomeCSEForm!: FormGroup
  displayTable: boolean = false
  outcomes = []
  suboutcomes = []
  csNums = []
  cseNums = []

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
    this.degreeChangeForm = this.builder.group({
      degree: ['', Validators.required]
    })

    this.outcomeCSForm = this.builder.group({
      newOutcome: this.builder.array([]),
      newSuboutcome: this.builder.array([]),
    })

    this.outcomeCSEForm = this.builder.group({
      newOutcome: this.builder.array([]),
      newSuboutcome: this.builder.array([]),
    })

   }

  ngOnInit(): void {

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

  appendToOutcomes() {
    let degree = this.degreeChangeForm.get('degree').value
    if(degree === 'CS') {
      console.log("pushing outcome:", this.outcomeCSForm.get('newOutcome').value[0])
      console.log("pushing suboutcome:", this.outcomeCSForm.get('newSuboutcome').value)

      this.outcomes.push(this.outcomeCSForm.get('newOutcome').value[0])
      this.suboutcomes.push(this.outcomeCSForm.get('newSuboutcome').value)
      // for(let i of this.outcomeCSForm.get('newSuboutcome').value) {
      //   [i])
      //   console.log("pushing suboutcome:", this.outcomeCSForm.get('newSuboutcome').value[i])

      this.csOutcomes.reset()
      this.csSuboutcomes.reset()
    }
    else if(degree === 'CSE') {
      this.outcomes.push(this.cseOutcomes)
      this.suboutcomes.push(this.cseSuboutcomes)
    }
  }

  // get the outcome nums that are used already
  extractOutcomeNum() {
    this.possibleOutcomes = [1,2,3,4,5,6,7,8,9]
    let degree = this.degreeChangeForm.get('degree').value
    console.log('possible ', this.possibleOutcomes.filter(i => {return i}))
    if(degree == 'CS') {
      this.outcomes.filter((data) => {
        console.log('outcome Nums: ', data.cat_id)

        for(let i = 0; i < this.possibleOutcomes.length; i +=1) {
          if(this.possibleOutcomes[i] == data.cat_id) {
            this.possibleOutcomes.splice(i, 1)
          }
        }
      })

      console.log('possible out ', this.possibleOutcomes)
    }
    else if(degree == 'CSE') {
      this.outcomes.filter((data) => {
        console.log('outcome Nums: ', data.cat_id)

        for(let i = 0; i < this.possibleOutcomes.length; i +=1) {
          if(this.possibleOutcomes[i] == data.cat_id) {
            this.possibleOutcomes.splice(i, 1)
          }
        }
      })
      console.log('possible out ', this.possibleOutcomes)
    }
  }

  addOutcome() {
    console.log("OUTTT")
    let degree = this.degreeChangeForm.get('degree').value
    if(degree === 'CS') {
      console.log("in cs add outcome")
      this.csOutcomes.push(this.createOutcome())
      console.log("length of array ", this.csOutcomes.length)
    }
    else if(degree === 'CSE') {
      console.log("in cse add outcome")
      this.cseOutcomes.push(this.createOutcome())
      console.log("length of array ", this.cseOutcomes.length)
    }
  }

  addSuboutcome() {
    console.log("SUBB")
    let degree = this.degreeChangeForm.get('degree').value
    if(degree === 'CS') {
      console.log("in cs add sub")
      this.csSuboutcomes.push(this.createSuboutcome())


    }
    else if(degree === 'CSE') {
      console.log("in cse add sub")
      this.cseSuboutcomes.push(this.createSuboutcome())

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
      outcome_num: ['', Validators.required],
      outcome_desc: ['', Validators.required]
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
      // const req = this.cleanUpEntry(degree)
      // console.log("reqs", req)
    }
    else if(degree == 'CSE') {
      console.log("submitted this form", this.outcomeCSEForm.value)
    //   const req = this.cleanUpEntry(degree)
    // console.log("reqs", req)
    }

    const req = this.cleanUpEntry(degree)
    console.log("reqs", req)

  }

  cleanUpEntry(degree:string){

    let form = (degree == 'CS') ? this.outcomeCSForm : this.outcomeCSEForm

    const newOuts: OutcomeDescriptions[] = []
    const newSubs: Suboutcome[] = []
    console.log(typeof(form.get('newOutcome').value[0].outcome_num))

    for (let i = 0; i < form.get('newOutcome').value.length; i++){
      console.log("length ", form.get('newOutcome').value.length)
      // let cat_id = form.get('newOutcome').value[i].outcome_num.value
      // let cat_num = form.get('newOutcome').value[i].outcome_num.value
      console.log("cat_id", form.get('newOutcome').value as number)
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
    this.outcomes = []
    this.suboutcomes = []
    let degree = this.degreeChangeForm.get('degree').value
    if (degree ==='CS'){
      this.cseOutcomes.clear()
      this.cseSuboutcomes.clear()
      this.updateOutService.getOutcomesOnly(degree).subscribe((res: any) => {

        this.outcomes = res
        res.filter((item: OutcomeDescriptions) => {

          this.updateOutService.getsuboutcomesOnly(item.out_id, degree).subscribe((res: any) => {
            console.log("res", res)
            this.suboutcomes.push(res)
            this.extractOutcomeNum()
          })

        })
        // console.log("outcomes", this.outcomes)
        // console.log("sub", this.suboutcomes)

      })

      this.displayTable = true

    }
    else if(degree === 'CSE') {
      this.csOutcomes.clear()
      this.csSuboutcomes.clear()
      this.updateOutService.getOutcomesOnly(degree).subscribe((res: any) => {
        // console.log("ress", res)
        this.outcomes = res
        res.filter((item: OutcomeDescriptions) => {
          this.updateOutService.getsuboutcomesOnly(item.out_id, degree).subscribe((res: any) => {
            // console.log("sub ", res)
            this.suboutcomes.push(res)
            this.extractOutcomeNum()
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
