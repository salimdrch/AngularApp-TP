import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UService } from '../services/u.service';

@Injectable()
export class Erreur401Interceptor implements HttpInterceptor {


  constructor(private u:UService) {}

  /** Intercepter les rêquetes entrantes pour vérifier une erreur 401 d'authentification */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      erreur => {
        if (erreur instanceof HttpErrorResponse && erreur.status == 401) {
          this.u.deconnexion();
        }
        return erreur;
      }
    );
  }
}
