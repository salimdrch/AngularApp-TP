import { Component, OnInit } from '@angular/core';
import { AvionI } from '../../modeles/companie-i'; 
import { AvionsService } from '../../services/avions.service';

@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
  styleUrls: ['./avions.component.css']
})
export class AvionsComponent implements OnInit {
  avion:AvionI = <AvionI>{};

  filtreModeleAvions:string = '';
  constructor(public avionsService:AvionsService) { }

  ngOnInit(): void {
    this.avionsService.getFireAvs()    
  }

  selectAvion(code:string | number):void {
    this.avion = this.avionsService.avions.find(av => av.code === code)!;
  }

  addAvion(code:string | number){
    let val = this.avionsService.idInList(code);
    if(val){
      alert("L'avion existe déjà !")
    }else{
      this.avionsService.addFireAvions(code as string, this.avion)
    }
  }

  /** Mettre à jour notre avion */
  updateAvion(code: number | string) {
    let val = this.avionsService.idInList(code);
    if(val){
      this.avionsService.updateFireAvions(code as string, this.avion);
    }else{
      alert("L'avion à modifier n'existe pas ")
    }
  }

  /** Supprimer l'avion selectionner */
  deleteAvion(code: string | number) {
    let val = this.avionsService.idInList(code);
    if(val){
      this.avionsService.delFireAvions(code as string);
    }else{
      alert("L'avion sélectionné n'existe pas")
    }
  }

  /** Annuler la selection sur un avion */
  resetAvion(){
    this.avion = <AvionI>{};
  }
}
