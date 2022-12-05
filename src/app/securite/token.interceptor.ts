import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UService } from '../services/u.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  entetes:any;
  /**
   * 
   * @param u Pointeur vers le service utilisateur
   */

  constructor(private u:UService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.u.token){
      this.entetes = {
        headers : new HttpHeaders(
          {'Authorization': 'Bearer ' + this.u.token}
        )
      };
      const httpToken = request.clone(this.entetes)
      return next.handle(httpToken);
    };

    return next.handle(request);
  }
}
