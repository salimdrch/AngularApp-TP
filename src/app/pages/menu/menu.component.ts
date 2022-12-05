import { Component, OnInit } from '@angular/core';
import { UService } from 'src/app/services/u.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public u:UService) { }

  ngOnInit(): void {
  }

}
