import { Component, Input, OnInit } from '@angular/core';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutcomeTrends } from '../OutcomeTrends';
import { PastAssessmentDisplay } from '../PastAssessmentDisplay';
import { ExportService } from '../services/export.service';
import { ResultsService } from '../services/results.service';
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

  constructor(private resultService: ResultsService, private exportService: ExportService) { }

  ngOnInit(): void {
    console.log("sem year deg", this.sem, this.year, this.degree)
    this.getTrends()
    // this.getAll()
    this.getOutcomes()
  }

  getTrends() {
    this.resultService.getOutcomeTrends(this.sem, this.year, this.degree).subscribe((res: OutcomeTrends[]) => {
      console.log("getting trends", res)
      this.trends = res
    })
  }

  getOutcomes() {
    this.resultService.getTotalsAndPercents(this.sem, this.year, this.degree).subscribe((res: TotesPers[]) => {
      console.log("getting outcomes", res)
      this.outcomes = res
    })
  }

  // export table to excel sheet
  exportTableToExcel() {

    this.exportService.exportTblToExcel(`${this.degree}_${this.sem}${this.year}`, this.trends, this.outcomes)
  }

  // exportTrends() {
  //   this.exportService.exportOnlyTrends(`OutcomeTrends_${this.degree}_${this.sem}${this.year}`, this.trends)
  //   this.trend = false
  // }


}
