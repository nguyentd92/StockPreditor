import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import {
  debounceTime,
  distinctUntilChanged,
  flatMap,
  mergeMap
} from "rxjs/operators";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { delay } from "q";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.scss"]
})
export class NavMenuComponent {
  searchForm: FormGroup;

  subs: Subscription;

  suggestList: any;

  isFocused = false;

  isSearching = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      keyword: [""]
    });

    this.subs = this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap(
          formValue => (
            (this.isSearching = true),
            this.http.get("/api/GetAllStocks", {
              params: { keyword: formValue.keyword }
            })
          )
        )
      )
      .subscribe(e => ((this.suggestList = e), (this.isSearching = false)));
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  async focusOut() {
    this.isFocused = await delay(false, 200);
  }
}
