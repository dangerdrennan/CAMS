import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
    this.getComments('CSE', 5)
  }


  getComments(degree: string, id: number) {
    this.outcomeComments = []
    if(degree == 'CS') {
      this.csOutcomes.filter((item) => {
        if(item.cat_id === id) {
          item.comments.forEach((data) => {
            this.outcomeComments.push(data)
          })
        }
      })
    }
    else if(degree == 'CSE') {
      this.cseOutcomes.filter((item) => {
        if(item.cat_id === id) {
          item.comments.forEach((data) => {
            // console.log("data", data)
            this.outcomeComments.push(data)
          })

        }
      })
    }
  }


}
