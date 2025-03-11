import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { catchError, delay, finalize, throwError } from 'rxjs';
import { getTokenFromCookie } from '../shared/utility/cookie';
import { LoaderService } from '../shared/services/loader.service';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const cookieService = inject(CookieService);
  const loaderService = inject(LoaderService);
  const token = getTokenFromCookie(cookieService);
  const withLoader = req.params.get('withLoader') === 'true';

  if (withLoader) {
    loaderService.isLoading.set(true);
  }

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Authorization token ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) =>
      httpErrorInterceptor(error, messageService),
    ),
    delay(300),
    finalize(() => loaderService.isLoading.set(false)),
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
  return throwError(() => error);
};
