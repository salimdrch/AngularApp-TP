import { HttpClient } from '@angular/common/http';
import { ContentChildrenDecorator, Injectable } from '@angular/core';
import { ContenusI, PageI, ProfilI } from '../modeles/page-i';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  pages:ContenusI = <ContenusI>{};

  mentions:PageI = {
    titre: "Mentions légales",
    contenue: "        Ces mentions ne servent à rien !     "

  };

  profil:ProfilI = {
    titre: "Profil",
    contenu: " Je sappelle GROOT !!!!"
  }

  constructor(private readonly http:HttpClient) { 
    this.getPage()
  }
  
   
  getPage(){
  /*  this.http.get("assets/data/pages.json").subscribe({
      next(data){
        console.log('Donnée : ', data);
      },
      error(msg){
        console.log('Error Getting Location : ', msg);

      },
    }) */

    // get renvoie un observable 
    this.http.get<ContenusI>("assets/data/pages.json").subscribe(p =>{
      console.log("Donnée retourné depuis le fichier json",p);
      this.pages = p
      console.log(p)
    });
  }
  

}
