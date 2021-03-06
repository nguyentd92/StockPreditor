import { Component, OnInit, ViewChild, Input, OnChanges } from "@angular/core";
import { BaseChartDirective, Color, Label } from "ng2-charts";
import { ChartOptions, ChartDataSets } from "chart.js";
import * as pluginAnnotations from "chartjs-plugin-annotation";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"]
})
export class StockComponent implements OnChanges {
  @Input() values: {
    value: number;
    date: string;
  }[];

  @Input() predicts: number[];

  public lineChartLabels: Label[] = [];

  chartBoundaries: {
    column: Label[];
    row: any[];
  } = {
    column: [],
    row: []
  };

  public lineChartData: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Giá CP" },
    { data: [], label: "Dự đoán"}
  ];

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left"
        },
        {
          id: "y-axis-1",
          position: "right",
          gridLines: {
            color: "rgba(255,0,0,0.3)"
          },
          ticks: {
            fontColor: "red"
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "#FF5831",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "#ff5831",
            content: "LineAnno"
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "transparent",
      borderColor: "#FF5831",
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: "black",
      pointHoverBorderColor: "black"
    },
    {
      // dark grey
      backgroundColor: "transparent",
      borderColor: "blue",
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: "black",
      pointHoverBorderColor: "black"
    },
    {
      // red
      backgroundColor: "rgba(255,0,0,0.3)",
      borderColor: "red",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnChanges() {
    console.log(this.lineChartData)
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
    if (this.values) {
      this.values.map(e => {
        this.lineChartLabels.push(e.date);
        this.lineChartData[0].data.push(e.value);
      });
    }
    if (this.predicts) {
      this.lineChartData[1].data = this.predicts;
    }
  }
  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
