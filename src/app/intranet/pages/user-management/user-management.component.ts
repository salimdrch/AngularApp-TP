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
    this.userId = <IdI>{};
  }

  selectUser(uid: string | number): void {
    this.user = this.userService.users.find(user => user.uid === uid)!;
  }

  updateUser(uid: string | number): void {    
    if(this.userService.idInListUsers(uid)){
      this.userService.updateFireUser(this.user)
    }else{
      alert("User already not exists");
    }
  }
  
  deleteUser(uid: string | number): void {
    if(this.userService.idInListUsers(uid)){
      alert("User are deletes successfully in database but not in Auth ! GO to firebase to delete them");
      console.log("User are deletes successfully in database but not in Auth ! GO to firebase to delete them");
      this.userService.delFireUser(this.user.uid as string)
    }else{
      alert("User already not exists");
    }
  }

  resetUser() {
    this.user = <UserI>{};
    this.userId = <IdI>{};
  }

}
