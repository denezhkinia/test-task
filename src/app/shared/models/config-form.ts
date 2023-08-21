import { FormControl } from '@angular/forms';

export interface ConfigForm {
  timer: FormControl<number>;
  size: FormControl<number>;
  ids: FormControl<string[]>;
}
