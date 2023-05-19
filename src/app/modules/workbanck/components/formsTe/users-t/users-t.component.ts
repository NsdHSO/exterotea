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

  constructor() {
  }

  ngOnInit(): void {
  }

  get hasDiffValue(): boolean {
    const value = this.form.getRawValue();
    return JSON.stringify({
      age: '',
      ageMax: ''
    }) === JSON.stringify({
      age: value.age,
      ageMax: value.ageMax
    });
  }

  public resetForm(): void {
    this.form.patchValue({
      age: '',
      monney: '',
      ageMax: ''
    });
    this.form.markAsDirty()
    this.form.updateValueAndValidity();
  }

  public clickSend (): void{
    this.form.markAsPristine()
    this.form.updateValueAndValidity();
  }
}
