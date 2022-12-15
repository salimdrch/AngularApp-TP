import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UService } from 'src/app/services/u.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public u:UService, public auth:Auth) { }

  ngOnInit(): void {
  }

}
