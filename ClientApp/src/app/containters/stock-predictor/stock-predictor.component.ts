import { Component, OnInit } from "@angular/core";
import { StockPredictorService } from "src/app/services/stock-predictor.service";
import { Observable } from "rxjs";
import { Stock } from "src/app/models/Stock";
import { ActivatedRoute } from "@angular/router";

const MODES = [
  {
    title: "open",
    selected: true
  },
  {
    title: "high",
    selected: false
  },
  {
    title: "low",
    selected: false
  },
  {
    title: "close",
    selected: false
  }
];

const LAST_DATES = 12;

@Component({
  selector: "app-stock-predictor",
  templateUrl: "./stock-predictor.component.html",
  styleUrls: ["./stock-predictor.component.scss"]
})
export class StockPredictorComponent implements OnInit {
  data$: Observable<string[]>;
  data: any[];

  chosenId = "VNINDEX";
  mode = "high";
  modes = MODES;
  lastValues = [];

  showLastValues = [];

  currentHistory: Stock[];
  currentValues: any[];

  constructor(
    private stockService: StockPredictorService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(e => this.onSelect(e.id));
  }

  ngOnInit() {
    this.data$ = this.stockService.getAllStocks();
  }

  onSelect(id: string) {
    this.chosenId = id;
    this.stockService.getStockById(this.chosenId).subscribe(e => {
      this.currentHistory = e;
      this.data = e;

      const dataLength = this.data ? this.data.length : 0;
      this.lastValues =
        dataLength > LAST_DATES
          ? this.data.slice(dataLength - LAST_DATES - 1, dataLength - 1)
          : dataLength
          ? this.data
          : [];
      this.lastValues.reverse();

      this.switchMode(this.mode);
    });
  }

  public switchMode(mode: string) {
    this.mode = mode;

    this.modes.map(t =>
      t.title === mode ? (t.selected = true) : (t.selected = false)
    );

    const lastValues = [...this.lastValues];

    this.showLastValues = !lastValues.length
      ? []
      : lastValues
          .reverse()
          .reduce(
            (a, b) => {
              const last = a[a.length - 1];

              a.push({
                date: b.date,
                diff: b[mode] - last.value ? b[mode] - last.value : 0,
                percent: (b[mode] / last.value - 1) * 100,
                value: b[mode]
              });

              return a;
            },
            [{}]
          )
          .reverse()
          .slice(0, lastValues.length - 1);

    this.currentValues = this.data.map(el => ({
      value: el[this.mode.toLowerCase()],
      date: el.date
    }));
  }
}
