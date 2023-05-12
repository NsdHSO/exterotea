import { GetFromCPipe } from './get-from-c.pipe';
import { FormControl, FormGroup } from '@angular/forms';

describe('GetFromCPipe', () => {
  it('create an instance', () => {
    const pipe = new GetFromCPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return formControl', () => {
    const pipe = new GetFromCPipe();
    const a = new FormGroup({
      name: new FormControl('ivn')
    });
    expect(pipe.transform(a.controls['name'])).toBeInstanceOf(FormControl);
  });
});
