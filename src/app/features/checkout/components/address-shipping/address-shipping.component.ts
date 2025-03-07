import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeysAddressShipping } from '../../../../models/addressShipping';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-address-shipping',
  imports: [ReactiveFormsModule, InputTextModule, IftaLabelModule],
  templateUrl: './address-shipping.component.html',
  styleUrl: './address-shipping.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddressShippingComponent {
  #formBuilder = inject(FormBuilder);
  keysFormAddressShipping: KeysAddressShipping[] = [
    'name',
    'surname',
    'email',
    'cellphone',
    'telephone',
    'state',
    'city',
    'address',
    'streetNumber',
  ];
  formAddressShipping = this.#formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: [
      '',
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ],
    cellphone: ['', Validators.required],
    telephone: [''],
    state: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    streetNumber: [null, Validators.required],
  });
  labelAddressShipping: Record<KeysAddressShipping, string> = {
    name: 'Name',
    surname: 'Surname',
    email: 'Email',
    cellphone: 'Cellphone',
    telephone: 'Telephone',
    state: 'State',
    city: 'City',
    address: 'Address',
    streetNumber: 'Street number',
  };
}
