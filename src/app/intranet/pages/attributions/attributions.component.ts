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
  filtreModele:string = '';
  filtreModeleAttribution:string = '';
  
  constructor(public compagnieService: CompagnieService) { }

  ngOnInit(): void {
    this.compagnieService.getFireVols();
    this.vol.data = <VolI>{};
    //this.vol.data.avion = <AvionI>{};
    //this.vol.data.personnel = Array<PersonnelI>;
    this.vol.data.aeroportDepart = <AeroportI>{};
    this.vol.data.aeroportArrivee = <AeroportI>{};
  }

  selectVols(id:string | number):void {
    this.vol = this.compagnieService.vols.find(p => p.id == id)!  ;
  }

  codeInList(code:string | number): boolean {
    let val: boolean = false;
    this.compagnieService.vols.forEach( element => code == element.id ? val = true : console.log("not in array", element))
    return val;
  }

  elementtInList(value: string, champs: string): boolean {
    let val: boolean = false; 
    switch(champs) {
      case "avions":
        this.compagnieService.avions.forEach( element => value == element.modele ? val = true : console.log("not in array", element));
        break;
      case "personnels" :
        this.compagnieService.personnels.forEach( element => value == element.id ? val = true : console.log("not in array", element));
        break;
      case "aeroport":
        this.compagnieService.aeroports.forEach( element => value == element.name ? val = true : console.log("not in array", element))
    }
    return val
  }

  /* Ajouter un Vols dans la db */
  addVols(id:string | number){
    let val = this.codeInList(id);
    if(val){
      console.log("Le vol existe déjà : ", id);
      alert("Le vol existe déjà !")
    }else{
      this.compagnieService.addFireVols(id as string, this.vol.data)
    }
  }

  /** Mettre à jour notre vol */
  updateVols(code: number | string) {
    let val = this.codeInList(code);
    if(val){
      this.compagnieService.updateFireVols(code as string, this.vol.data);
      console.log("le vol va être mis a jour");
    }else{
      alert("Le vol à modifoer n'existe pas ")
      console.log("Le vol à modifoer n'existe pas : ", code);
    }
  }

  /** Supprimer le vol selectionner */
  deleteVols(id: string | number) {
    let val = this.codeInList(id);
    if(val){
      this.compagnieService.delFireVols(id as string);
      console.log("le vol a été supprimé");
    }else{
      alert("Le vol sélectionné n'existe pas")
      console.log("Le vol sélectionné n'existe pas");
    }
  }

  /** Annuler la selection sur un Vols */
  resetVols(){
    this.vol =  <{id: string, data: VolI}>{};
    this.vol.data = <VolI>{};
  }
}
