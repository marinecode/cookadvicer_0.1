
import {AbstractControl, ValidatorFn} from "@angular/forms";


export function cronValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let exp: string = control.value;
    let valid: boolean = false;
    if( exp != null ){
      exp = exp.trim();
      let expArray: string[] = exp.split(' ');
      valid = (expArray.length === 6 );
    }
    return !valid ? {'cronInvalid': {value: control.value}} : null;
  };
}
