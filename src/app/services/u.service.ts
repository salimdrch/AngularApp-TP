import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserI } from '../modeles/id-i';
import { Firestore, doc, getDoc, setDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UService {

  token: string | number = "MonTokenAvecUnValeur"; // token reçu après la connexion de l'utilisateur (enlever la chaine et mettre un ! devant token)
  user:UserI = <UserI>{}; // typé mon objet en UserI

  constructor(private router: Router, private auth:Auth, private bdd:Firestore) { 
    this.getFireUser(this.auth.currentUser?.uid as string);
    console.log("NOM",this.user.nom);
  }

  /** initaliser le user */
  
  
  async getFireUser(uid : string|number){
    const userDoc = doc(this.bdd, "users", uid as string);
    let test=await getDoc(userDoc);
    console.log(test);
    this.user= test.data() as UserI;
    console.log(test.data()); //
    return this.user;

  }

  /** deconnecter un utilisateur */
  deconnexion(){
    this.user = <UserI>{};
    this.auth.signOut();
    this.router.navigateByUrl('/')
  }
}
