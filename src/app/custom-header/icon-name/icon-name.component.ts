import { Component, HostBinding } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

const name = 'ivan';

@Component({
  selector: 'app-icon-name',
  templateUrl: './icon-name.component.html',
  styleUrls: [ './icon-name.component.scss' ]
})
/** *************************************************************************************************
 * @param {CdkDragDrop<string[]>} event coming from UI
 * @return {void} Nothing to be returned
 */
export class IconNameComponent {
  @HostBinding('attr.class') cssClass = 'iconName';

  personInfo: FormGroup;

  sdkId: FormControl;

  constructor(private readonly _fb: FormBuilder) {
    this.sdkId = new FormControl(0);

    this.personInfo = _fb.group({
      sdkId: [ '', Validators.required ]
    });
  }

  submit($event: any) {
    console.log($event.value);
  }
}
