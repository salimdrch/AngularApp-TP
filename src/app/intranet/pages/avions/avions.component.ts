import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { CompagnieService } from '../../services/compagnie.service';

@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
  styleUrls: ['./avions.component.css']
})
export class AvionsComponent implements OnInit {

  filtreModeleAvions:string = '';
  constructor(public compagnie_avions:CompagnieService) { }

  ngOnInit(): void {
    console.log(this.compagnie_avions.vols)
  }

}
