import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { filter, last, take, takeUntil } from 'rxjs/operators';
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
  removing: boolean = false
  reqs: NewRequirement


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
    // this.updateOutService.getOutcomesOnly('CS').subscribe( res =>{
    //   console.log('res is at, ', res)
    //   this.outcomes = res

    // })
    // this.updateOutService.getsuboutcomesOnly(31, 'CS').subscribe(data => {
    //   console.log("data", data)
    // })






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

      newOutcome: this.builder.array([]),



      newSuboutcome: this.builder.array([]),


    })

    this.outcomeCSEForm = this.builder.group({


      newOutcome: this.builder.array([]),



      newSuboutcome: this.builder.array([]),


    })

   }

  ngOnInit(): void {
    // this.updateOutService.getOutcomesOnly('CS').subscribe(res=> {
    //   console.log('res it at ', res)
    // })
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
      console.log('is this keeping track of old outcomes?: ',this.currentOutcomeIDs)
      const reqs = this.cleanUpEntry(degree)
      console.log("adding thsi ", this.outcomeCSForm.get('newOutcome').value[0].outcome_num)

      this.currentOutcomeIDs.push(Number(this.outcomeCSForm.get('newOutcome').value[0].outcome_num))
      console.log('right after clean up, reqs is at ', reqs)
      this.updateOutService.update(this.currentOutcomeIDs, degree, reqs)
    }
    else if(degree == 'CSE') {
      console.log("submitted this form", this.outcomeCSEForm.value)
      console.log('is this keeping track of old outcomes?: ',this.currentOutcomeIDs)
      const reqs = this.cleanUpEntry(degree)
      console.log('right after clean up, reqs is at ', reqs)
      this.updateOutService.update(this.currentOutcomeIDs, degree, reqs)
    }

    this.outcomeCSForm.reset()
    this.outcomeCSEForm.reset()

  }

  removeOutcome(index: number) {
    console.log
    let degree = this.degreeChangeForm.get('degree').value
    if(degree === 'CS') {
      console.log("removing index ", index)
      // add the removed outcome id to the possible outcomes
      console.log('POOSSSS', this.possibleOutcomes)
      this.possibleOutcomes.push(this.outcomes[index].cat_id)
      // this.possibleOutcomes.sort((i, j) => {return i-j})
      console.log('NEWWWW POOSSSS', this.possibleOutcomes)

      // remove the outcome descrip and suboutcome titles
      console.log("OUTTCOMES ", this.outcomes)
      this.outcomes.filter(item => {
        if(item.cat_id === index) {
          this.outcomes.splice(index, 1)

        }
      })
      console.log("NEWWW OUTTCOMES ", this.outcomes)

      console.log("SUUUBB", this.suboutcomes)

          this.suboutcomes.splice(index, 1)

      console.log("NEWW SUUUBB", this.suboutcomes)


      // check for req_id
      console.log("current ids",this.currentOutcomeIDs)
      this.currentOutcomeIDs.filter(item => {
        if(item === index) {
          this.currentOutcomeIDs.splice(item, 1)
          console.log("newCurrent ids",this.currentOutcomeIDs)

        }
      })
      // this.currentOutcomeIDs.splice(index,1)

      console.log('right after clean up, reqs is at ', this.reqs)
      this.updateOutService.update(this.currentOutcomeIDs, degree, this.reqs)



    }
    else if(degree === 'CSE') {
      console.log("removing index ", index)
      // add the removed outcome id to the possible outcomes
      console.log('POOSSSS', this.possibleOutcomes)
      this.possibleOutcomes.push(this.outcomes[index].cat_id)
      this.possibleOutcomes.sort((i, j) => {return i-j})
      console.log('NEWWWW POOSSSS', this.possibleOutcomes)

      // remove the outcome descrip and suboutcome titles
      console.log("OUTTCOMES ", this.outcomes)

      this.outcomes.splice(index, 1)
      console.log("NEWWW OUTTCOMES ", this.outcomes)

      console.log("SUUUBB", this.suboutcomes)
      this.suboutcomes.splice(index, 1)
      console.log("NEWW SUUUBB", this.suboutcomes)

    }
  }

  cleanUpEntry(degree:string){

    let form = (degree == 'CS') ? this.outcomeCSForm : this.outcomeCSEForm

    const newOuts: OutcomeDescriptions[] = []
    const newSubs: Suboutcome[] = []
    // console.log(typeof(form.get('newOutcome').value[0].outcome_num))

    for (let i = 0; i < form.get('newOutcome').value.length; i++){
      let cat_id = form.get('newOutcome').value[i].outcome_num.value
      let cat_num = form.get('newOutcome').value[i].outcome_num.value
      console.log("cat id", cat_id)
      console.log("cat num ", cat_num)
      newOuts.push(
        {
          cat_id:  (form.get('newOutcome').value[i].outcome_num as number),
          outcome_description: form.get('newOutcome').value[i].outcome_desc as string,
          // out_id is meant to be NaN
          out_id: (this.possibleOutcomes[-1] + i as number)
        }
      )
      for (let j = 0; j < form.get('newSuboutcome').value.length; j++){


        console.log('type is at ', form.get('newSuboutcome').value[j].suboutcome_desc)
        console.log('type is at ',form.get('newSuboutcome').value[j].suboutcome_poor)
        console.log('type is at ', form.get('newSuboutcome').value[j].suboutcome_dev )
        console.log('type is at ',form.get('newSuboutcome').value[j].suboutcome_sat )
        console.log('type is at ', form.get('newSuboutcome').value[j].suboutcome_ex )
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

    this.reqs = {new_outcome: newOuts, new_subs: newSubs}

    form.reset
    return this.reqs;
  }

 getSubs(cat_id: number, degree: string) {
  this.updateOutService.getsuboutcomesOnly(cat_id, degree).pipe(last()).subscribe((res) => {
    console.log("ressssss", res)

      this.suboutcomes.push(res)
      // console.log("in get_degree_outcomes-- res=", this.suboutcomes)
  })
 }

  // trigger to display outcomes and suboutcomes for specified degree
  getDegreeOutcomes() {

    // this.outcomes = []
    // this.suboutcomes = []
    let degree = this.degreeChangeForm.get('degree').value
    if (degree ==='CS'){
      this.cseOutcomes.clear()
      this.cseSuboutcomes.clear()
      this.currentOutcomeIDs = []
      this.possibleOutcomes = [1,2,3,4,5,6,7,8,9]
      this.updateOutService.getOutcomesOnly(degree).pipe(last()).subscribe((res: any) => {
        console.log("outcome*****", res)
        this.outcomes = res
        res.filter((item: OutcomeDescriptions) => {

          setTimeout(() => {
            this.updateOutService.getsuboutcomesOnly(item.cat_id, degree).subscribe((res: Suboutcome[]) => {
              console.log("in get_degree_outcomes-- res=", res)
              this.suboutcomes.push(res)
            })
          }, 300);


        })
              const cat_ids = res.map(x=> {return x.cat_id})
              const out_ids = res.map(x=> {return x.out_id})
              this.currentOutcomeIDs = cat_ids
              this.possibleOutcomes = this.possibleOutcomes.filter(x=> !cat_ids.includes(x))


      })

      this.displayTable = true
    }
    else if (degree ==='CSE'){
      this.csOutcomes.clear()
      this.csSuboutcomes.clear()
      this.currentOutcomeIDs = []
      this.possibleOutcomes = [1,2,3,4,5,6,7,8,9]
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
        // this.extractOutcomeNum()
      })

      this.displayTable = true
    }


  }


  goBack() {
    this.router.navigateByUrl('/update-outcomes');
  }


}
