import { Component, OnInit } from '@angular/core';
import { AeroportI, VolI } from '../../modeles/companie-i';
import { CompagnieService } from '../../services/compagnie.service';

@Component({
  selector: 'app-attributions',
  templateUrl: './attributions.component.html',
  styleUrls: ['./attributions.component.css']
})
export class AttributionsComponent implements OnInit {

  vol :{id: string, data: VolI} = <{id: string, data: VolI}>{};

  // paramtre pour filtre
  filtreModeleAttribution:string = '';
  
  constructor(public compagnieService: CompagnieService) { }

  ngOnInit(): void {
    this.compagnieService.getFireVols();
    /** permet d'initialiser mes champs dans vol sinon ça ne fonctionne pas */
    this.vol.data = <VolI>{};
    this.vol.data.aeroportDepart = <AeroportI>{};
    this.vol.data.aeroportArrivee = <AeroportI>{};
  }

  /** Permet de vérifier si le vol selectionné existe et l'attribuer à un type VolI  */
  selectVols(id:string | number):void {
    this.vol = this.compagnieService.vols.find(p => p.id == id)!  ;
  }

  /**
   * Les fonctions ont été mis en place mais je rencontré tellement de problem dans l'utilisation dans la bd
   */

  /* Ajouter un Vols dans la db */
  addVols(id:string | number){
    let val = this.compagnieService.idInList(id);
    if(val){
      alert("Le vol existe déjà !")
    }else{
      this.compagnieService.addFireVols(id as string, this.vol.data)
    }
  }

  /** Mettre à jour notre vol */
  updateVols(code: number | string) {
    let val = this.compagnieService.idInList(code);
    if(val){
      this.compagnieService.updateFireVols(code as string, this.vol.data);
    }else{
      alert("Le vol à modifoer n'existe pas ")
    }
  }

  /** Supprimer le vol selectionner */
  deleteVols(id: string | number) {
    let val = this.compagnieService.idInList(id);
    if(val){
      this.compagnieService.delFireVols(id as string);
    }else{
      alert("Le vol sélectionné n'existe pas")
    }
  }

  /** Annuler la selection sur un Vols */
  resetVols(){
    this.vol =  <{id: string, data: VolI}>{};
    this.vol.data = <VolI>{};
  }
}
