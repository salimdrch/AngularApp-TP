import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from '../modeles/id-i';

@Injectable({
  providedIn: 'root'
})
export class UService {

  user:UserI = <UserI>{}; // typé mon objet en UserI

  constructor(private router: Router) { }

  deconnexion(){
    this.user = <UserI>{};
    this.router.navigateByUrl('/')
  }
}
