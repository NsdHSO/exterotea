import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn
} from '@angular/forms';
import { tap } from 'rxjs';

export function ageBeGreater(age : any, maxAge: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Perform validation logic using 'age' and 'maxAge'
    if (+age.value > +maxAge.value&& +maxAge.value <= 0) {
      return { ageBeGreater: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-workbanck',
  templateUrl: './workbanck.component.html',
  styleUrls: [ './workbanck.component.scss' ]
})
export class WorkbanckComponent implements OnInit {
  public toggleBar: any;
  public form: UntypedFormGroup | any;
  public togglForm: any;
  public triggered = false
  constructor() {
    this.form = new UntypedFormGroup({
      search: new UntypedFormControl('', {}),
      age: new UntypedFormControl('', {}),
      ageMax: new UntypedFormControl(
        '',
        {}),
      monney: new UntypedFormControl('', {})
    });
  }

  public ngOnInit(): void {
    this.form.valueChanges.pipe(tap(console.log)).subscribe();

    this.form.setValidators([ ageBeGreater(this.form.controls.age, this.form.controls.ageMax) ]);
    this.form.updateValueAndValidity()
  }

  toggleB() {
    this.triggered = !this.triggered
    this.toggleBar = !this.toggleBar;
  }

  public toogleForm(): void {
    this.togglForm = !this.togglForm;
  }
}
