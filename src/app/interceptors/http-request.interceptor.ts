import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No internet connection',
        });
      } else {
        switch (error.status) {
          case 401:
            messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Unauthorized. Please login again',
            });
            break;
        }
      }
      return throwError(() => error);
    }),
  );
};
