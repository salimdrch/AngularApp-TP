import { Component, OnInit } from '@angular/core';
import { IdI, UserI } from 'src/app/modeles/id-i';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  
  userId: IdI = <IdI>{};
  user: UserI = <UserI>{};

  constructor(public userService:UserServiceService) { }

  ngOnInit(): void {
    this.userService.getFireUser();
    console.log('TEST', this.userService.users)
    this.userId = <IdI>{};
  }

  selectUser(uid: string | number): void {
    this.user = this.userService.users.find(user => user.uid === uid)!;
    console.log('USER SELECTED', this.user)
  }

  updateUser(uid: string | number): void {
    if(this.userService.idInListUsers(uid)){
      console.log("User updated",this.user.uid);
      this.userService.updateFireUser(this.user)
    }else{
      console.log("Not in the list");
      alert("User already not exists");
    }
  }
  
  

}
