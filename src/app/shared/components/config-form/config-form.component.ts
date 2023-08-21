import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigForm } from '../../models/config-form';
import { MatChipInputEvent } from '@angular/material/chips';
import { Config } from '../../models/config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'b2b-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit {
  @Input() config: Config;
  @Output() configChange = new EventEmitter<Config>();

  configForm: FormGroup<ConfigForm>;

  ngOnInit(): void {
    this.configForm = new FormGroup<ConfigForm>({
      timer: new FormControl<number>(this.config?.timer || null),
      size: new FormControl<number>(this.config?.size || null),
      ids: new FormControl<string[]>(this.config?.ids || []),
    });

    this.configForm.valueChanges
      .pipe(
        tap(() => this.configChange.emit(this.configForm.value)),
        untilDestroyed(this),
      )
      .subscribe();
  }

  addId(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const ids = this.configForm.get('ids')?.value;
    if (value) {
      ids.push(value);
      this.configForm.get('ids')?.setValue(ids);
    }
    event.chipInput!.clear();
  }
  removeId(id: string) {
    const ids = this.configForm.get('ids')?.value;
    const index = ids.indexOf(id);
    if (index >= 0) {
      ids.splice(index, 1);
      this.configForm.get('ids')?.setValue(ids);
    }
  }
}
