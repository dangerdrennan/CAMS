import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutcomeTrends } from '../OutcomeTrends';
import { PastAssessmentDisplay } from '../PastAssessmentDisplay';
import { TotesPers } from '../TotesPers';


@Injectable({
  providedIn: 'root'
})
export class ExportService {
  EXCEL_EXTENSION = '.xlsx'
  comb = []
  subInfo = []
  newTrends = []
  descriptions = []
  pers = []
  combo = []

  constructor() {}

  exportTblToExcel(fileName: string, trends: OutcomeTrends[], outs: TotesPers[], outDesc: OutcomeDescriptions[], allInfo: PastAssessmentDisplay[]) {
    this.comb = []
    this.subInfo = []
    this.newTrends = []
    this.descriptions = []
    this.pers = []
    this.combo = []

    // create workbook
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();


    // filter just the needed data for outcome trends
    trends.filter((item: OutcomeTrends) => {
      const trnds = {
        desc: item.cat_description,
        poor: item.poor_percent,
        dev: item.developing_percent,
        sat: item.satisfactory_percent,
        ex: item.excellent_percent
      }
      this.newTrends.push(trnds)
    })

    // add trends to workbook
    const outcomeTrends: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.newTrends)


    // filter just the descriptions of the outcomes
    outDesc.filter((item: OutcomeDescriptions) => {
      let obj = {
        ['Outcome Descriptions']: item.outcome_description,
        out_cat_id: item.cat_id
      }
      this.descriptions.push(obj)
    })

    // filter the suboutcomes description, counts and totals
    allInfo.filter((item) => {
      let obj = {
        sub_id: item.cat_id,
        ['Suboutcome Description']: item.s_description,
        ['Poor Count']: item.poor_count,
        ['Developing Count']: item.developing_count,
        ['Satisfactory Count']: item.satisfactory_count,
        ['Excellent Count']: item.excellent_count,
        ['Totals']: item.total
      }
      this.subInfo.push(obj)
    })

    // filter the suboutcome overall totals and percents
    outs.filter((item) => {
      let obj = {
        ['Poor Count']: item.poor_count,
        ['Developing Count']: item.developing_count,
        ['Satisfactory Count']: item.satisfactory_count,
        ['Excellent Count']: item.excellent_count,
        ['Total']: item.total,
        ['Poor Percent']: item.poor_percent,
        ['Developing Percent']: item.developing_percent,
        ['Satisfactory Percent']: item.satis_percent,
        ['Excellent Percent']: item.ex_percent
      }
      this.pers.push(obj)
    })

     // push each outcome description object to array
    for(let i = 0; i < this.descriptions.length; i+=1) {
      this.combo.push(this.descriptions[i])
      // push the suboutcomes objects to array
      for(let j = 0; j < this.subInfo.length; j+=1) {
        // only push to array when the ID's match to not repeat outcome description each time
        if(this.descriptions[i].out_cat_id === this.subInfo[j].sub_id) {
          this.combo.push(this.subInfo[j])
        }
      }

       // push the percents and overall totals obj to an array
      for(let k = 0; k < this.pers.length; k+=1) {
        // only push at each outcome to not repeat all percents at each suboutcome
        if(i===k) {
          this.combo.push(this.pers[k])
        }
      }
    }

    // add the array of objects with the added description and totals & percents to worksheet
    const outcomes: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.combo)

    // custom outcome trends headers
    outcomeTrends['A1'].v = 'Outcome Description'
    outcomeTrends['B1'].v = 'Poor Percent'
    outcomeTrends['C1'].v = 'Developing Percent'
    outcomeTrends['D1'].v = 'Satisfactory Percent'
    outcomeTrends['E1'].v = 'Excellent Percent'

    //custom outcomes headers
    outcomes['B1'].v = 'Outcome ID'
    outcomes['C1'].v = 'Suboutcome ID'
    outcomes['J1'].v = 'Overall Total'


    // append the worksheets to the workbook
    XLSX.utils.book_append_sheet(workBook, outcomeTrends, 'Outcome Trends');
    XLSX.utils.book_append_sheet(workBook, outcomes, 'Outcomes');

    // export the workbook
    XLSX.writeFile(workBook, `${fileName}${this.EXCEL_EXTENSION}`);
  }


}
