import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})
export class MentionsComponent implements OnInit {

  constructor( public pageSevices:PagesService) { }

  ngOnInit(): void {
    this.pageSevices.getPage();
  }

}
