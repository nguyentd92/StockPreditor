import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'calcDate'
})
export class CalcDatePipe implements PipeTransform {

  transform(value: Date, days: number, isAddition: boolean = true): Date {
    const temp = isAddition ? 1 : -1;
    return new Date(value.getTime() + (days * 24 * 60 * 60 * 1000)*temp)
  }

}