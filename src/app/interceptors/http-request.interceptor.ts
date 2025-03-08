import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      httpErrorInterceptor(error, messageService);
      return throwError(() => error);
    }),
  );
};

const httpErrorInterceptor = (
  error: HttpErrorResponse,
  messageService: MessageService,
) => {
  if (error.status === 0) {
    messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No internet connection',
    });
  } else {
    switch (error.status) {
      case 401:
      case 403:
      case 404:
      case 500:
        messageService.add({
          severity: 'error',
          summary: error.statusText,
          detail: error.error,
        });
        break;
    }
  }
};
