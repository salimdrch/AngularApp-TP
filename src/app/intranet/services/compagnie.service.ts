import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvionI, VolI } from '../modeles/companie-i';

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {
  
  vols:Array<VolI> = [];

  constructor(private readonly http:HttpClient) {
    this.getInfo()
   }

   getInfo(){
    this.http.get<Array<VolI>>("assets/data/vols.json").subscribe(p =>{
      console.log("Donnée retourné depuis le fichier json",p);
      this.vols = p 
    })

   }
}
