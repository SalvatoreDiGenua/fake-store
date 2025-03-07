import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { KeysPaymentInfo } from '../../../../models/paymentInfo';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-payment-info',
  imports: [ReactiveFormsModule, InputTextModule, IftaLabelModule],
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PaymentInfoComponent {
  keysFormPaymentInfo: KeysPaymentInfo[] = [
    'cartNumber',
    'cartExpired',
    'cvvCart',
    'holder',
  ];
  formPaymentInfo = new FormGroup({
    cartNumber: new FormControl('', Validators.required),
    cartExpired: new FormControl('', Validators.required),
    cvvCart: new FormControl('', Validators.required),
    holder: new FormControl(null, Validators.required),
  });
  labelPaymentInfo: Record<KeysPaymentInfo, string> = {
    cartNumber: 'Cart number',
    cartExpired: 'Due date',
    cvvCart: 'CVV',
    holder: 'Holder',
  };
}
