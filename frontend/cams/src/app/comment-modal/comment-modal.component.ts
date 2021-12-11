import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultsService } from '../services/results.service';
import { ShowComment } from '../ShowComments';

/**
 * This component holds the modal that displays the stored comments in the past results tab. You can see previous comments that were left on a graded assessment along with the professor that left the comment and which outcome the commment pertains to.
 */

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
  comments$: Observable<ShowComment[]>;

  constructor(public resService: ResultsService) {}

  // on page load, grab the stored comments
  ngOnInit(): void {
    this.getComments()
  }
  ngOnChanges() {
    this.getComments()
  }

  // request to grab the comments from the database
  getComments() {
    if (this.id == undefined){
      this.resService.getPastComments(this.sem,this.year,this.degree).subscribe(res=>{
        this.comments = res
      })
    }
    this.outcomeComments = []
    this.outcomeComments= this.comments.filter(x => x.cat_id == this.id)
  }


}
