import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  #formBuilder = inject(FormBuilder);
  keysFormPaymentInfo: KeysPaymentInfo[] = [
    'cartNumber',
    'cartExpired',
    'cvvCart',
    'holder',
  ];
  formPaymentInfo = this.#formBuilder.group({
    cartNumber: ['', Validators.required],
    cartExpired: ['', Validators.required],
    cvvCart: ['', Validators.required],
    holder: [null, Validators.required],
  });
  labelPaymentInfo: Record<KeysPaymentInfo, string> = {
    cartNumber: 'Cart number',
    cartExpired: 'Due date',
    cvvCart: 'CVV',
    holder: 'Holder',
  };
}
