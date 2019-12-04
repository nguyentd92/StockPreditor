import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-p404',
  templateUrl: './p404.component.html',
  styleUrls: ['./p404.component.scss']
})
export class P404Component {
  constructor(private location: Location) {}

  back() {
    this.location.back();
  }

}
