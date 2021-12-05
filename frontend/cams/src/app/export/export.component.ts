import { Component, Input, OnInit } from '@angular/core';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutcomeTrends } from '../OutcomeTrends';
import { PastAssessmentDisplay } from '../PastAssessmentDisplay';
import { ExportService } from '../services/export.service';
import { ResultsService } from '../services/results.service';
import { UpdateOutcomesService } from '../services/update-outcomes.service';
import { TotesPers } from '../TotesPers';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  @Input() sem: string
  @Input() year: number
  @Input() degree: string
  @Input() id: number
  @Input() trend: boolean

  trends: OutcomeTrends[] = []
  outcomes: TotesPers[] = []
  outDesc: OutcomeDescriptions[] = []
  allInfo: PastAssessmentDisplay[] = []

  constructor(private resultService: ResultsService, private exportService: ExportService, private updateService: UpdateOutcomesService) { }

  ngOnInit(): void {
    console.log("sem year deg", this.sem, this.year, this.degree)
    this.getTrends()
    this.getOutcomesOnly()
    this.getOutcomes()
    this.getAllInfo()
  }

  getOutcomesOnly() {
    this.outDesc = []
    this.resultService.getPastOutcomeDescription(this.degree, this.sem, this.year).subscribe((res: OutcomeDescriptions[]) => {
      console.log("alll outcomes", res)
      this.outDesc = res
      console.log("arrrrrray", this.outDesc)
    })
  }

  getTrends() {
    this.trends = []
    this.resultService.getOutcomeTrends(this.sem, this.year, this.degree).subscribe((res: OutcomeTrends[]) => {
      console.log("getting trends", res)
      this.trends = res
    })
  }

  getOutcomes() {
    this.outcomes = []
    this.resultService.getTotalsAndPercents(this.sem, this.year, this.degree).subscribe((res: TotesPers[]) => {
      console.log("getting outcomes", res)
      this.outcomes = res
    })
  }

  getAllInfo() {
    this.allInfo = []
    this.resultService.getAllPast(this.sem, this.year, this.degree).subscribe((res) => {
      console.log("infooo", res)
      this.allInfo = res
    })
  }

  // export table to excel sheet
  exportTableToExcel() {

    this.exportService.exportTblToExcel(`${this.degree}_${this.sem}${this.year}`, this.trends, this.outcomes, this.outDesc, this.allInfo)
  }

  // exportTrends() {
  //   this.exportService.exportOnlyTrends(`OutcomeTrends_${this.degree}_${this.sem}${this.year}`, this.trends)
  //   this.trend = false
  // }


}
