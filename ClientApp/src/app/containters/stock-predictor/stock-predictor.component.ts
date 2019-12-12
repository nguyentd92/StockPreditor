import { Component, OnInit } from "@angular/core";
import { StockPredictorService } from "src/app/services/stock-predictor.service";
import { Observable } from "rxjs";
import { Stock } from "src/app/models/Stock";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { CalcDatePipe } from "src/app/core/pipes/calc-date.pipe";
import { DatePipe } from "@angular/common";

const INDEX_ARRAY = [0, 2, 5, 7, 10, 12, 15, 17, 20, 22, 25, 27, 30]

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

  predicts: number[];
  monthPrediction: number[];
  arrDate: string[];

  chosenId = "VNINDEX";
  mode = "high";
  modes = MODES;
  lastValues = [];

  predictRatio: {
    percent: number;
    diff: number;
  }[];

  showLastValues = [];

  currentHistory: Stock[];
  currentValues: any[];

  constructor(
    private stockService: StockPredictorService,
    private route: ActivatedRoute,
    private _calcDatePipe: CalcDatePipe,
    private _datePipe: DatePipe
  ) {
    this.route.params.subscribe(e => this.onSelect(e.id));
  }

  ngOnInit() {
    this.data$ = this.stockService.getAllStocks();
  }

  onSelect(id: string) {
    this.chosenId = id;
    this.stockService
      .getStockById(this.chosenId)
      .pipe(
        map(e => ({
          ...e,
          monthPrediction: [
            ...[].constructor(e.history.length - e.monthPrediction.length),
            ...e.monthPrediction
          ]
        }))
      )
      .subscribe(e => {
        this.currentHistory = this.data = e.history;
        this.predicts = e.monthPrediction;
        this.monthPrediction = e.seqPrediction;

        const arrDate = [];
        const arrRatio = [];

        for (let i = 0; i < this.monthPrediction.length; i++) {
          const date = this._calcDatePipe
            .transform(new Date(), INDEX_ARRAY[i])
            .toDateString();

          arrDate.push(this._datePipe.transform(date, "dd/MM/yyyy"));

          arrRatio.push(
            i == 0
              ? {
                percent: 0,
                diff: 0
              }
              : {
                  percent: (this.monthPrediction[i]/this.monthPrediction[i-1] - 1)*100,
                  diff: this.monthPrediction[i] - this.monthPrediction[i-1]
                }
          );
        }

        this.predictRatio = arrRatio

        this.arrDate = arrDate.reverse()

        this.monthPrediction = this.monthPrediction;

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
