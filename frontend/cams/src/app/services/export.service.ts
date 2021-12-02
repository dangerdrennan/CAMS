import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'
import { OutcomeTrends } from '../OutcomeTrends';
import { TotesPers } from '../TotesPers';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  EXCEL_EXTENSION = '.xlsx'

  // outcomesTrends:OutcomeTrends[] = [
  //   {
  //     cat_description: 'Outcome 1: Analyze a complex computing problem and to apply principles of computing and other relevant disciplines to identify solutions.',
  //     cat_id: 0,
  //     poor_percent: 0.0,
  //     developing_percent: 0.0,
  //     satisfactory_percent: 0.0,
  //     excellent_percent: 0.0
  //   }
  // ]

  // outs:OutcomeDescriptions[] = [
  //   {
  //     outcome_description: '',
  //     cat_id: 0,
  //     out_id: 0
  //   }
  // ]


  constructor() { }

  exportTblToExcel(fileName: string, trends: OutcomeTrends[], outs: TotesPers[]) {
    console.log("trends", trends)
    console.log("outs", outs)
      const outcomeTrends: XLSX.WorkSheet = XLSX.utils.json_to_sheet(trends)
      const outcomes: XLSX.WorkSheet = XLSX.utils.json_to_sheet(outs)
      // const outcome1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(el.nativeElement);

      outcomeTrends['A1'].v = 'Outcome Description'
      outcomeTrends['B1'].v = 'Outcome ID'
      outcomeTrends['C1'].v = 'Poor Percent'
      outcomeTrends['D1'].v = 'Developing Percent'
      outcomeTrends['E1'].v = 'Satisfactory Percent'
      outcomeTrends['F1'].v = 'Excellent Percent'


      outcomes['A1'].v = 'Total'
      outcomes['B1'].v = 'Poor Count'
      outcomes['C1'].v = 'Developing Count'
      outcomes['D1'].v = 'Satisfactory Count'
      outcomes['E1'].v = 'Excellent Count'
      outcomes['F1'].v = 'Poor Percent'
      outcomes['G1'].v = 'Developing Percent'
      outcomes['H1'].v = 'Satisfactory Percent'
      outcomes['I1'].v = 'Excellent Percent'

      console.log('hi', outcomes['A1'])


      const workBook: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workBook, outcomeTrends, 'Outcome Trends');
      XLSX.utils.book_append_sheet(workBook, outcomes, 'Outcomes');
      // XLSX.utils.book_append_sheet(workBook, outcome1, 'Outcome 1');


      XLSX.writeFile(workBook, `${fileName}${this.EXCEL_EXTENSION}`);
  }

}
