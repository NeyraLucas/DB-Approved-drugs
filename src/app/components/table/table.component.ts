import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDrugs } from 'src/app/models/Drugs';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() table_name!: string;
  @Input() table_description!: string;
  @Input() button_name!: string;
  public drugs_arr$!: Observable<IDrugs[]>;
  //paginator
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalPages = 0;
  public totalItems = 0;
  public arrDrugs: IDrugs[] = [];

  ngOnInit(): void {
    this.drugs_arr$ = of([
      {
        smile: 'C[C@@H]1O[C@@H]1P(=O)(O)O',
        name: 'Fosfomycin',
        rating: 'Phosphonic antibiotic',
        uses: 'Urinary Tract Infections',
        ve: 'Oral',
        ff1: 'Comprimidos',
        vp: 'cutaneo, vaginal',
        ff2: 'crema, solucion, comprimidos, espuma, capsulas',
        reference: 'VADEMECUM',
      },
    ]);
    this.drugs_arr$.subscribe(e => {
      this.totalItems = e.length;
      this.arrDrugs = e;
    });
  }

  onFileChange(event: any) {
    console.log('upload file');
    console.log(this.arrDrugs);

    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
      const dataWithoutHeader = jsonData.slice(1); // Excluir el primer elemento
      //paginator
      this.totalPages = Math.ceil(dataWithoutHeader.length / this.itemsPerPage);

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      const pagedData = dataWithoutHeader.slice(startIndex, endIndex);
      //save new arr
      const drugsArrSlice: IDrugs[] = [];
      const drugsArrOriginal: IDrugs[] = [];
      this.totalItems = dataWithoutHeader.length;
      pagedData.forEach((row: any) => {
        const drug: IDrugs = {
          smile: row[0],
          name: row[1],
          rating: row[2],
          uses: row[3],
          ve: row[4],
          ff1: row[5],
          vp: row[6],
          ff2: row[7],
          reference: row[8],
        };
        drugsArrSlice.push(drug);
      });
      this.drugs_arr$ = of(drugsArrSlice);
      //save original arr
      dataWithoutHeader.forEach((row: any) => {
        const drug: IDrugs = {
          smile: row[0],
          name: row[1],
          rating: row[2],
          uses: row[3],
          ve: row[4],
          ff1: row[5],
          vp: row[6],
          ff2: row[7],
          reference: row[8],
        };
        drugsArrOriginal.push(drug);
      });
      this.arrDrugs = drugsArrOriginal;
      console.log(this.arrDrugs);
    };
    fileReader.readAsArrayBuffer(file);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  private updatePagedData() {
    console.log('update');
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pagedData = this.arrDrugs.slice(startIndex, endIndex);
    console.log(this.arrDrugs);
    console.log(pagedData);

    const drugsArr: IDrugs[] = [];
    pagedData.forEach((row: IDrugs) => {
      const drug: IDrugs = {
        smile: row.smile,
        name: row.name,
        rating: row.rating,
        uses: row.uses,
        ve: row.ve,
        ff1: row.ff1,
        vp: row.vp,
        ff2: row.ff2,
        reference: row.reference,
      };
      drugsArr.push(drug);
    });

    console.log(drugsArr);

    this.drugs_arr$ = of(drugsArr);
  }
}
