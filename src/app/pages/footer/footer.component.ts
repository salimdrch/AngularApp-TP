import { Component, OnInit } from '@angular/core';
import { UService } from 'src/app/services/u.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public u:UService) { }

  ngOnInit(): void {
  }

}
