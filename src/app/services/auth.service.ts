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


  /**
   * TODO:faire le guard ! faire la page userManagement !  
   *  */ 

  login(mail: string, mdp: string){
    signInWithEmailAndPassword(this.auth, mail, mdp)
    .then(a => {      
      this.userService.getFireUser(this.auth.currentUser?.uid as string).then(user => {
        console.log("USER", this.userService.user)
        /*switch (this.userService.user.statut){
          case 'user':
            console.log("c'est un USER");
            this.route.navigateByUrl('/intranet');
            break;
          case 'admin':
            console.log("c'est un ADMIN");
            this.route.navigateByUrl('/intranet/userManagement');
            break;
        }*/
        this.route.navigateByUrl('/intranet');
      })
      
    })
    .catch(err => console.log(err));
  }

  logout(){
    this.userService.user = <UserI>{};
    this.auth.signOut();
  }
  
}
