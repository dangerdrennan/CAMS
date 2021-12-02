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

      outcomes['A1'].format_cell = {
        font: {
          name: 'Times New Roman',
          bold: true
        }
      }

      const workBook: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workBook, outcomeTrends, 'Outcome Trends');
      XLSX.utils.book_append_sheet(workBook, outcomes, 'Outcomes');
      // XLSX.utils.book_append_sheet(workBook, outcome1, 'Outcome 1');

      XLSX.writeFile(workBook, `${fileName}${this.EXCEL_EXTENSION}`);
  }

}
