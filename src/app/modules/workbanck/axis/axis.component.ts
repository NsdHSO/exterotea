import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-axis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.scss']
})
export class AxisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
