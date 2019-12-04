import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StockPredictorService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  //Get all id stocks in app
  public getAllStocks(): Observable<any> {
    return this.http.get(this.baseUrl + "api/GetAllStocks");
  }

  public getStockById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + "api/getStockById/" + id);
  }
}
