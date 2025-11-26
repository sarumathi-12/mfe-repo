import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-shared-select',
  templateUrl: './shared-select.component.html',
  styleUrls: ['./shared-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedSelectComponent),
      multi: true
    }
  ]
})
export class SharedSelectComponent implements ControlValueAccessor {

  @Input() options: any[] = [];
  @Input() valueField = '';
  @Input() displayField = '';
  @Input() addOptionLabel?: string;     
  @Input() addOptionClick?: () => void; 

  value: any;
  disabled = false;

  onChange = (v: any) => {};
  onTouched = () => {};

  writeValue(v: any) { this.value = v; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
