import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvionI, PersonnelI, VolI } from '../modeles/companie-i';

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {
  
  vols:Array<VolI> = [];
  avions:Array<AvionI> = [];
  personnels:Array<PersonnelI> = [];


  constructor(private readonly http:HttpClient) {
    this.getVols()
    this.getAvions()
    this.getPersonnels()
   }

  /** 
  * Récupération des données de vols
  **/
   getVols(){
    this.http.get<Array<VolI>>("assets/data/vols.json").subscribe(p =>{
      console.log("Donnée retourné depuis le fichier json",p);
      this.vols = p 
    })
   }

   /** 
  * Récupération des données de avions
  **/

    getAvions(){
      this.http.get<Array<AvionI>>("assets/data/avions.json").subscribe(a =>{
        console.log("Donnée retourné depuis le fichier json",a);
        this.avions = a 
      })
     }

  /** 
  * Récupération des données de personels
  **/

    getPersonnels(){
      this.http.get<Array<PersonnelI>>("assets/data/personnels.json").subscribe(pers =>{
        console.log("Donnée retourné depuis le fichier json",pers);
        this.personnels = pers 
      })
     }
}
