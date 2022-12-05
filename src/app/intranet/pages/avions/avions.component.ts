import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { CompagnieService } from '../../services/compagnie.service';
import { AvionI } from '../../modeles/companie-i'; 

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
    console.log(this.compagnie_avions.vols)
  }
  selectAvion(code:string | number):void {
    this.avion = this.compagnie_avions.avions.find(av => av.code === code)!;
  }
  /** Mettre à jour notre avion */
  updateAvion(id: number | string) {
    this.compagnie_avions.updateFireAvions(id as string, this.avion);
    console.log("l'avion va être mis a jour ici");
  } 
  /** Annuler la selection sur un avion */
  resetAvion(){
    this.avion = <AvionI>{};
  }
}
