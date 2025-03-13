import { FormGroup } from '@angular/forms';

export const randomIntFromInterval = (min = 0, max = 5) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isNullOrUndefined = (value: unknown) => {
  return [null, undefined].includes(value);
};

export const scrollIntoView = (element: HTMLElement, withAnimation = false) => {
  if (!element) {
    return;
  }
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest',
  });
  if (withAnimation) {
    element.classList.add('jello-horizontal');
  }
};

export const validateFormGroup = (formGroup: FormGroup) => {
  Object.values(formGroup.controls).forEach((el) => el.markAsDirty());
};
