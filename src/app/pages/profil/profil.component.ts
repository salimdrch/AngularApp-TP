import { Component, OnInit } from '@angular/core';
import { Auth, updateProfile } from '@angular/fire/auth';
import { PagesService } from 'src/app/services/pages.service';
import { UService  } from 'src/app/services/u.service';
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
  }

  getUser():void {
    this.uServ.getFireUser(this.auth.currentUser?.uid as string).then(u => this.uServ.user = u); 
  }

  async update(){
    const docUser = doc(this.bdd,'users',this.auth.currentUser!.uid);
    // Créer ou mettre à jour l'utilisateur
    await setDoc(docUser,this.uServ.user,{merge:true})
    .then((r) => console.log("L'utilisateur à été crée ou mis a jour") )
    .catch((err) => console.log("L'utilisateur n'a été crée"));

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
