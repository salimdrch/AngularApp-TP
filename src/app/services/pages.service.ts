import { HttpClient } from '@angular/common/http';
import { ContentChildrenDecorator, Injectable } from '@angular/core';
import { ContenusI, PageI, ProfilI } from '../modeles/page-i';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  pages:ContenusI = <ContenusI>{};


  constructor(private readonly http:HttpClient) { 
    this.pages.mentions = <PageI>{};
    this.pages.profil = <ProfilI>{};
  }
     
  getPage(){
    // get renvoie un observable 
    this.http.get<ContenusI>("assets/data/pages.json").subscribe(p =>{
      this.pages.mentions = p.mentions
      this.pages.profil = p.profil
    });
  }
  

}
