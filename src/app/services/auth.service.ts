import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly auth:Auth, private readonly route:Router) { }

  identification(mail: string, mdp: string){
    signInWithEmailAndPassword(this.auth, mail, mdp)
    .then(a => {
      console.log('UTILISATEUR CONNECT', a, 'UTILISATEUR ACTUEL', this.auth.currentUser);
      this.route.navigateByUrl('/intranet');
    })
    .catch(err => console.log(err));
  }
}
