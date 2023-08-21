import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberDirective } from './directives/numbers-only.directive';
import { ConfigFormComponent } from './components/config-form/config-form.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [NumberDirective, ConfigFormComponent, TableComponent],
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatInputModule, MatChipsModule, MatIconModule, ReactiveFormsModule],
  exports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    ConfigFormComponent,
    TableComponent,
  ],
})
export class SharedModule {}
