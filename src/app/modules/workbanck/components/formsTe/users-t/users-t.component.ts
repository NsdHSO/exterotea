import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-t',
  templateUrl: './users-t.component.html',
  styleUrls: [ './users-t.component.scss' ]
})
export class UsersTComponent implements OnInit {
  @Input()
  form: UntypedFormGroup | any;

  constructor (){
  }

  ngOnInit (): void{
  }

  public resetForm (): void{
    this.form.patchValue({
      age: null,
      monney: ''
    })
  }
}
