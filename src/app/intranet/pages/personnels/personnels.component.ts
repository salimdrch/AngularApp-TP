import { Component, OnInit } from '@angular/core';
import { CompagnieService } from '../../services/compagnie.service';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent implements OnInit {

  filtreModelePersonnels:string = '';

  constructor(public compagnie_personnels:CompagnieService) { }

  ngOnInit(): void {
    console.log(this.compagnie_personnels.personnels)
  }

}
