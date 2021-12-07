import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultsService } from '../services/results.service';
import { ShowComment } from '../ShowComments';

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


    // if(degree == 'CS') {
    //   this.csOutcomes.filter((item) => {
    //     if(item.cat_id === id) {
    //       item.comments.forEach((data) => {
    //         this.outcomeComments.push(data)
    //       })
    //     }
    //   })
    // }
    // else if(degree == 'CSE') {
    //   this.cseOutcomes.filter((item) => {
    //     if(item.cat_id === id) {
    //       item.comments.forEach((data) => {
    //         // console.log("data", data)
    //         this.outcomeComments.push(data)
    //       })

    //     }
    //   })
    // }
  }


}
