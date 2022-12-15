import { Component, OnInit } from '@angular/core';
import { CompagnieService } from '../../services/compagnie.service';

@Component({
  selector: 'app-attributions',
  templateUrl: './attributions.component.html',
  styleUrls: ['./attributions.component.css']
})
export class AttributionsComponent implements OnInit {

  // paramtre pour filtre
  filtreModele:string = '';
  filtreM:string = '';
  constructor(public compagnies:CompagnieService) { }

  ngOnInit(): void {
    this.compagnies.getFireVols();
    console.log("personnel dans le vol", this.compagnies.vols);
  }

}
