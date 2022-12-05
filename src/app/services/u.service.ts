import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from '../modeles/id-i';

@Injectable({
  providedIn: 'root'
})
export class UService {

  token: string | number = "MonTokenAvecUnValeur"; // token reçu après la connexion de l'utilisateur (enlever la chaine et mettre un ! devant token)
  user:UserI = <UserI>{}; // typé mon objet en UserI

  constructor(private router: Router) { }
  /** deconnecter un utilisateur */
  deconnexion(){
    this.user = <UserI>{};
    this.router.navigateByUrl('/')
  }
}
