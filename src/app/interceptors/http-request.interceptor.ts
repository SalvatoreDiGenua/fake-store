import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, delay, finalize, throwError } from 'rxjs';
import { LoaderService } from '../shared/services/loader.service';
import { CookieService } from '../shared/services/cookie.service';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const loaderService = inject(LoaderService);
  loaderInterceptor(req, loaderService);
  req = tokenInterceptor(req);
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
          detail: error.message,
        });
        break;
    }
  }
  return throwError(() => error);
};

const loaderInterceptor = (
  req: HttpRequest<unknown>,
  loaderService: LoaderService,
) => {
  const withLoader = req.params.get('withLoader') === 'true';

  if (!withLoader) {
    return;
  }
  loaderService.isLoading.set(true);
};

const tokenInterceptor = (req: HttpRequest<unknown>): HttpRequest<unknown> => {
  const cookieService = inject(CookieService);
  const token = cookieService.getTokenFromCookie();

  if (!token) {
    return req;
  }
  return req.clone({
    setHeaders: { Authorization: `Authorization token ${token}` },
  });
};
