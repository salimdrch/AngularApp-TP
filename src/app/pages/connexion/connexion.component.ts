import { Component, OnInit } from '@angular/core';
import { IdI, UserI } from 'src/app/modeles/id-i';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UService } from 'src/app/services/u.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  id: IdI = {mail:"", password:""};

  constructor(private http:HttpClient, private router:Router, private userService:UService, private authService:AuthService) { }

  ngOnInit(): void {
  }

  logId(){    
    console.log(this.id);
  }
  /**
   * Identifies the user by json fils
   */
  checkId(){
    this.http.get<UserI>(`assets/ids/${this.id.mail}@${this.id.password}.json`).subscribe(
      retour =>{
        this.userService.user = retour;
        this.router.navigateByUrl('/intranet')
      },
      erreur => {
        console.log("Erreur", erreur);
        alert('Erreur ' + JSON.stringify(erreur));
      }
    )
  }

  /**
   * Identifies the user by Firebase authentification
   */
  checkIdFirebase(){
    this.authService.login(this.id.mail as string, this.id.password as string);
  }

}
