import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-past-assessments',
  templateUrl: './past-assessments.component.html',
  styleUrls: ['./past-assessments.component.css']
})
export class PastAssessmentsComponent implements OnInit {
  public displayPast: boolean = false;
  public displayOutcome: boolean = false;
  public outcomeNum: number = 1;
  outcomeIdCS:any = []
  outcomeIdCSE:any = []
  outcomeTitle:any = []
  subTitle: any = []
  outcomeForm!: FormGroup;
  pastForm!: FormGroup;

  outcomeCS = [
    {
      id: 1,
      description: 'Outcome 1: Analyze a complex computing problem and to apply principles of computing and other relevant disciplines to identify solutions.'
    },
    {
      id: 2,
      description: 'Outcome 2: Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program’s discipline.'
    },
    {
      id: 3,
      description: 'Outcome 3: Communicate effectively in a variety of professional contexts, including technical and non-technical audiences for business, end-user, client, and computing contexts.'
    },
    {
      id: 5,
      description: 'Outcome 5: Function effectively as a member or leader of a team engaged in activities appropriate to the program’s discipline.'
    }
  ]

  outcomeCSE = [
    {
      id: 1,
      description: 'Outcome 1: An ability to identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics.'
    },
    {
      id: 2,
      description: 'Outcome 2: An ability to apply engineering design to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors.'
    },
    {
      id: 3,
      description: 'Outcome 3: An ability to communicate effectively with a range of audiences, including technical and non-technical audiences for business, end-user, client, and computing contexts.'
    },
    {
      id: 5,
      description: 'Outcome 5: An ability to function effectively on a team whose members together provide leadership, create a collaborative and inclusive environment, establish goals, plan tasks, and meet objectives.'
    },
    {
      id: 6,
      description: 'Outcome 6: An ability to develop and conduct appropriate experimentation, analyze and interpret data, and use engineering judgment to draw conclusions.'
    },
    {
      id: 7,
      description: 'Outcome 7: An ability to acquire and apply new knowledge as needed, using appropriate learning strategies.'
    }
  ]

  subCS = [
    {
      name: '1.1',
      score:  'score_1_1',
      outcomeCS_id:  1,
      description:  '1.	Analyzes problem and formulates requirements for the problem',
      poor:  'No attempt or fails to analyze accurately',
      developing:  'Analyzes but key details are missing or confused',
      satisfactory:  'Most details analyzed and key relationships identified',
      excellent:  'Clearly analyzes the challenge and embedded issues'
    },
    {
      name: '1.2',
      score:  'score_1_2',
      outcomeCS_id:  1,
      description:  '2.	Identifies solution by applying principles of computing',
      poor:  'Incorrect application of computing principles or fails to identify solutions',
      developing:  'Limited identification of solutions using computing principles',
      satisfactory:  'Reasonable identification of solutions using computing principles',
      excellent:  'In-depth and comprehensive utilization of computing principles, identification of solution well beyond expectations'
    },
    {
      name: '2.1',
      score:  'score_2_1',
      outcomeCS_id:  2,
      description:  '1.	Produces a design strategy, including tasks and subtasks, timelines, and evaluation of progress',
      poor:  'Does not produce a design strategy, or the design strategy is especially poor',
      developing:  'Limited attempts to form a design strategy',
      satisfactory:  'Produces a reasonable design strategy appropriate to the project',
      excellent:  'Produces an exceptional design strategy which exceeds expectations'
    },
    {
      name: '2.2',
      score:  'score_2_2',
      outcomeCS_id:  2,
      description:  '2.	Creates a final product for evaluation',
      poor:  'Does not create a final product, or the final product is especially poor',
      developing:  'Makes a start on a final product but is unable to meet final specifications',
      satisfactory:  'Creates a satisfactory final product which meets defined specifications',
      excellent:  'Creates an exceptional final product which exceeds expectations'
    },
    {
      name: '2.3',
      score:  'score_2_3',
      outcomeCS_id:  2,
      description:  '3.	Evaluates computing-based solution',
      poor:  'Limited or no evaluation',
      developing:  'Basic evaluation but has gaps',
      satisfactory:  'Satisfactory evaluation of solution, some utilization of computing principles (e.g. Big-O analysis, testing methodologies)',
      excellent:  'Exceptional and comprehensive evaluation of solution with strong tie to computing principles'
    },
    {
      name: '3.1',
      score:  'score_3_1',
      outcomeCS_id:  3,
      description:  '1.	Effectively organizes and structures a presentation or document',
      poor: 'No logical structure',
      developing:  'Some structure but erratic jumps in topic',
      satisfactory:  'Most information presented logically',
      excellent:  'All information presented logically'
    },
    {
      name: '3.2',
      score:  'score_3_2',
      outcomeCS_id:  3,
      description: '2.	Provides appropriate content to demonstrate  detailed knowledge of subject area',
      poor: 'No grasp of topic, cannot answer questions or extremely limited content',
      developing:  'Only rudimentary knowledge demonstrated',
      satisfactory:  'At ease with content and provides some detail',
      excellent:  'Full command of subject matter'
    },
    {
      name: '3.3',
      score:  'score_3_3',
      outcomeCS_id:  3,
      description:  '3.	Effectively communicates details appropriate to the audience, including questions',
      poor: 'Is unable to effectively communicate',
      developing:  'Only able to answer/explain in a limited manner; limited detail',
      satisfactory:  'Provides sufficient detail to describe/answer questions',
      excellent: 'Communicates  details exceptionally well'
    },
    {
      name: '3.4',
      score:  'score_3_4',
      outcomeCS_id:  3,
      description: '4.	Provides effective and appropriate visual aids and graphics',
      poor: 'None',
      developing: 'Weak support of the material, text or diagrams hard to see or understand',
      satisfactory:  'Mostly supports the material, most text and diagrams understandable',
      excellent:  'Text and diagrams strongly reinforce the presentation'
    },
    {
      name: '3.5',
      score:  'score_3_5',
      outcomeCS_id:  3,
      description:  '5.	Writes using proper spelling and grammar',
      poor: 'Significant errors',
      developing: 'Several errors',
      satisfactory:  'Minor errors',
      excellent:  'Negligible errors'
    },
    {
      name: '3.6',
      score:  'score_3_6',
      outcomeCS_id:  3,
      description:  '6.	Delivers oral presentation effectively',
      poor: 'Significant delivery problems, little to no audience contact; much too long or much too short',
      developing: 'Several mispronunciation, occasional audience contact; too long or too short',
      satisfactory: 'Clear voice, steady rate, some audience contact; slightly too long or too short',
      excellent:  'Clear voice, steady rate, strong audience contact, enthusiastic, confident; on time'
    },
    {
      name: '5.1',
      score:  'score_5_1',
      outcomeCS_id:  5,
      description:  '1.	Understands and fulfills roles and responsibilities',
      poor:'Does not fulfill team role duties',
      developing: 'Fulfills some, but not all, team role duties',
      satisfactory:  'Fulfills team role duties',
      excellent:  'Exceeds expectations with respect to team role duties'
    },
    {
      name: '5.2',
      score:  'score_5_2',
      outcomeCS_id:  5,
      description: '2.	Listens and works with others',
      poor: 'Does not consider other team members’ ideas or concerns',
      developing:'Sometimes considers other team members’ ideas or concerns',
      satisfactory: 'Often addresses other team members’ ideas or concerns',
      excellent: 'Is exceptionally adept at addressing other team members’ ideas or concerns'
    },
    {
      name: '5.3',
      score:  'score_5_3',
      outcomeCS_id:  5,
      description:  '3.	Communicates effectively with the group ',
      poor: 'Does not communicate to other members regarding the project progress',
      developing: 'Provides terse outline of status of the project and relevant updates',
      satisfactory:'Provides updates on a regular basis',
      excellent:  'Works exceptionally well to provide documentation of progress'
    }


  ]

  subCSE = [
    {
      name: '1.1',
      score:  'score_1_1',
      outcomeCSE_id:  1,
      description:  '1.	Identifies requirements and formulates solution by applying principles of engineering, science, and mathematics',
      poor:  'No attempt or fails to formulate accurately',
      developing:  'Formulates but key details are missing or confused',
      satisfactory:  'Most details identified and key relationships identified, appropriate solution formulated',
      excellent:  'Clearly identifies the challenge and  embedded issues and formulates an appropriate solution'
    },
    {
      name: '1.2',
      score:  'score_1_2',
      outcomeCSE_id:  1,
      description:  '2.	Solves complex engineering problem by applying principles of engineering, science, and mathematics',
      poor:  'Incorrect application of engineering principles or fails to implement solutions',
      developing:  'Limited solution or only partly applies science, math, and engineering principles',
      satisfactory:  'Reasonable solution using science, math, and engineering principles',
      excellent:  'In-depth and comprehensive utilization of science, math, and engineering principles in solution'
    },
    {
      name: '2.1',
      score:  'score_2_1',
      outcomeCSE_id:  2,
      description:  '1.	Creates a final product for evaluation that meets specified needs',
      poor:  'Does not create a final product, or the final product is especially poor',
      developing:  'Makes a start on a final product but is unable to meet final specifications',
      satisfactory:  'Creates a satisfactory final product which meets defined specifications',
      excellent:  'Creates an exceptional final product which exceeds expectations'
    },
    {
      name: '2.2',
      score:  'score_2_2',
      outcomeCSE_id:  2,
      description:  '2.	Solution considers public health, safety, welfare, human, environmental, and economic factors',
      poor:  'Limited or no  consideration of specified factors',
      developing:  'Basic evaluation and consideration but has gaps',
      satisfactory:  'Satisfactory consideration of specified factors ',
      excellent:  'Exceptional and comprehensive consideration of specified factors with strong tie to engineering design'
    }
  ]

  // get all available terms

  constructor(private router: Router, private builder: FormBuilder) {
    
   }

  ngOnInit(): void {

    this.displayPast = false;
    this.displayOutcome = false;
    this.outcomeForm = this.builder.group({
      term: ['', Validators.required],
      year: ['', Validators.required],
      degree: ['', Validators.required]
    })

    this.pastForm = this.builder.group({
      term: ['', Validators.required],
      year: ['', Validators.required],
      degree: ['', Validators.required]
    })
  }

  // trigger to find past assessment
  findPast() {
    this.outcomeForm.reset({
      term: '',
      year: ''
    })
    this.displayOutcome = false;
    this.displayPast = true;
    this.outcomeIdCS = []
    this.outcomeIdCSE = []
    this.outcomeNum = 1
    this.getTitles()
    this.getOutcomeNum()
    this.changeOutcomes(this.outcomeNum)

  }

  // trigger to find outcome trends
  findTrends() {
    this.pastForm.reset({
      term: '',
      year: ''
    })
    this.displayPast = false;
    this.displayOutcome = true;
    this.outcomeTitle = []
    this.getTitles()

  }

  // updates the current past assessment outcome being viewed
  changeOutcomes(id: number) {
    if(id) {
      this.outcomeNum = id
      this.subTitle = []
      this.getDescription(this.outcomeNum)
    }
    return this.outcomeNum
  }

  // get the evaluation criteria from each past assessment sub outcome
  getDescription(id: number) {
    // cs sub outcome descriptions(evaluation criteria)
    if(this.pastForm.get('degree')?.value === 'CS') {
      this.subCS.filter((item) => {
        if(item.outcomeCS_id === id) {
          this.subTitle.push(item.description)
        }
      })
      return this.subTitle
    }
    // cse sub outcome descriptions(evaluation criteria)
    else if(this.pastForm.get('degree')?.value === 'CSE') {
      this.subCSE.filter((item) => {
        if(item.outcomeCSE_id === id) {
          this.subTitle.push(item.description)
        }
      })
      return this.subTitle
    }
  }


  // stores past assessment outcome numbers for easy access
  getOutcomeNum() {
    // cs past assessment outcome number
    if(this.pastForm.get('degree')?.value === 'CS') {
      this.outcomeCS.filter((item) => {
        this.outcomeIdCS.push(item.id)

      })
      return this.outcomeIdCS
    }
    // cse past assessment outcome number
    else if(this.pastForm.get('degree')?.value === 'CSE') {
      this.outcomeCSE.filter((item) => {
        this.outcomeIdCSE.push(item.id)

      })
      return this.outcomeIdCSE
    }
  }

  // store the past assessment outcome titles
  getTitles() {
    // cs past assessment outcome title
    if((this.pastForm.get('degree')?.value === 'CS') || (this.outcomeForm.get('degree')?.value === 'CS')) {
      this.outcomeCS.filter((item) => {
        this.outcomeTitle.push(item.description)
      })
      return this.outcomeTitle
    }
    // cse past assessment outcome title
    else if((this.pastForm.get('degree')?.value === 'CSE') || (this.outcomeForm.get('degree')?.value === 'CSE')) {
      this.outcomeCSE.filter((item) => {
        this.outcomeTitle.push(item.description)
      })
      return this.outcomeTitle
    }
  }


  ngDestroy() {
    this.outcomeForm.reset({
      term: '',
      year: ''
    })

    this.pastForm.reset({
      term: '',
      year: ''
    })
  }
}
