import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-axe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-axe.component.html',
  styleUrls: ['./simple-axe.component.scss']
})
export class SimpleAxeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
