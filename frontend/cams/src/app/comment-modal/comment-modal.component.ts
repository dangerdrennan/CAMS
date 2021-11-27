import { Component, Input, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { ResultsService } from '../services/results.service';
import { ShowComment } from '../ShowComments';
import { Suboutcome } from '../Suboutcome';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent implements OnInit {
  @Input() comments: ShowComment[]
  @Input() id:number
  @Input() num:number
  @Input() degree:string
  @Input() sem: string
  @Input() year:number
  outcomeComments = []

  csOutcomes = [
    {
      cat_id: 1,
      comments: ['comment 1 in outcome 1', 'comment 2 in outcome 1', 'comment 3 in outcome 1', 'comment 4 in outcome 1']
    },
    {
      cat_id: 2,
      comments: ['comment 1 in outcome 2', 'comment 2 in outcome 2', 'comment 3 in outcome 2', 'comment 4 in outcome 2']
    },
    {
      cat_id: 3,
      comments: ['comment 1 in outcome 3', 'comment 2 in outcome 3', 'comment 3 in outcome 3', 'comment 4 in outcome 3']
    },
    {
      cat_id: 5,
      comments: ['comment 1 in outcome 5', 'comment 2 in outcome 5', 'comment 3 in outcome 5', 'comment 4 in outcome 5']
    }
  ]

  cseOutcomes = [
    {
      cat_id: 1,
      comments: ['comment 1 in outcome 1', 'comment 2 in outcome 1', 'comment 3 in outcome 1', 'comment 4 in outcome 1']
    },
    {
      cat_id: 2,
      comments: ['comment 1 in outcome 2', 'comment 2 in outcome 2', 'comment 3 in outcome 2', 'comment 4 in outcome 2']
    },
    {
      cat_id: 3,
      comments: ['comment 1 in outcome 3', 'comment 2 in outcome 3', 'comment 3 in outcome 3', 'comment 4 in outcome 3']
    },
    {
      cat_id: 5,
      comments: ['comment 1 in outcome 5', 'comment 2 in outcome 5', 'comment 3 in outcome 5']
    },
    {
      cat_id: 6,
      comments: ['comment 1 in outcome 6', 'comment 2 in outcome 6', 'comment 3 in outcome 6', 'comment 4 in outcome 6']
    },
    {
      cat_id: 7,
      comments: ['comment 1 in outcome 7', 'comment 2 in outcome 7', 'comment 3 in outcome 7', 'comment 4 in outcome 7']
    }
  ]
  comments$: Observable<ShowComment[]>;
  out:OutcomeDescriptions = {
    cat_id:111,
    outcome_description:'newest description1'
  }
  out2:OutcomeDescriptions = {
    cat_id:112,
    outcome_description:'newest description2'
  }
  sub:Suboutcome = {
    score_id: 's1',
    outcome_cat_id: 111,
    suboutcome_name: 'name sub 1',
    suboutcome_description: 'desc sub 1',
    poor_description: 'poor sub 1',
    developing_description: 'dev sub 1',
    satisfactory_description: 'sat sub 1',
    excellent_description: 'ex sub 1',
  }
  sub2:Suboutcome = {
    score_id: 's2',
    outcome_cat_id: 111,
    suboutcome_name: '1',
    suboutcome_description: 'newes2',
    poor_description: 'newes2',
    developing_description: 'newes2',
    satisfactory_description: 'newest2',
    excellent_description: 'newest2',
  }

  sub3:Suboutcome = {
    score_id: 's3',
    outcome_cat_id: 112,
    suboutcome_name: 'name sub 3',
    suboutcome_description: 'desc sub 3',
    poor_description: 'poor sub 3',
    developing_description: 'dev sub 3',
    satisfactory_description: 'sat sub 3',
    excellent_description: 'ex sub 3',
  }
  sub4:Suboutcome = {
    score_id: 's4',
    outcome_cat_id: 112,
    suboutcome_name: '1',
    suboutcome_description: 'newest4',
    poor_description: 'newest4',
    developing_description: 'newest4',
    satisfactory_description: 'newest4',
    excellent_description: 'newest4',
  }
  new_req1 = {
    new_outcome: [this.out,this.out2],
    new_subs: [this.sub,this.sub2,this.sub3,this.sub4]
  }
  // new_req2 = {
  //   new_outcome: this.out2,
  //   new_subs: [this.sub3,this.sub4]
  // }

  constructor(public resService: ResultsService) {
     //this.comments$ = this.resService.getPastComments(this.sem,this.year,this.degree)
     
   }

  ngOnInit(): void {
    // this.resService.getPastComments(this.sem, this.year, this.degree).subscribe(res=>{
    //   console.log(res)
    // })
    console.log(`in the comment modal the comments are ${this.comments}`)
    console.log(`in the comment modal the id is ${this.id}`)
    this.getComments()
  }
  ngOnChanges() {
    // create header using child_id
    console.log(`in the comment modal onChanges the comments are ${this.comments}`)
    console.log(`in the comment modal onChanges the id is ${this.id}`)
    this.getComments()
  }


  getComments() {
    if (this.id == undefined){
      this.resService.getPastComments(this.sem,this.year,this.degree).subscribe(res=>{
        this.comments = res
      })
    }
    this.outcomeComments = []
    this.outcomeComments= this.comments.filter(x => x.cat_id == this.id)
  }

    
   test(){
     this.resService.sampleUpdate([1,2,3,4],'CS',this.new_req1)

   
  }



}
