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
import { OutcomeDisplay } from '../OutcomeDisplay';
import { OutDesc } from '../outDesc';
import { ScoreComment } from '../ScoreComment';
import { AssessmentService } from '../services/assessment.service';
import { UpdateOutcomesService } from '../services/update-outcomes.service';
import { Suboutcome } from '../Suboutcome';
import { SuboutDesc } from '../suboutDesc';

@Component({
  selector: 'app-change-outcomes',
  templateUrl: './change-outcomes.component.html',
  styleUrls: ['./change-outcomes.component.css'],
})
export class ChangeOutcomesComponent implements OnInit {
  @Input() outcome_cat!: number;
  grades: { score_id: string; grade: number }[] = [];
  outcome_des: OutcomeDescriptions[] = [];
  outcome_names: number[] = [];
  outcome_cats: number[];
  assessmentInfo: AssessmentDisplay;
  submissionStatus: boolean;
  comments: ScoreComment[] = [];
  suboutcomeDetails!: Suboutcome[];

  degreeChangeForm!: FormGroup;

  x: any[][];

  outcomeCSForm!: FormGroup;
  outcomeCSEForm!: FormGroup;
  outform!: FormGroup;
  displayTable: boolean = false;
  outcomes: OutDesc[]
  suboutcomes = [];
  suboutcomesR = [];
  csNums = [];
  cseNums = [];
  csOut: Observable<OutDesc[]>;
  cseOut = [];
  test: any[] = [];
  currentOutcomeIDs: number[];
  display_list: OutcomeDisplay[];
  newSuboutcomeList = [];
  degree: string

  possibleOutcomes = [1, 2, 3, 4, 5, 6, 7, 8, 9];


  constructor(
    private router: Router,
    public auth: AuthService,
    public assessmentService: AssessmentService,
    public builder: FormBuilder,
    public updateOutService: UpdateOutcomesService
  ) {
    // this.submissionStatus= this.assessmentService.submissionStatus

    this.degreeChangeForm = this.builder.group({
      degree: ['', Validators.required],
    });

    this.outform = this.builder.group({
      outcome: ['', Validators.required],
      outcome_description: ['', Validators.required],
      suboutcome: this.builder.group({
        suboutcome_description: [''],
        poor_description: [''],
        developing_description: [''],
        satisfactory_description: [''],
        excellent_description: [''],
      }),
      aliases: this.builder.array([this.builder.control('')]),
    });

    this.outcomeCSForm = this.builder.group({
      newOutcome: this.builder.array([]),

      newSuboutcome: this.builder.array([]),
    });

    this.outcomeCSEForm = this.builder.group({
      newOutcome: this.builder.array([]),

      newSuboutcome: this.builder.array([]),
    });
  }

  ngOnInit(): void {}

  get csOutcomes() {
    return this.outcomeCSForm.get('newOutcome') as FormArray;
  }

  get cseOutcomes() {
    return this.outcomeCSEForm.get('newOutcome') as FormArray;
  }

  get csSuboutcomes() {
    return this.outcomeCSForm.get('newSuboutcome') as FormArray;
  }

  get cseSuboutcomes() {
    return this.outcomeCSEForm.get('newSuboutcome') as FormArray;
  }

  get csOutControls() {
    return this.outcomeCSForm.get('newOutcome')['controls'];
  }

  get cseOutControls() {
    return this.outcomeCSEForm.get('newOutcome')['controls'];
  }

  get csSubControls() {
    return this.outcomeCSForm.get('newSuboutcome')['controls'];
  }

  get cseSubControls() {
    return this.outcomeCSEForm.get('newSuboutcome')['controls'];
  }

  addOutcome() {
    console.log('OUTTT');
    let degree = this.degreeChangeForm.get('degree').value;
    if (degree == 'CS') {
      console.log('in cs add outcome');
      this.csOutcomes.push(this.createOutcome());
      // this.createInputBox()
    } else if (degree == 'CSE') {
      console.log('in cse add outcome');
      this.cseOutcomes.push(this.createOutcome());
      // this.createInputBox()
    }
  }

  addSuboutcome() {
    let degree = this.degreeChangeForm.get('degree').value;
    if (degree == 'CS') {
      console.log('in cs add sub');
      this.csSuboutcomes.push(this.createSuboutcome());
      // this.createInputBox()
    } else if (degree == 'CSE') {
      console.log('in cse add sub');
      this.cseSuboutcomes.push(this.createSuboutcome());
      // this.createInputBox()
    }
  }

  //
  deleteOutcome(i: number) {
    let degree = this.degreeChangeForm.get('degree').value;
    if (degree == 'CS') {
      this.csOutcomes.removeAt(i);
    } else if (degree == 'CSE') {
      this.cseOutcomes.removeAt(i);
    }
  }

  deleteSubcome(i: number) {
    let degree = this.degreeChangeForm.get('degree').value;
    if (degree == 'CS') {
      console.log('in cs remove sub');
      this.csSuboutcomes.removeAt(i);
    } else if (degree == 'CSE') {
      console.log('in cse remove sub');
      this.cseSuboutcomes.removeAt(i);
    }
  }

  createOutcome(): FormGroup {
    return this.builder.group({
      outcome_num: [''],
      outcome_desc: [''],
    });
  }

  createSuboutcome(): FormGroup {
    return this.builder.group({
      suboutcome_num: ['', Validators.required],
      suboutcome_desc: ['', Validators.required],
      suboutcome_poor: [''],
      suboutcome_dev: [''],
      suboutcome_sat: [''],
      suboutcome_ex: [''],
    });
  }

  submitNewOutcome() {
    let degree = this.degreeChangeForm.get('degree').value;
    if (degree == 'CS') {
      console.log('submitted this form', this.outcomeCSForm.value);
    } else if (degree == 'CSE') {
      console.log('submitted this form', this.outcomeCSEForm.value);
    }
    console.log(
      'is this keeping track of old outcomes?: ',
      this.currentOutcomeIDs
    );
    const reqs = this.cleanUpEntry(degree);
    console.log('right after clean up, reqs is at ', reqs);
    this.updateOutService.update(this.currentOutcomeIDs, degree, reqs);
  }

  removeOutcome(outcomeCatID:number, i:number){
    console.log('removing?? let\'s see. current outcome ids to save are now at ', this.currentOutcomeIDs)
    this.currentOutcomeIDs = this.currentOutcomeIDs.filter(x => x != outcomeCatID)
    console.log('now they\'re at ', this.currentOutcomeIDs)
    console.log(i)
    console.log(this.outcomes.map(item => {
      return item.cat_id !== i
    }))
    this.outcomes.splice(i,1)
    // this.outcomes = this.outcomes.filter(item => {
    //   item.cat_id === i
    // }
    // )

  }

  cleanUpEntry(degree: string) {
    let form = degree == 'CSE' ? this.outcomeCSEForm : this.outcomeCSForm;
    console.log('what are currentOutcomeIDs at? ', this.currentOutcomeIDs)
    const newOuts: OutcomeDescriptions[] = [];
    const newSubs: Suboutcome[] = [];

    for (let i = 0; i < form.get('newOutcome').value.length; i++) {
      newOuts.push({
        cat_id: form.get('newOutcome').value[i].outcome_num as number,
        outcome_description: form.get('newOutcome').value[i]
          .outcome_desc as string,
        out_id: (this.possibleOutcomes[-1] + i) as number,
      });
      for (let j = 0; j < form.get('newSuboutcome').value.length; j++) {
        newSubs.push({
          score_id: `score_${
            form.get('newOutcome').value[i].outcome_num as number
          }_${j + 1}`,
          suboutcome_name: `${
            form.get('newOutcome').value[i].outcome_num as number
          }.${j + 1}`,
          outcome_cat_id: form.get('newOutcome').value[i].outcome_num as number,
          suboutcome_description: form.get('newSuboutcome').value[j]
            .suboutcome_desc as string,
          poor_description: form.get('newSuboutcome').value[j]
            .suboutcome_poor as string,
          developing_description: form.get('newSuboutcome').value[j]
            .suboutcome_dev as string,
          satisfactory_description: form.get('newSuboutcome').value[j]
            .suboutcome_sat as string,
          excellent_description: form.get('newSuboutcome').value[j]
            .suboutcome_ex as string,
        });
      }
    }

    const reqs: NewRequirement = { new_outcome: newOuts, new_subs: newSubs };
    form.reset;
    return reqs;
  }

  // trigger to display outcomes and suboutcomes for specified degree
  getDegreeOutcomes() {
    this.csOutcomes.reset();
    this.cseOutcomes.reset();
    this.csSuboutcomes.reset();
    this.cseSuboutcomes.reset();

    this.outcomes = [];
    this.suboutcomes = [];
    this.possibleOutcomes = [1,2,3,4,5,6,7,8,9]
    let degree = this.degreeChangeForm.get('degree').value;
    this.degree = degree
    if (degree == 'CS') {
      this.cseOutcomes.clear()
      this.cseSuboutcomes.clear()
      this.updateOutService.getOutcomesOnly(degree).subscribe((res: any) => {
        this.outcomes = res;
        const cat_ids = res.map((x) => {
          return x.cat_id;
        });
        this.currentOutcomeIDs = cat_ids;

        this.possibleOutcomes = this.possibleOutcomes.filter(
          (x) => !cat_ids.includes(x)
          );

      });

      this.displayTable = true;
      this.updateOutService
        .getAllCurrentSuboutcomes(degree)
        .subscribe((res) => {
          this.suboutcomes = res;
        });
    } else if (degree == 'CSE') {
      this.csOutcomes.clear()
      this.csSuboutcomes.clear()
      this.updateOutService.getOutcomesOnly(degree).subscribe((res: any) => {
        this.outcomes = res;
        const cat_ids = res.map((x) => {
          return x.cat_id;
        });
        const out_ids = res.map((x) => {
          return x.out_id;
        });
        this.currentOutcomeIDs = cat_ids;
        this.possibleOutcomes = this.possibleOutcomes.filter(
          (x) => !cat_ids.includes(x)
        );;
        });


      this.displayTable = true;
      this.updateOutService
        .getAllCurrentSuboutcomes(degree)
        .subscribe((res) => {
          this.suboutcomes = res;
        });
    }

  }

  goBack() {
    this.router.navigateByUrl('/update-outcomes');
  }
}
