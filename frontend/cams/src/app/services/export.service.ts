import { ElementRef, Injectable } from '@angular/core';
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  EXCEL_EXTENSION = '.xlsx'
  constructor() { }

  exportTblToExcel(el: ElementRef, fileName: string) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(el.nativeElement);

      const workBook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, ws, 'PastAssessment1');

      XLSX.writeFile(workBook, `${fileName}${this.EXCEL_EXTENSION}`);
  }



}
