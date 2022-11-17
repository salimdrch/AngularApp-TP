import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { CompagnieService } from '../../services/compagnie.service';

@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
  styleUrls: ['./avions.component.css']
})
export class AvionsComponent implements OnInit {

  constructor(public av:CompagnieService) { }

  ngOnInit(): void {
    console.log(this.av.vols)
  }

}
