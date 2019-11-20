import { Component, OnInit } from '@angular/core';
import { StockPredictorService } from 'src/app/services/stock-predictor.service';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/models/Stock';

@Component({
  selector: 'app-stock-predictor',
  templateUrl: './stock-predictor.component.html',
  styleUrls: ['./stock-predictor.component.scss']
})
export class StockPredictorComponent implements OnInit {
  data$: Observable<string[]>

  chosenId: string = "VNINDEX"
  mode: string = "High"

  currentHistory: Stock[]
  currentValues: number[]

  // data: {
  //   chosen_id: string;
  //   mode: string;
  //   predictions: number[];
  //   history: any;
  //   stocks: {
  //     stock_id: string;
  //     name: string;
  //   }[];
  // } = {
  //   chosen_id: "VNINDEX",
  //   mode: "High",
  //   predictions: [],
  //   history: [],
  //   stocks: [
  //     {
  //       stock_id: "VNINDEX",
  //       name: "VNINDEX"
  //     }
  //   ]
  // };

  constructor(private stockService: StockPredictorService) { }

  ngOnInit() {
    this.data$ = this.stockService.getAllStocks();
    this.onSelect()
  }

  onSelect() {
    this.stockService.getStockById(this.chosenId).subscribe(e => {
      this.currentHistory = e;
      this.currentValues = e.map(el => ({
        value: el[this.mode.toLowerCase()],
        date: el.date
      }))
    })
  }

  public switchMode(mode: string) {
    this.mode = mode;
    this.onSelect();
  }

  // private setYearMode(mode: string) {
  //   this.renewChartBoundaries();
  //   this.data.history.forEach(e => {
  //     this.lineChartLabels.push(e.Date);
  //     this.lineChartData[0].data.push(e[mode]);
  //   });
  // }

  // private renewChartBoundaries() {
  //   this.lineChartLabels = [];
  //   this.lineChartData[0].data = [];
  // }
}
