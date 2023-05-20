import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn
} from '@angular/forms';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';

export function ageBeGreater(age: any, maxAge: any): ValidatorFn {
  return (control: AbstractControl): {[ key: string ]: any} | null => {
    // Perform validation logic using 'age' and 'maxAge'
    if ( +age.value > +maxAge.value && +maxAge.value <= 0 ) {
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
export class WorkbanckComponent implements OnInit, OnDestroy {
  public toggleBar: any;
  public form: UntypedFormGroup | any;
  public togglForm: any;
  public triggered = false;
  private _destroy$ = new Subject();

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
    this.form.valueChanges.pipe(debounceTime(1000),
      tap(console.log),
      tap(() => this.form.setValidators([ ageBeGreater(
        this.form.controls.age,
        this.form.controls.ageMax) ])
      ),
      takeUntil(this._destroy$)).subscribe();

    this.form.updateValueAndValidity();
  }

  toggleB() {
    this.triggered = !this.triggered;
    this.toggleBar = !this.toggleBar;
  }

  public toogleForm(): void {
    this.togglForm = !this.togglForm;
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
