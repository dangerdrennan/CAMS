import { Component, Input, OnInit } from '@angular/core';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutcomeTrends } from '../OutcomeTrends';
import { PastAssessmentDisplay } from '../PastAssessmentDisplay';
import { ExportService } from '../services/export.service';
import { ResultsService } from '../services/results.service';
import { UpdateOutcomesService } from '../services/update-outcomes.service';
import { TotesPers } from '../TotesPers';

/**
 * This component grabs all of the stored information to pass to the export service to be able to create a Excel workbook that holds all of the past assessment averages as well as the outcome trend averages.
 */

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

  // on load grab all these function requests
  ngOnInit(): void {
    this.getTrends()
    this.getOutcomesOnly()
    this.getOutcomes()
    this.getAllInfo()
  }

  // request to grab the outcome desctiptions
  getOutcomesOnly() {
    this.outDesc = []
    this.resultService.getPastOutcomeDescription(this.degree, this.sem, this.year).subscribe((res: OutcomeDescriptions[]) => {
      this.outDesc = res
    })
  }

  // request to grab the outcome trends information
  getTrends() {
    this.trends = []
    this.resultService.getOutcomeTrends(this.sem, this.year, this.degree).subscribe((res: OutcomeTrends[]) => {
      this.trends = res
    })
  }

  // request to grab all of the totals and percents pertaining to outcome trends
  getOutcomes() {
    this.outcomes = []
    this.resultService.getTotalsAndPercents(this.sem, this.year, this.degree).subscribe((res: TotesPers[]) => {
      this.outcomes = res
    })
  }

  getAllInfo() {
    this.allInfo = []
    this.resultService.getAllPast(this.sem, this.year, this.degree).subscribe((res) => {
      this.allInfo = res
    })
  }

  // export table to excel service
  exportTableToExcel() {
    this.exportService.exportTblToExcel(`${this.degree}_${this.sem}${this.year}`, this.trends, this.outcomes, this.outDesc, this.allInfo)
  }


}
