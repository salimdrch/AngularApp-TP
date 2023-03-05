import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { CompagnieService } from '../../services/compagnie.service';
import { AvionI } from '../../modeles/companie-i'; 
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
  styleUrls: ['./avions.component.css']
})
export class AvionsComponent implements OnInit {
  avion:AvionI = <AvionI>{};

  filtreModeleAvions:string = '';
  constructor(public compagnie_avions:CompagnieService) { }

  ngOnInit(): void {
    this.compagnie_avions.getFireAvs()    
  }

  selectAvion(code:string | number):void {
    this.avion = this.compagnie_avions.avions.find(av => av.code === code)!;
  }

  addAvion(code:string | number){
    let val = this.compagnie_avions.idInList(code,"avions");
    if(val){
      alert("L'avion existe déjà !")
    }else{
      this.compagnie_avions.addFireAvions(code as string, this.avion)
    }
  }

  /** Mettre à jour notre avion */
  updateAvion(code: number | string) {
    let val = this.compagnie_avions.idInList(code, "avions");
    if(val){
      this.compagnie_avions.updateFireAvions(code as string, this.avion);
    }else{
      alert("L'avion à modifier n'existe pas ")
    }
  }

  /** Supprimer l'avion selectionner */
  deleteAvion(code: string | number) {
    let val = this.compagnie_avions.idInList(code, "avions");
    if(val){
      this.compagnie_avions.delFireAvions(code as string);
    }else{
      alert("L'avion sélectionné n'existe pas")
    }
  }

  /** Annuler la selection sur un avion */
  resetAvion(){
    this.avion = <AvionI>{};
  }
}
