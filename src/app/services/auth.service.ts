import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { UserI } from '../modeles/id-i';
import { UService } from './u.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public readonly auth:Auth, private readonly route:Router, public userService:UService) { }


  /** Fonction de connexion */
  login(mail: string, mdp: string){
    signInWithEmailAndPassword(this.auth, mail, mdp)
    .then(a => {      
      this.userService.getFireUser(this.auth.currentUser?.uid as string).then(user => {
        this.route.navigateByUrl('/intranet');
      })
      
    })
    .catch(err => console.log(err));
  }

  /** Fonction de deconnexion */
  logout(){
    this.userService.user = <UserI>{};
    this.auth.signOut();
  }
  
}
