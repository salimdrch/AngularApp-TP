import { Component, OnInit } from '@angular/core';
import { Auth , getAuth, updateProfile } from '@angular/fire/auth';
import { PagesService } from 'src/app/services/pages.service';
import { UService  } from 'src/app/services/u.service';
import { User } from '@angular/fire/auth';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  // le auth c'est pour vérifier si c'est un c'est l'utilisateur courant
  constructor(public page_service:PagesService, public auth: Auth, public uServ:UService, private bdd: Firestore ) { }
  
  
  ngOnInit(): void {
    this.getUser();
    console.log(this.uServ.user.nom)
    console.log(this.page_service);
  }

  getUser():void {
    this.uServ.getFireUser(this.auth.currentUser?.uid as string).then(d=>this.uServ.user=d); 
  }

  async update(){
    const docUser = doc(this.bdd,'users',this.auth.currentUser!.uid);
    // Créer ou mettre à jour l'utilisateur
    await setDoc(docUser,this.uServ.user,{merge:true})
    .then((r) => console.log("L'utilisateur à été crée ou mis a jour") )
    .catch((err) => console.log("L'utilisateur à été crée"));
    // Modifié les données de l'utilisateur
    updateProfile(this.auth.currentUser!, {
     displayName: this.uServ.user.nom, photoURL: this.uServ.user.photoURL
     }).then((r) => {
       console.log("les données ont bien été mis à jour");
     }).catch((error) => {
       console.log(error);
     })
   }
}
