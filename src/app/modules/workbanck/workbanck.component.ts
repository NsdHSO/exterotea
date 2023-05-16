import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workbanck',
  templateUrl: './workbanck.component.html',
  styleUrls: [ './workbanck.component.scss' ]
})
export class WorkbanckComponent{
  public toggleBar: any;

  toggleB() {
    this.toggleBar = !this.toggleBar;
  }
}
