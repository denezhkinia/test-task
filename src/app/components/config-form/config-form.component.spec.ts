import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { ConfigFormComponent } from './config-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfigFormComponent', () => {
  let component: ConfigFormComponent;
  let fixture: ComponentFixture<ConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigFormComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatIconModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFormComponent);
    component = fixture.componentInstance;
    component.config = { timer: null, size: null, ids: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add an id when calling addId', () => {
    const event = { value: 'newId', chipInput: { clear: jest.fn() } } as any;
    component.addId(event);
    expect(component.configForm.get('ids')?.value).toContain('newId');
    expect(event.chipInput.clear).toHaveBeenCalled();
  });

  it('should remove an id when calling removeId', () => {
    component.configForm.get('ids')?.setValue(['id1', 'id2']);
    component.removeId('id1');
    expect(component.configForm.get('ids')?.value).toEqual(['id2']);
  });

  it('should emit config changes when form values change', () => {
    const emitSpy = jest.spyOn(component.configChange, 'emit');
    component.configForm.get('timer')?.setValue(15);
    expect(emitSpy).toHaveBeenCalledWith({ timer: 15, size: null, ids: [] });
  });
});
