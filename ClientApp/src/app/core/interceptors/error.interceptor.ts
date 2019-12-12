import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map(
        r => (console.log(r), r)
      ),
      catchError(err => {
        switch (err.status) {
          case 404:
            this.router.navigate(["/404"]);
            break;
          case 500:
            this.router.navigate(["/404"]);
            break;
          default:
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
