import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  formAddressShipping = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    cellphone: new FormControl('', Validators.required),
    telephone: new FormControl(''),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    streetNumber: new FormControl(null, Validators.required),
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
