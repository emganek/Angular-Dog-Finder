import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_KEY } from '../inits/api-key-loader/api-key-loader';

export const xApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = inject(API_KEY);

  req = req.clone({
    headers: req.headers.set('x-api-key', apiKey),
  });

  return next(req);
};
