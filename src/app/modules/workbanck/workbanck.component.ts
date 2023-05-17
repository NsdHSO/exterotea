import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-workbanck',
  templateUrl: './workbanck.component.html',
  styleUrls: [ './workbanck.component.scss' ]
})
export class WorkbanckComponent implements OnInit {
  public toggleBar: any;
  public form: UntypedFormGroup | any;
  public togglForm: any;

  constructor() {
    this.form = new UntypedFormGroup({
      search: new UntypedFormControl('', {}),
      age: new UntypedFormControl('', {}),
      monney: new UntypedFormControl('', {})
    });
  }

  public ngOnInit(): void {
    this.form.valueChanges.pipe(tap(console.log)).subscribe();
  }

  toggleB() {
    this.toggleBar = !this.toggleBar;
  }

  public toogleForm(): void {
    this.togglForm = !this.togglForm;
  }
}
