import { Component } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'time-input',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './time-input.component.html',
  styleUrl: './time-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TimeInputComponent
    }
  ]
})
export class TimeInputComponent implements ControlValueAccessor {

  formGroup = new FormGroup({
    hours: new FormControl(0),
    minutes: new FormControl(0),
    seconds: new FormControl(0)
  })

  writeValue(obj: number): void {
    if (obj === null || obj === undefined) {
      return;
    }
    const hours = Math.floor(obj / 3600);
    const minutes = Math.floor((obj % 3600) / 60);
    const seconds = obj % 60;
    this.formGroup.patchValue({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  onChange = (quantity: any) => {};

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.formGroup.valueChanges.subscribe(value => {
      const totalSeconds = (value.hours ?? 0) * 3600 + (value.minutes ?? 0) * 60 + (value.seconds ?? 0);
      this.onChange(totalSeconds);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.formGroup.valueChanges.subscribe(() => {
      this.onTouched();
    });
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

}
