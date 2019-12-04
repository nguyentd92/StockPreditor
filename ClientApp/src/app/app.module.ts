import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import * as fromComponents from "./components";
import * as fromContainers from "./containters";
import * as fromPages from "./pages";
import { StockPredictorComponent } from "./containters";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "ng2-charts";
import { P404Component, P500Component } from "./pages";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ChartsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxJsonLdModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "^VNINDEX", pathMatch: "full" },
      { path: "404", component: P404Component },
      { path: "500", component: P500Component },
      { path: ":id", component: StockPredictorComponent },
      { path: "**", redirectTo: "404", pathMatch: "full"}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ...fromComponents.components,
    ...fromContainers.containers,
    ...fromPages.pages
  ]
})
export class AppModule {}
