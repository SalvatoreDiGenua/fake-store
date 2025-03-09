import { Component, input } from '@angular/core';

@Component({
  selector: 'app-field',
  imports: [],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
})
export class FieldComponent {
  label = input.required();
  value = input.required();
}
