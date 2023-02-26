import { Component, OnInit } from '@angular/core';
import { IdI, UserI } from 'src/app/modeles/id-i';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: UserI = <UserI>{};
  userId: IdI = <IdI>{};


  constructor(public userService:UserServiceService) { }

  ngOnInit(): void {
  }

  createUser(): void {
    if (this.userService.idInListUsers(this.user.uid)){
      console.log("In the list");
      alert("User already exists");
    }else{
      this.userService.createAuthUser(this.user, this.userId);
    }
  }
}
