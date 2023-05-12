import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'getFromC'
})
/**
 * This is a pipe for transform
 */
export class GetFromCPipe implements PipeTransform {
  /** *************************************************************************************************
   * @param value coming from UI
   * @param args coming from UI
   * @return {void} Nothing to be returned
   */
  transform<T>(value: T, ...args: unknown[]): FormControl<T> {
    return value as unknown as FormControl;
  }
}
