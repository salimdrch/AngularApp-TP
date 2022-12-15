import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonnelI } from '../../modeles/companie-i';
import { CompagnieService } from '../../services/compagnie.service';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent implements OnInit, OnDestroy {

  filtreModelePersonnels:string = '';
  // list local des personnels pour montrer de la manipulation d'observable
  persoLocaux : Array<PersonnelI> = [];
  listHabilitations : Array<string> = [];
  subs: Subscription = new Subscription();

  constructor(public compagnie_personnels:CompagnieService) { }

  ngOnInit(): void {
    // appel des données dan firebase
    this.compagnie_personnels.getFirePersonnels();

    // Connexion à l'écouteur de l'observable
    console.log(this.compagnie_personnels.personnels$);
    this.subs = this.compagnie_personnels.personnels$.subscribe(
      {
        next: (personnel) => {
          console.log(personnel);
          personnel.forEach(p => {
          if(!this.listHabilitations.includes(p.data.habilitation)) this.listHabilitations.push(p.data.habilitation)
        })},
        error: (e) => console.log(e),
        complete: () => console.log('Compagnie observable est terminé')
      }
    )
  }


  // Lorsque le composant est detruit, la souscriptions à l'observable est arrêté aussi
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}



