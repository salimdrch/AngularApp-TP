import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PersonnelI } from '../../modeles/companie-i';
import { PersonnelsService } from '../../services/personnels.service';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent implements OnInit, OnDestroy {

  filtreModelePersonnels:string = '';
  pers:PersonnelI = <PersonnelI>{};


  personnel :{id: string, data: PersonnelI} = <{id: string, data: PersonnelI}>{};



  // list local des personnels pour montrer de la manipulation d'observable
  persoLocaux : Array<PersonnelI> = [];
  listHabilitations : Array<string> = [];
  subs: Subscription = new Subscription();
  personnels$: BehaviorSubject<Array<{ id: string, data: PersonnelI }>> = new BehaviorSubject(<Array<{ id: string, data: PersonnelI }>>[]);


  constructor(public personnalService:PersonnelsService) { }

  ngOnInit(): void {
    // appel des données dan firebase
    this.personnalService.getFirePersonnels();
    this.personnel.data = this.pers;
    
    /* Voici des exemples vu en cours 

    // Connexion à l'écouteur de l'observable
    this.subs = this.personnalService.personnels$.subscribe(
      {
        next: (personnel) => {
          console.log(personnel);
          personnel.forEach(p => {
          if(!this.listHabilitations.includes(p.data.habilitation)) this.listHabilitations.push(p.data.habilitation)
        })},
        error: (e) => console.log(e),
        complete: () => console.log('Compagnie observable est terminé')
      }
    )*/
  }

  
  selectPersonnel(nom:string | number):void {
    this.personnel = this.personnalService.personnels.find(p => p.id == nom)!  ;

  }

  
/* Ajouter un personnel dans la db */
  addPersonnel(id:string | number){
    let val = this.personnalService.idInList(id);
    if(val){
      alert("Le personnel existe déjà !")
    }else{
      id = this.personnel.data.nom + "-" + this.personnel.data.prenom;
      this.personnalService.addFirePersonnel(id as string, this.personnel.data)
    }
  }

  /** Mettre à jour notre personnel */
  updatePersonnel(code: number | string) {
    let val = this.personnalService.idInList(code);
    if(val){
      this.personnalService.updateFirePersonnel(code as string, this.personnel.data);
    }else{
      alert("Le personnel à modifier n'existe pas ")
    }
    
  }  

  /** Supprimer le personnel selectionner */
  deletePersonnel(id: string | number) {
    let val = this.personnalService.idInList(id);
    if(val){
      this.personnalService.delFirePersonnel(id as string);
    }else{
      alert("Le personnel sélectionné n'existe pas")
    }
  }


  /** Annuler la selection sur un personnel */
  resetPersonnel(){
    this.personnel =  <{id: string, data: PersonnelI}>{};
    this.personnel.data = this.pers;
  }
 

  // Lorsque le composant est detruit, la souscriptions à l'observable est arrêté aussi
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}



